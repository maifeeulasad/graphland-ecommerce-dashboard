import React, { useEffect, useState } from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import { network } from '../../network/network';

import styles from './ProductList.module.scss';

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
        src={
          record.cover_photo ?
            `http://104.251.211.125:8055/assets/${record.cover_photo}?width=80` :
            'http://104.251.211.125:8055/assets/58d3581a-b889-408c-9d5e-102fb79b570f?width=80'
        }
        alt="Image cover"
      />
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space align="center">
        {/* @ts-ignore */}
        <Button type="danger">Delete</Button>
        <Button type="primary">Edit</Button>
      </Space>
    ),
    width: '20%',
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProductList = () => {
    network.get('/items/products').then((res) => setProducts(res.data.data));
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <Table
      rowClassName={(_, index) => (index % 2 ? styles.grayish : '')}
      columns={columns}
      dataSource={products}
      loading={products === undefined || products.length === 0}
    />
  );
};

export { ProductList };
