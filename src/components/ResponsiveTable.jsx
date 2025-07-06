import { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Space, Tag, Button, Pagination } from 'antd';

const ResponsiveTable = ({
  columns,
  dataSource,
  pagination = true,
  rowKey = 'id',
  loading = false,
  onChange,
  ...props
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log('Pagination data:', pagination);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [pagination]);

  // Mobile Card View
  const MobileCardView = () => (
    <div>
      <Row gutter={[16, 16]}>
        {dataSource.map((record, index) => (
          <Col xs={24} key={record[rowKey] || index}>
            <Card
              className="mobile-table-card"
              style={{
                borderRadius: '12px',
                border: '2px solid var(--bakery-accent)',
                background: 'var(--bakery-warm-white)'
              }}
            >
              {columns.map((column) => {
                if (column.key === 'actions') {
                  return (
                    <div key={column.key} style={{ marginTop: '16px', textAlign: 'right' }}>
                      <Space wrap>
                        {typeof column.render === 'function'
                          ? column.render(record[column.dataIndex], record, index)
                          : record[column.dataIndex]
                        }
                      </Space>
                    </div>
                  );
                }

                const value = record[column.dataIndex];
                const displayValue = typeof column.render === 'function'
                  ? column.render(value, record, index)
                  : value;

                if (!value && !displayValue) return null;

                return (
                  <div key={column.key || column.dataIndex} style={{ marginBottom: '8px' }}>
                    <Row>
                      <Col xs={8}>
                        <strong style={{
                          color: 'var(--bakery-secondary)',
                          fontSize: '13px',
                          fontWeight: 600
                        }}>
                          {column.title}:
                        </strong>
                      </Col>
                      <Col xs={16}>
                        <span style={{
                          fontSize: '13px',
                          color: 'var(--bakery-text-dark)'
                        }}>
                          {displayValue}
                        </span>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Card>
          </Col>
        ))}
      </Row>

      {pagination && typeof pagination === 'object' && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(page, size) => {
              if (onChange) {
                onChange({ current: page, pageSize: size }, {}, {});
              }
            }}
            // showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      )}
    </div>
  );

  // Desktop Table View
  const DesktopTableView = () => (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      loading={loading}
      scroll={{ x: 'max-content' }}
      onChange={onChange}
      {...props}
    />
  );

  return (
    <div className="responsive-table-wrapper">
      {isMobile ? <MobileCardView /> : <DesktopTableView />}
    </div>
  );
};

export default ResponsiveTable;
