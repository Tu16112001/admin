import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Divider ,message,Select,Space} from 'antd';
import { OrderPage } from './style';
import { useParams } from 'react-router-dom';

const UpdateStatus = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
          try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`http://103.166.182.247:3001/orders/${orderId}`, {
              headers: {
                'x_authorization': accessToken,
              },
            });
            setOrder(response.data.data.order);
            setLoading(false);
            // Set the selectedStatus when order details are fetched
            setSelectedStatus(response.data.data.order.status);
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        };
    
        fetchOrderDetails();
      }, [orderId]);
    
      const handleUpdateStatus = async (value) => {
        console.log('Updating status for order:', order.id, 'to status:', value);
    
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await axios.put(
            `http://103.166.182.247:3001/orders/status/${order.id}`,
            { status: value },
            {
              headers: {
                'x_authorization': accessToken,
              },
            }
          );
    
          console.log('Update status response:', value);
          message.success('Order status updated successfully');
          // Update the selected status when the status is successfully updated
          setSelectedStatus(value);
        } catch (error) {
          message.error('Error updating order status');
        }
      };
    
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
        }, {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt="Product" style={{ maxWidth: '80px' }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },

        {
            title: 'Update Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Space>
         <Select
          defaultValue={selectedStatus} // Use selectedStatus as the default value
          style={{ width: 220 }}
          onChange={(value) => handleUpdateStatus(value)}

        >
            <Select.Option value={0}>Start Oder</Select.Option>
            <Select.Option value={1}>Packing</Select.Option>
            <Select.Option value={2}>Assigned</Select.Option>
            <Select.Option value={3}>Coming</Select.Option>
            <Select.Option value={4}>Transport</Select.Option>
            <Select.Option value={5}>Wait receive</Select.Option>
            <Select.Option value={6}>Delivered</Select.Option>
            <Select.Option value={7}>Complete</Select.Option>
            <Select.Option value={8}>Wait for confirmation</Select.Option>
            <Select.Option value={9}>Please wait for someone to pick up the goods</Select.Option>
            <Select.Option value={10}>Complete cancellation</Select.Option>
          </Select>
        </Space>
            ),
        },
    ];

    if (loading) {
        return <p>Loading...</p>;
    }
    const paymentMethodStyles = {
        1: {
            text: 'Payment upon delivery',
        },
        2: {
            text: 'Pay by PayPal',
        },
    };

    const paymentMethod = order.paymentMethod;
    const paymentStyle = paymentMethodStyles[paymentMethod] || {};
    return (
        <OrderPage>
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Order Details</h1>
            <Divider />
            <div style={{ display: 'flex', width: "100%", justifyContent: "space-between" }}>
                <div style={{ width: "49%" }} >
                    <h5 style={{ height: "50px", background: "#AAA", padding: "15px" }}>Full Name: {order.fullName}</h5>
                    <h5 style={{ height: "50px", background: "#AAA", padding: "15px" }}>Mobile: {order.mobile}</h5>
                    <h5 style={{ height: "50px", background: "#AAA", padding: "15px" }}>Address: {order.address}</h5>
                </div>
                <div style={{ width: "49%" }} >
                    <h5 style={{ height: "50px", background: "#AAA", padding: "15px" }}>Note: {order.note}</h5>
                    <h5 style={{ background: '#AAA', height: '50px', padding: '15px' }}>
                        Payment Method: {paymentStyle.text || 'Payment upon delivery'}
                    </h5>
                    <h5 style={{ height: "50px", background: "#AAA", padding: "15px" }}>Subtotal: {order.discount}$</h5>
                </div>
            </div>
            <Table style={{ textAlign: 'center' }} dataSource={order.items} columns={columns}  pagination={{ pageSize: 6 }}/>
        </OrderPage>
    );
};

export default UpdateStatus;
