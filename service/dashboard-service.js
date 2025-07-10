import Order from "../model/schemas/orders.js";
import Product from "../model/schemas/product.js";
import { Op } from "sequelize";

export const getDashboardAnalytics = async () => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);

    // Get current month orders
    const currentMonthOrders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: currentMonth
        }
      },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'price', 'subtotal'] },
        attributes: ['id', 'name']
      }]
    });

    // Get previous month orders
    const previousMonthOrders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: previousMonth,
          [Op.lt]: lastMonth
        }
      },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'price', 'subtotal'] },
        attributes: ['id', 'name']
      }]
    });

    // Calculate total revenue
    const currentRevenue = currentMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
    const previousRevenue = previousMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
    
    // Calculate revenue growth
    const revenueGrowth = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
      : 0;

    // Calculate order growth
    const ordersGrowth = previousMonthOrders.length > 0 
      ? (((currentMonthOrders.length - previousMonthOrders.length) / previousMonthOrders.length) * 100).toFixed(1)
      : 0;

    // Get unique customers from current month
    const currentCustomers = new Set(currentMonthOrders.map(order => order.customerEmail)).size;
    const previousCustomers = new Set(previousMonthOrders.map(order => order.customerEmail)).size;
    
    // Calculate customer growth
    const customersGrowth = previousCustomers > 0 
      ? (((currentCustomers - previousCustomers) / previousCustomers) * 100).toFixed(1)
      : 0;

    // Calculate best-selling product
    const productSales = {};
    currentMonthOrders.forEach(order => {
      order.products.forEach(product => {
        const productName = product.name;
        const quantity = product.OrderProduct?.quantity || 0;
        
        if (productSales[productName]) {
          productSales[productName] += quantity;
        } else {
          productSales[productName] = quantity;
        }
      });
    });

    let bestSeller = "No sales";
    let bestSellerUnits = 0;
    
    for (const [product, units] of Object.entries(productSales)) {
      if (units > bestSellerUnits) {
        bestSeller = product;
        bestSellerUnits = units;
      }
    }

    return {
      success: true,
      data: {
        totalRevenue: parseFloat(currentRevenue.toFixed(2)),
        revenueGrowth: parseFloat(revenueGrowth),
        totalOrders: currentMonthOrders.length,
        ordersGrowth: parseFloat(ordersGrowth),
        newCustomers: currentCustomers,
        customersGrowth: parseFloat(customersGrowth),
        bestSeller: bestSeller,
        bestSellerUnits: bestSellerUnits
      }
    };
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    throw error;
  }
};
