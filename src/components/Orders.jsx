import { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Card,
  Select,
  Input,
  Modal,
  Descriptions,
  Divider,
  message,
  Spin
} from 'antd';
import ResponsiveTable from './ResponsiveTable';
import {
  EyeOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import { usePaginatedApi, useApiSubmit } from '../hooks/useApi';
import { ordersService } from '../services';

const { Title } = Typography;
const { Option } = Select;


const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Use API hooks for orders data
  const {
    data: orders,
    pagination,
    loading,
    handleTableChange,
    refresh
  } = usePaginatedApi(ordersService.getOrders, {}, {
    showErrorMessage: true
  });

  const dataSource = orders?.items || [];

  // API hook for updating order status
  const { submit: updateOrderStatus, loading: updating } = useApiSubmit(
    ({ orderId, status }) => ordersService.updateOrderStatus(orderId, status),
    {
      onSuccess: () => {
        refresh();
      },
      successMessage: 'Order status updated successfully'
    }
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const statusColors = {
    new: 'blue',
    processing: 'orange',
    delivered: 'green',
    cancelled: 'red'
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus });
    } catch (error) {
      message.error('Failed to update order status');
    }
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    // TODO: Implement API filtering
  };

  const handleSearch = (value) => {
    setSearchText(value);
    // TODO: Implement API search
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const printInvoice = (order) => {
    // Create a simple invoice print
    const printWindow = window.open('', '_blank');
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f2f2f2; }
            .total { text-align: right; font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🧁 Bakery Invoice</h1>
            <h2>Invoice #${order.id}</h2>
          </div>
          <div class="invoice-details">
            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Address:</strong> ${order.customerAddress}</p>
            <p><strong>Order Date:</strong> ${order.createdAt.split('T')[0]}</p>
            <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
          </div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.products.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.OrderProduct.quantity}</td>
                  <td>$${Number(item.price).toFixed(2)}</td>
                  <td>$${(item.OrderProduct.quantity * item.price).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Total: $${Number(order.total).toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
    message.success('Invoice sent to printer');
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Phone',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total.toFixed(2)}`,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      render: (createdAt) => <>{createdAt.split('T')[0]}</>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => showOrderDetails(record)}
          >
            View
          </Button>
          <Select
            defaultValue={record.status}
            size="small"
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Option value="new">New</Option>
            <Option value="processing">Processing</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <Button 
            icon={<PrinterOutlined />} 
            size="small"
            onClick={() => printInvoice(record)}
          >
            Print
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: isMobile ? '16px' : '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        🛒 Orders Management
      </Title>

      <Card style={{ marginBottom: '24px' }}>
        <Space
          style={{
            marginBottom: '16px',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '12px' : '8px'
          }}
        >
          <Space direction={isMobile ? 'vertical' : 'horizontal'} style={{ width: isMobile ? '100%' : 'auto' }}>
            <Input.Search
              placeholder="Search by Order ID, Customer, or Phone"
              allowClear
              style={{ width: isMobile ? '100%' : 300 }}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Select
              value={statusFilter}
              style={{ width: isMobile ? '100%' : 150 }}
              onChange={handleStatusFilterChange}
            >
              <Option value="all">All Orders</Option>
              <Option value="new">New Orders</Option>
              <Option value="processing">Processing</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Space>
        </Space>

        <Spin spinning={loading}>
          <ResponsiveTable
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} orders`,
          }}
          onChange={handleTableChange}
        />
        </Spin>
      </Card>

      {/* Order Details Modal */}
      <Modal
        title={`Order Details - ${selectedOrder?.id}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />} onClick={() => printInvoice(selectedOrder)}>
            Print Invoice
          </Button>,
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedOrder && (
          <div>
            <Descriptions title="Customer Information" bordered column={2}>
              <Descriptions.Item label="Name">{selectedOrder.customerName}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedOrder.customerPhone}</Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>{selectedOrder.customerAddress}</Descriptions.Item>
              <Descriptions.Item label="Order Date">{selectedOrder.orderDate}</Descriptions.Item>
              <Descriptions.Item label="Delivery Date">{selectedOrder.deliveryDate || 'Not set'}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={statusColors[selectedOrder.status]}>
                  {selectedOrder.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Total">${selectedOrder.total.toFixed(2)}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={4}>Order Items</Title>
            <Table
              dataSource={selectedOrder.items}
              pagination={false}
              size="small"
              columns={[
                { title: 'Item', dataIndex: 'name', key: 'name' },
                { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => `$${price.toFixed(2)}` },
                { 
                  title: 'Total', 
                  key: 'total', 
                  render: (_, record) => `$${(record.quantity * record.price).toFixed(2)}` 
                },
              ]}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
