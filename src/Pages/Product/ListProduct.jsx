import React, { useEffect, useState } from "react";
import { ProductPage } from './style';
import { Button, Col, Divider, Form, Image, Input, Modal, Pagination, Row, Space, Table, message, notification } from 'antd';
import Column from 'antd/es/table/Column';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

export const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const handleNavigateProduct = (ProductID) => {
        navigate(`/PutProduct/${ProductID}`);
    };

    const fetchData = async () => {
        try {
            const url = searchKeyword
                ? `http://103.166.182.247:3001/products/search?keyword=${encodeURIComponent(searchKeyword)}`
                : 'http://103.166.182.247:3001/products';

            const response = await axios.get(url);
            setProducts(response.data.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
            message.error("An error occurred while fetching products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchKeyword]); // Trigger fetchData when searchKeyword changes

    const handleDeleteProduct = async (id) => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.delete(
                `http://103.166.182.247:3001/products/${id}`,  // Sử dụng ID của sản phẩm
                {
                    headers: {
                        'x_authorization': accessToken,
                    },
                }
            );

            notification.success({
                message: "Product Deleted",
                description: "The product has been deleted successfully.",
            });

            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
            notification.error({
                message: "Error",
                description: `An error occurred while deleting the product: ${error.message}`,
            });
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedProducts = products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <ProductPage>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>List Products</h1>
            <Divider></Divider>
            <Col md={6} style={{ marginLeft: "20px" }}>
                <Form.Item label="Product Search">
                    <Input
                        placeholder="Product Search"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </Form.Item>
            </Col>
            <Divider></Divider>
            <Row>
                <Col md={24}>
                    <Table
                        size="small"
                        rowKey="id"
                        pagination={false}
                        dataSource={paginatedProducts}
                        loading={loading}
                    >
                        <Column title="ID" key="id" dataIndex="id" width={120} align="center"
                        ></Column>
                        <Column
                            title="Image"
                            key="image"
                            dataIndex="image"
                            width={140}
                            align="center"
                            render={(text, record) => {
                                console.log(record.image); // Log the value to the console
                                return (
                                    <Space size="middle">
                                        <Image width={80} height={80} src={record.image} />
                                    </Space>
                                );
                            }}
                        ></Column>
                        <Column title="Name" key="title" dataIndex="title" width={120} align="center"></Column>
                        <Column title="Price" key="price" dataIndex="price" width={120} align="center"></Column>
                        <Column title="Quantity" key="quantity" dataIndex="quantity" width={120} align="center"></Column>
                        <Column title="Discount" key="discount" dataIndex="discount" width={120} align="center"></Column>
                        <Column title="Category ID" key="categoryId" dataIndex="categoryId" width={140} align="center"></Column>
                        <Column title="Sold" key="totalSold" dataIndex="totalSold" width={120} align="center"></Column>
                        <Column
                            title="Action"
                            key="action"
                            align="center"
                            width={240}
                            render={(_, record) => (
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        size="small"
                                        style={{ display: "flex", alignItems: "center" }}
                                        onClick={() => handleNavigateProduct(record.id)}
                                    >
                                        <EditOutlined style={{ marginRight: 4 }} />
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteProduct(record.id)}
                                        type="primary"
                                        size="small"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            background: record.isAvailable ? "#f5222d" : "#52c41a", // Red when isAvailable is false, green when true
                                            color: "white",
                                        }}
                                    >
                                        <DeleteOutlined style={{ marginRight: 4 }} />
                                        Delete
                                    </Button>
                                </Space>
                            )}
                        ></Column>
                    </Table>
                </Col>
            </Row>
            <Row style={{ marginTop: 12 }}>
                <Col md={24} style={{ textAlign: 'right' }}>
                    <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        total={products.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </Col>
            </Row>
        </ProductPage>
    );
};
