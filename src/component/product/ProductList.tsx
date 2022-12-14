import React, { useEffect, useState } from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Typography from 'antd/lib/typography';
import Menu from 'antd/lib/menu';
import Popconfirm from 'antd/lib/popconfirm';
import { useNavigate } from 'react-router-dom';

import { network, networkWithAuth } from '../../network/network';

import styles from './ProductList.module.scss';

const { Title } = Typography;

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProductList = () => {
    setLoading(true);
    network.get('/items/products').then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
    },
    {
      title: 'Image',
      dataIndex: 'cover_image',
      key: 'image',
      width: '20%',
      render: (_: any, record: any) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          loading="lazy"
          src={
            record.cover_image ?
              `http://104.251.211.125:8055/assets/${record.cover_image}?width=80` :
              'http://104.251.211.125:8055/assets/58d3581a-b889-408c-9d5e-102fb79b570f?width=80'
          }
          alt="Image cover"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space align="center">
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => {
              setDeleting(true);
              networkWithAuth
                .delete(`/items/products/${record.id}`)
                .then(() => {
                  setDeleting(false);
                  fetchProductList();
                });
            }}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: deleting }}
          >
            {/* @ts-ignore */}
            <Button type="danger">Delete</Button>
          </Popconfirm>
          <Button type="primary" onClick={() => { navigate(`/product/${record.id}`, { state: record }); }}>Edit</Button>
        </Space>
      ),
      width: '20%',
    },
  ];

  return (
    <div className={styles.parentContainer}>
      <div className={styles.leftPanel}>
        <Title level={2}>Curious Biker</Title>
        <Menu defaultSelectedKeys={['product-list']}>
          <Menu.Item key="product-list" defaultChecked>
            Products
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.tablePanel}>
          <div className={styles.parentContainer}>
            <Title level={2}>Products</Title>
            <div className={styles.flex1} />
            <Button className={styles.addNewButton} type="primary" onClick={() => { navigate('/product/new'); }}>
              Add new
            </Button>
          </div>
        </div>
        <Table
          pagination={{ defaultPageSize: 5 }}
          rowClassName={(_, index) => (index % 2 ? styles.grayish : '')}
          columns={columns}
          dataSource={products}
          loading={loading}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export { ProductList };
