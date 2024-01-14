import React, { useState } from 'react';
import { Button ,Avatar} from 'antd'
import {SizeBar} from '../Sizebar/index'
import Logo from "../../Image/logo.png"
import {UserOutlined} from '@ant-design/icons'
export const Header = () => {
    return (
        <div style={{width:"100%"}}> 
            <div style={{width:"100%",display:'flex',justifyContent:"space-between",background:"#ccc"}}>
                <img src={Logo} style={{ width: "100px", height: "100px" ,marginLeft:"80px"}} />
                <div style={{position :"absolute" ,right:"240px",top:'40px',color:"white"}}>
                   <h2>ADMIN</h2>
                   </div>
            </div>
            <SizeBar/>
        </div>

    );
};