import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, message, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductPage } from './style';

const { TextArea } = Input;

export const PutProduct = () => {
    const { ProductID } = useParams();
    const [product, setProduct] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://103.166.182.247:3001/products/${ProductID}`);
                console.log("Fetched product:", response.data.data.product);
                setProduct(response.data.data.product);
                form.setFieldsValue(response.data.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchData();
    }, [ProductID, form]);

    const onFinish = async (values) => {
        console.log("Form values:", values);
        const accessToken = localStorage.getItem('accessToken'); // Assuming you have stored accessToken in localStorage

        if (!accessToken) {
            // Handle the case where accessToken is not available
            console.error('Access token not found!');
            return;
        }
        try {
            const response = await axios.put(`http://103.166.182.247:3001/products/${ProductID}`, values, {
                headers: {
                    'x_authorization': accessToken,
                },
            });

            console.log("Update response:", response.data);

            if (response.data.isSucess) {
                message.success('Product updated successfully');
                // Handle success...
            } else {
                console.error("Update failed. Server response:", response.data);
                message.error('Failed to update product. Please try again.');
                // Handle failure...
            }
        } catch (error) {
            console.error("Error updating product:", error);
            message.error('An error occurred while updating the product.');
            // Handle error...
        }
    };

    return (
        <ProductPage>
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Put Product</h1>
            <Divider></Divider>
            <Form layout="vertical" className="form" style={{ marginLeft: '30px' }} form={form} onFinish={onFinish}>
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
                                   
                                    style={{ width: '100%' }}
                                   
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
                               <Input/>
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item label="Summary" name="sumary">
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
