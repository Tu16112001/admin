import React, { useEffect, useState } from "react";
import { CategoryPage } from './Style';
import { Button, Col, Divider, Pagination, Row, Space, Table, notification, Spin } from 'antd';
import { EditOutlined, LockFilled, UnlockFilled } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export const GetCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://103.166.182.247:3001/categories");
            setCategories(response.data.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateHome = (categoryId) => {
        navigate(`/PutCategory/${categoryId}`);
    };

    const handleLockCategory = async (id, isActive) => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.put(
                `http://103.166.182.247:3001/categories/active/${id}`,
                { isActive },
                {
                    headers: {
                        'x_authorization': accessToken,
                    },
                }
            );

            notification.success({
                message: isActive ? "Category Unlocked" : "Category Locked",
                description: isActive ? "The category has been unlocked successfully." : "The category has been locked successfully.",
            });

            fetchData();
        } catch (error) {
            console.error(`Error ${isActive ? 'unlocking' : 'locking'} category:`, error);
            notification.error({
                message: "Error",
                description: `An error occurred while ${isActive ? 'unlocking' : 'locking'} the category: ${error.message}`,
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CategoryPage>
            <h1 style={{ textAlign: "center", marginTop: '20px' }}>Categories List</h1>
            <Divider></Divider>

            <Row>
                <Col md={24}>
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Table size="small" rowKey="id" pagination={false} dataSource={categories}>
                            <Column title="Category Id" key="id" dataIndex="id" width={340} align="center"></Column>
                            <Column title="Category Name" key="name" dataIndex="name" align="center"></Column>
                            <Column title="Category type" key="type" dataIndex="type" align="center" width={240}></Column>
                            <Column
                                title="Action"
                                key="action"
                                align="center"
                                width={240}
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Button onClick={() => handleNavigateHome(record.id)}
                                            key={record.key} type="primary" size="small"
                                            style={{ display: "flex", alignItems: "center" }}>
                                            <EditOutlined style={{ marginRight: 4 }} />
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleLockCategory(record.id, !record.isAvailable)}
                                            type="primary"
                                            size="small"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                background: record.isAvailable ? "#f5222d" : "#52c41a", // Red when isAvailable is false, green when true
                                                color: "white",
                                            }}
                                        >
                                            {record.isAvailable ? (
                                                <>
                                                    <LockFilled style={{ marginRight: 4 }} />
                                                    Lock
                                                </>
                                            ) : (
                                                <>
                                                    <UnlockFilled style={{ marginRight: 4 }} />
                                                    Open
                                                </>
                                            )}
                                        </Button>
                                    </Space>
                                )}
                            ></Column>
                        </Table>
                    )}
                    <Row style={{ marginTop: 12 }}>
                        <Col md={24} style={{ textAlign: 'center' }}>
                            <Pagination defaultCurrent={1} total={categories.length} pageSize={10} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </CategoryPage>
    );
};
