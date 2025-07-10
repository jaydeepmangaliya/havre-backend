import Order from "../model/schemas/orders.js";
import Product from "../model/schemas/product.js";

export const createOrder = async (orderData) => {
  try {
    // Handle both single product and multiple products format
    
    const { product_id, quantity, products, ...orderInfo } = orderData;
    
    // Create the order first
    const order = await Order.create(orderInfo);
    
    // Handle multiple products
    if (products && products.length > 0) {
      // Multiple products format: products = [{id: 1, quantity: 2}, {id: 2, quantity: 1}]
      for (const product of products) {
        // Get the actual product price from the database
        const productDetails = await Product.findByPk(product.id);
        if (!productDetails) {
          throw new Error(`Product with ID ${product.id} not found`);
        }
        
        const price = product.price || productDetails.price;
        const subtotal = price * product.quantity;
        
        await order.addProduct(product.id, {
          through: {
            quantity: product.quantity,
            price: price,
            subtotal: subtotal
          }
        });
      }
    } else if (product_id) {
      // Single product format (backwards compatibility)
      const productDetails = await Product.findByPk(product_id);
      if (!productDetails) {
        throw new Error(`Product with ID ${product_id} not found`);
      }
      
      const price = productDetails.price;
      const subtotal = price * quantity;
      
      await order.addProduct(product_id, {
        through: {
          quantity: quantity,
          price: price,
          subtotal: subtotal
        }
      });
    }
    
    // Fetch the order with products
    const orderWithProducts = await Order.findByPk(order.id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'price', 'subtotal'] },
        attributes: ['id', 'name', 'price', 'category']
      }]
    });
    
    return {
      success: true,
      message: "Order created successfully",
      data: orderWithProducts,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const orders = await Order.findAll({ 
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'price', 'subtotal'] },
        attributes: ['id', 'name', 'price', 'category']
      }]
    });

    return {
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'price', 'subtotal'] },
        attributes: ['id', 'name', 'price', 'category']
      }]
    });

    return {
      success: true,
      message: "Order fetched successfully",
      data: order,
    };  
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    await order.destroy();
    return {
      success: true,
      message: "Order deleted successfully",
    };  
  } catch (error) {
    console.error(error);
    throw error;
  }
};