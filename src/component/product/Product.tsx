import React, { useEffect, useMemo, useState } from 'react';
import { Input, InputNumber, Button, Typography, Menu, Row, Col, Upload, message } from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Form from 'antd/lib/form';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';

import styles from './Product.module.scss';
import { networkWithAuth } from '../../network/network';

interface IRichInput {
  value?: string;
  onChange?: (value?: string) => void
}

const RichInput = ({ value, onChange }:IRichInput) => {
  const onEditorChange = (editorValue: string) => { if (onChange) { onChange(editorValue); } };
  return (
    <Editor
      init={{ height: 200 }}
      value={value}
      onEditorChange={onEditorChange}
    />
  );
};

interface ICoverImageInput {
  onChange?: (value?: string) => void
}

const CoverImageInput = ({ onChange }: ICoverImageInput) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <Upload
      accept="image/*"
      customRequest={(opt) => {
        networkWithAuth.postForm('/files', { file: opt.file }).then((res) => {
          if (onChange) { onChange(res.data.data.id); }
        });
      }}
      listType="picture-card"
      fileList={fileList}
      onChange={handleChange}
      maxCount={1}
    >
      {fileList.length >= 1 ? null : (
        <><PlusOutlined />
          <div>Upload</div>
        </>
      )}
    </Upload>
  );
};

const { Title } = Typography;

const Product = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [messageApi, messageContextHolder] = message.useMessage();

  const isNewProductPage = useMemo(() => id === undefined, []);

  useEffect(() => {
    // @ts-ignore
    form.setFieldsValue({ ...state });
  }, [state]);

  const onProductSave = (values: any) => {
    if (isNewProductPage) {
      networkWithAuth.post('/items/products', values).then(() => {
        messageApi.success('Product created succussfully');
        navigate('/product-list');
      }).catch(() => {
        messageApi.error('Product created failed');
      });
    } else {
      networkWithAuth.post(`/items/products/${id}`, values).then(() => {
        messageApi.success('Product updated succussfully');
        navigate('/product-list');
      }).catch(() => {
        messageApi.error('Product updation failed');
      });
    }
  };

  const onFormSubmit = () => onProductSave(form.getFieldsValue());

  return (
    <div className={styles.parentContainer}>
      {messageContextHolder}
      <div className={styles.leftPanel}>
        <Title level={2}>Curious Biker</Title>
        <Menu defaultSelectedKeys={['product-list']}>
          <Menu.Item key="product-list" defaultChecked>
            Products
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.rightPanel}>

        <Form
          form={form}
          name="product"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFormSubmit}
        >
          <div className={styles.tablePanel}>
            <div className={styles.parentContainer}>
              <Title level={2}>Products</Title>
              <div className={styles.flex1} />
              <Button
                className={styles.addNewButton}
                type="primary"
                htmlType="submit"
              >
                {isNewProductPage ? 'Save' : 'Update'}
              </Button>
            </div>
          </div>
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
                <InputNumber placeholder="Price" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                label="Comparable Price"
                name="comparable_price"
              >
                <InputNumber placeholder="Comparable Price" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            required
            label="Cover Image"
            name="cover_image"
            rules={[
              {
                required: true,
                message: 'Please add Cover Image!',
              },
            ]}
          >
            <CoverImageInput />
          </Form.Item>
          <Form.Item label="Short Description" name="short_description">
            <RichInput />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <RichInput />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { Product };
