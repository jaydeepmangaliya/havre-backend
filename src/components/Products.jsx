import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Card,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Popconfirm,
  Tag,
  Image,
  Row,
  Col,
  Divider,
  Spin,
  Select
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';
import ResponsiveTable from './ResponsiveTable';
import {  usePaginatedApi, useApiSubmit } from '../hooks/useApi';
import { productsService } from '../services';
import { data } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;


const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  // Use API hooks for products data
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const {
    data: products,
    pagination,
    loading,
    handleTableChange,
    refresh
  } = usePaginatedApi(productsService.getProducts, {}, {
    showErrorMessage: true
  });

  // Debug: Log products data to see structure
  useEffect(() => {
    if (products && products.length > 0) {
      console.log('Products data structure:', products[0]);
      console.log('All products:', products);
    }
  }, [products]);


  // API hook for creating/updating products
  const { submit: submitProduct, loading: submitting } = useApiSubmit(
    editingProduct ?
      (data) => productsService.updateProduct(editingProduct.id, data) :
      (data) => productsService.createProduct(data),
    {
      onSuccess: () => {
        setIsModalVisible(false);
        setEditingProduct(null);
        form.resetFields();
        setFileList([]);
        refresh();
      },
      successMessage: editingProduct ? 'Product updated successfully' : 'Product created successfully'
    }
  );
  

  
  const showModal = (product = null) => {
    setEditingProduct(product);
    setIsModalVisible(true);
    if (product) {
      // Set form values including dynamic details
      form.setFieldsValue({
        ...product,
        details: product.details || [{ title: '', value: '' }]
      });

      // Set images if they exist
      if (product.images && product.images.length > 0) {
        const imageFileList = product.images.map((imageItem, index) => {
          // Handle both string URLs and object formats
          const url = typeof imageItem === 'string' ? imageItem : imageItem.url;
          return {
            uid: `-${index}`,
            name: `image-${index}.jpg`,
            status: 'done',
            url: url,
          };
        });
        setFileList(imageFileList);
      } else if (product.image) {
        // Handle legacy single image
        setFileList([{
          uid: '-1',
          name: 'image.jpg',
          status: 'done',
          url: product.image,
        }]);
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      form.setFieldsValue({
        details: [{ title: '', value: '' }]
      });
      setFileList([]);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
    setFileList([]);
  };

  const handleSubmit = async (values) => {
    try {
      // Process images from file list

      const form = new FormData();
      form.append('productName', values.name);
      form.append('description', values.description);
      form.append('price', values.price);
      // form.append('quantity', values.quantity);
      form.append('weight', values.weight);
      form.append('serving', values.servings);
      form.append('category', values.category);
      // form.append('details', JSON.stringify(values.details));
      fileList.forEach((file, index) => {
        form.append(`image${index+1}`, file.originFileObj);
      });
      await submitProduct(form);
      
      // const images = fileList.map(file => {
      //   if (file.url) return file.url;
      //   if (file.response && file.response.url) return file.response.url;
      //   return file.thumbUrl || 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=No+Image';
      // });

      // // Process details array (filter out empty entries)
      // const detailsArray = (values.details || []).filter(detail =>
      //   detail && detail.title && detail.value &&
      //   detail.title.trim() !== '' && detail.value.trim() !== ''
      // );

      // const productData = {
      //   ...values,
      //   details: detailsArray,
      //   images: images.length > 0 ? images : ['https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=No+Image'],
      //   image: images[0] || 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=No+Image' // Keep for backward compatibility
      // };

      // await submitProduct(productData);
    } catch (error) {
      message.error('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await productsService.deleteProduct(id);
      if (result.success) {
        message.success('Product deleted successfully!');
        refresh();
      } else {
        message.error(result.error || 'Failed to delete product');
      }
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  // Image upload handlers
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleImagePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // You can implement a preview modal here if needed
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  // Helper function to convert file to base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image, record) => {
        // Handle different image formats from API
        let imageUrl = null;

        if (record.images && record.images.length > 0) {
          // If there's an images array, use the first image
          const firstImage = record.images[0];
          imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url;
        } else if (record.image) {
          // If there's a single image field
          imageUrl = record.image;
        } else if (image) {
          // Use the direct image value
          imageUrl = image;
        }

        // If no image found, use placeholder
        if (!imageUrl) {
          imageUrl = 'https://via.placeholder.com/50x50/CCCCCC/FFFFFF?text=No+Image';
        }

        // If the image URL is relative, prepend the base URL
        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
          imageUrl = `${baseUrl.replace('/api', '')}/${imageUrl}`;
        }

        return (
          <Image
            width={50}
            height={50}
            src={imageUrl}
            alt={record.name || 'Product image'}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
            fallback="https://via.placeholder.com/50x50/CCCCCC/FFFFFF?text=Error"
            preview={{
              src: imageUrl
            }}
          />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>,
      filters: [
        { text: 'Cakes', value: 'Cakes' },
        { text: 'Cupcakes', value: 'Cupcakes' },
        { text: 'Pastries', value: 'Pastries' },
        { text: 'Special Cakes', value: 'Special Cakes' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${Number(price).toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Servings',
      dataIndex: 'servings',
      key: 'servings',
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
            onClick={() => showModal(record)}
          >
            View
          </Button>
          <Button 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
    // if(loading) return <Spin />;
  return (
    <div style={{ padding: isMobile ? '16px' : '24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '0'
      }}>
        <Title level={2} style={{ margin: 0 }}>
          🧁 Products Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          size={isMobile ? 'middle' : 'large'}
          style={{ width: isMobile ? '100%' : 'auto' }}
        >
          Add New Product
        </Button>
      </div>

      <Card>
        <Spin spinning={loading}>
          <ResponsiveTable
            columns={columns}
            dataSource={products || []}
            rowKey="id"
            pagination={{
              ...pagination,
              showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
          }}
          onChange={handleTableChange}
        />
        </Spin>
      </Card>

      {/* Product Form Modal */}
      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={isMobile ? '95%' : 800}
        style={{ top: isMobile ? 20 : undefined }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label="Price ($)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: 'Please enter quantity' }]}
              >
                <InputNumber
                  min={0}
                  placeholder="0"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="weight"
                label="Weight"
                rules={[{ required: true, message: 'Please enter weight' }]}
              >
                <Input placeholder="e.g., 1.5 kg, 80g each" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="servings"
                label="Servings"
                rules={[{ required: true, message: 'Please enter servings' }]}
              >
                <Input placeholder="e.g., 8-10 people, 1 person" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please enter category' }]}
          >
            <Input placeholder="e.g., Cakes, Pastries, Cupcakes" />
          </Form.Item>

          <Form.Item
            label="Product Images"
            help="Upload multiple images for your product (JPG/PNG, max 2MB each)"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageChange}
              onPreview={handleImagePreview}
              beforeUpload={beforeUpload}
              multiple
              maxCount={3}
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Divider>Product Details</Divider>

          <Form.List name="details">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} align="middle">
                    <Col xs={24} sm={10}>
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[{ required: true, message: 'Please enter title' }]}
                      >
                        <Input placeholder="e.g., Ingredients, Allergens, Storage" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: 'Please enter value' }]}
                      >
                        <Input placeholder="e.g., Flour, Sugar, Eggs" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={2}>
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Product Detail
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
