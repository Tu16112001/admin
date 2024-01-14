import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Space, Divider, Button } from 'antd';
import { OrderPage } from './style';
import { Link } from 'react-router-dom';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://103.166.182.247:3001/orders/?orderField=id&pageSize=15&pageNum=0&sortby=desc', {
          headers: {
            'x_authorization': accessToken,
          },
        });
        setOrders(response.data.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusPing = {
          1: 'Packing',
          2: 'Assigned',
          3: 'Coming',
          4: 'Transport',
          5: 'Wait receive',
          6: 'Delivered',
          7: 'Complete',
          8: 'Wait for confirmation',
          9: 'Please wait for someone to pick up the goods',
          10: 'Complete cancellation',
        };

        return statusPing[status] || 'Packing';
      },
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (paymentMethod) => {
        const paymentMethodMapping = {
          1: 'Payment upon delivery',
          2: 'Pay by PayPal',
          // Nếu có thêm giá trị khác cần xử lý, thêm vào đây
        };

        return paymentMethodMapping[paymentMethod] || 'Payment upon delivery';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/UpdateStatus/${record.id}`}>
            <Button>Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <OrderPage>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Order Table</h1>
      <Divider />
      <Table style={{textAlign:"center"}} dataSource={orders} columns={columns} pagination={{ pageSize: 8 }} />
    </OrderPage>
  );
};

export default OrderTable;
