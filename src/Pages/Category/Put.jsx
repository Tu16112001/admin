import React, { useEffect, useState } from "react";
import { CategoryPage } from "./Style";
import { Button, Col, Divider, Form, Input, Modal, Row, Select, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const { confirm } = Modal;

export const PutCategory = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://103.166.182.247:3001/categories/${categoryId}`);
                setCategory(response.data.data.category);
                form.setFieldsValue(response.data.data.category);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchData();
    }, [categoryId, form]);

    const onFinish = async (values) => {
        const accessToken = localStorage.getItem('accessToken'); // Assuming you have stored accessToken in localStorage

        if (!accessToken) {
            // Handle the case where accessToken is not available
            console.error('Access token not found!');
            return;
        }

        try {

            await axios.put(`http://103.166.182.247:3001/categories/${categoryId}`, values, {
                headers: {
                    'x_authorization': accessToken,
                },
            });
            message.success('Update category successfully');
            // Handle success, e.g., show a success message or redirect to another page
            console.log("Category updated successfully");
        } catch (error) {
            console.error("Error updating category:", error);
            // Handle error, e.g., show an error message
        }
    };

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this category?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                // Handle delete action here
                console.log("Delete category with id:", categoryId);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return (
        <CategoryPage>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Categories Fix</h1>
            <Divider></Divider>

            <div>
                <Form form={form} layout="vertical" onFinish={onFinish} className="form" style={{ marginLeft: "35%" }}>
                    <Row>
                        <Col md={10}>
                            <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Category key" name="key" rules={[{ required: true, min: 1 }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Category Type" name="type" rules={[{ required: true }]}>
                            <Select>
                                <Select.Option value="1">category</Select.Option>
                                <Select.Option value="2">collection</Select.Option>
                            </Select>
                        </Form.Item>

                            <Divider></Divider>
                            <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
                                Submit
                            </Button>

                        </Col>
                    </Row>
                </Form>
            </div>
        </CategoryPage>
    );
};
