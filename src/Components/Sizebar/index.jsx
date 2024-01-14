import React, { useState } from 'react';
import { Button } from 'antd'
import { HeaderPage, ButtonComponent, ScrollableContainer } from './style'
import { AreaChartOutlined, AppstoreOutlined, ShoppingCartOutlined,AppstoreAddOutlined ,LogoutOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const SizeBar = () => {
    const navigate = useNavigate();
    const GetCategory = () => {
        navigate('/GetCategory')
    }
    const AddCategory = () => {
        navigate('/AddCategory')
    }
    const AddProduct = () => {
        navigate('/AddProduct')
    }
    const ListProduct = () => {
        navigate('/ListProduct')
    }
    const handOrderTable =()=>{
        navigate("/OrderTable")
    }
    const LogoutPage = async () => {
        try {
            // Get the access token from local storage
            const accessToken = localStorage.getItem('accessToken');
    
            // Call the logout API
            await axios.get('http://103.166.182.247:3001/users/logout', 
           {
            headers:{
                'x_authorization': accessToken,
            }
           });
    
            // Clear local storage
            localStorage.removeItem('fullName');
            localStorage.removeItem('UserID');
            localStorage.removeItem('accessToken');
    
            // Navigate to the login or home page
            navigate('/'); // You can change this to the desired route after logout
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error, if needed
        }
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

    const handleButtonClick = () => {
        navigate('/Home')
    };
    const handleButtonClick1 = () => {
        setIsDropdownOpen1(!isDropdownOpen1);
    };
    const handleButtonClick2 = () => {
        setIsDropdownOpen2(!isDropdownOpen2);
    };
    const handleButtonClick3 = () => {
        setIsDropdownOpen3(!isDropdownOpen3);
    };
    return (
        <HeaderPage>

            <div>
                <div style={{textAlign:"center"}}>
                    <ButtonComponent onClick={handleButtonClick}><div >
                        <AreaChartOutlined  style={{ fontSize: "16px" }} />  Home</div></ButtonComponent>


                </div>
            </div>
            <div>
                <div style={{textAlign:"center"}}>
                    <ButtonComponent onClick={handleButtonClick1}><div >
                        <AppstoreOutlined />  Category</div></ButtonComponent>
                    {
                        isDropdownOpen1 && (
                            <ScrollableContainer >
                                <a onClick={GetCategory}>List</a>
                                <a onClick={AddCategory}>Add</a>
                            </ScrollableContainer>
                        )
                    }


                </div>
            </div>
            <div>
                <div style={{textAlign:"center"}}>
                    <ButtonComponent onClick={handleButtonClick2}><div >
                        <AppstoreAddOutlined />   Products</div></ButtonComponent>
                    {
                        isDropdownOpen2 && (
                            <ScrollableContainer >
                                <a onClick={ListProduct}>List</a>
                                <a onClick={AddProduct}>Add</a>

                            </ScrollableContainer>
                        )
                    }


                </div>
            </div>
            <div>
                <div style={{textAlign:"center"}}>
                    <ButtonComponent onClick={handleButtonClick3}><div>
                        <ShoppingCartOutlined  style={{fontSize:"20px"}}/>  Order</div></ButtonComponent>
                    {
                        isDropdownOpen3 && (
                            <ScrollableContainer >
                                <a onClick={handOrderTable}>List</a>
                            </ScrollableContainer>
                        )
                    }


                </div>
            </div>
                    <div>
                        <div>
                            <ButtonComponent onClick={LogoutPage}>
                                <div><LogoutOutlined /> Logout</div>
                            </ButtonComponent>
                        </div>
                    </div>


        </HeaderPage>
    )

}