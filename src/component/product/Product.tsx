import React, { useEffect, useMemo } from 'react';
import { Input, InputNumber, Button, Typography, Menu, Row, Col } from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Form from 'antd/lib/form';

import styles from './Product.module.scss';
import { networkWithAuth } from '../../network/network';

const { Title } = Typography;

const Product = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const isNewProductPage = useMemo(() => id === undefined, []);

  useEffect(() => {
    // @ts-ignore
    form.setFieldsValue({ ...state });
  }, [state]);

  const onProductSave = (values: any) => {
    if (isNewProductPage) {
      console.log('');
    } else {
      networkWithAuth.post(`/items/products/${id}`, values).then(() => {
        navigate('/product-list');
      });
      console.log(values);
    }
  };

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
            <Button
              className={styles.addNewButton}
              type="primary"
              onClick={() => {
                onProductSave(form.getFieldsValue());
              }}
            >
              {isNewProductPage ? 'Save' : 'Update'}
            </Button>
          </div>
        </div>
        <Form
          form={form}
          name="product"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="handle"
            label="Handle (unique)"
            rules={[
              {
                required: true,
                message: 'Please enter handle!',
              },
            ]}
          >
            <Input placeholder="Handle (unique)" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={8}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter price!',
                  },
                ]}
              >
                <InputNumber placeholder="Price" />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item label="Comparable Price" name="comparable_price">
                <InputNumber placeholder="Comparable Price" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Short Description" name="short_description">
            <Input placeholder="Short Description" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder="Description" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { Product };
