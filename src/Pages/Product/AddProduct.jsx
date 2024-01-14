import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, message, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ProductPage } from './style';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

export const AddProduct = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {


        try {
            const accessToken = localStorage.getItem('accessToken'); // Assuming you have stored accessToken in localStorage
            const userId = localStorage.getItem('UserID');
            if (!accessToken || !userId) {
                // Handle the case where accessToken is not available
                console.error('Access token not found!');
                return;
            }
            values.userId = userId;

            await axios.post('http://103.166.182.247:3001/products/', values, {
                headers: {
                    'x_authorization': accessToken,
                },
            });
            console.log(values);
            message.success('Product added successfully');
            // Redirect to the product list page or perform any other action
            navigate('/Home');
        } catch (error) {

            console.error('Error adding product:', error);
            message.error('An error occurred while adding the product.');
        }
    };

    return (
        <ProductPage>
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Add Product</h1>
            <Divider></Divider>
            <Form layout="vertical" className="form" style={{ marginLeft: '30px' }} onFinish={onFinish}>
                <Row>
                    <Col md={12}>
                        <Col md={18}>
                            <Form.Item label="Name" name="title" rules={[{ required: true, min: 2 }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    { required: true, message: 'This field is required!' },
                                    {
                                        type: 'number',
                                        message: 'Please input a number!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                    addonAfter={'$'}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[
                                    { required: true, message: 'This field is required!' },
                                    {
                                        type: 'number',
                                        message: 'Please input a number!',
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Discount"
                                name="discount"
                                rules={[
                                    { required: true, message: 'This field is required!' },
                                    {
                                        type: 'number',
                                        message: 'Please input a number!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={100}
                                    formatter={(value) => `${value}`}
                                    parser={(value) => value.replace('%', '')}
                                    style={{ width: '100%' }}
                                    addonAfter={'%'}
                                />
                            </Form.Item>

                            <Form.Item label="CategoryId" name="categoryId" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Col>
                    <Col md={1}>
                        <Divider type="vertical" style={{ height: '100%' }}></Divider>
                    </Col>
                    <Col md={11}>
                        <Col md={18}>
                        <Form.Item label="Main Image" name="image">
                                <Input /> 
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Sumary" name="sumary">
                                <TextArea rows={4} style={{ width: '75%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Description" name="content">
                                <TextArea rows={5} style={{ width: '75%' }} />
                            </Form.Item>
                        </Col>
                        <span style={{ color: 'red' }}></span>
                        <Divider></Divider>
                        <Col md={18}>
                            <Button htmlType="submit" type="primary" style={{ float: 'left' }}>
                                Submit
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Form>
        </ProductPage>
    );
};
