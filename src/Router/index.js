import NotFoud from "../Pages/NotFoud";
import Home from "../Pages/Home/index";
import Login from "../Pages/Login";
import { GetCategory } from "../Pages/Category/Get";
import { AddCategory } from "../Pages/Category/Add";
import { PutCategory } from "../Pages/Category/Put";
import { AddProduct } from "../Pages/Product/AddProduct";
import { ListProduct } from "../Pages/Product/ListProduct";
import { PutProduct } from "../Pages/Product/PutProduct";
import OrderTable from "../Pages/Order/OrderPage";
import UpdateStatus from "../Pages/Order/UpdateStatus"
export const routes = [
    {
        path: '*',
        page: NotFoud
    },{
        path: '/',
        page: Login,
        isShowHeader: false
    },{
        path: '/Home',
        page: Home,
        isShowHeader: true
    },{
        path: '/GetCategory',
        page: GetCategory,
        isShowHeader: true
    },{
        path:"/AddCategory",
        page:AddCategory,
        isShowHeader: true
    },{
        path:"/PutCategory/:categoryId",
        page:PutCategory,
        isShowHeader: true
    },{
        path:"/AddProduct",
        page:AddProduct,
        isShowHeader: true
    },{
        path:"/ListProduct",
        page:ListProduct,
        isShowHeader: true
    },{
        path:"/OrderTable",
        page:OrderTable,
        isShowHeader: true  
    },{
        path:"/UpdateStatus/:orderId",
        page:UpdateStatus,
        isShowHeader: true  
    },{
        path:"/PutProduct/:ProductID",
        page:PutProduct,
        isShowHeader: true
    }]
