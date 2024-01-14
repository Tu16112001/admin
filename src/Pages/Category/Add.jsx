import { Button, Col, Divider, Form, Input, Modal, Row, Select ,message} from 'antd';
import { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CategoryPage } from './Style'
import axios from "axios"
export const AddCategory = () => {
    const onFinish = async (values) => {
        try {
          const accessToken = localStorage.getItem('accessToken'); // Assuming you have stored accessToken in localStorage
    
          if (!accessToken) {
            // Handle the case where accessToken is not available
            console.error('Access token not found!');
            return;
          }
    
          const response = await axios.post(
            'http://103.166.182.247:3001/categories/create',
            values,
            {
              headers: {
                'x_authorization': accessToken,
              },
            }
          );
          message.success('Added category successfully');
          console.log('Category added successfully:', response.data);
        } catch (error) {
          console.error('Error adding category:', error);
        }
      };
    


    return (
        <CategoryPage>
            <h1 style={{ textAlign: "center", marginTop: '20px' }}>Categories Add</h1>
            <Divider></Divider>
            <div >
            <Form layout="vertical" className="form" onFinish={onFinish} style={{marginLeft:"35%"}}>
                <Row>
                    <Col md={10}>

                        <Form.Item label="Category Name" name="name">
                            <Input  />
                        </Form.Item>


                        <Form.Item label="Category Key" name="key" rules={[{ required: true, min: 1 }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Category Type" name="type" rules={[{ required: true}]}>
                            <Select>
                                <Select.Option value="1">category</Select.Option>
                                <Select.Option value="2">collection</Select.Option>
                            </Select>
                        </Form.Item>
                        <span style={{ color: 'red' }}></span>
                        <Divider></Divider>
                        <Button htmlType="submit" type="primary" style={{ width:"100%" }}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            </div>


        </CategoryPage>
    )
}