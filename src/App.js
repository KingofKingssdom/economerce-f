import { IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/user/HomePage";
import PhoneProduct from "./components/user/PhoneProduct";
import TabletProduct from "./components/user/TabletProduct";
import LaptopProduct from "./components/user/LaptopProduct";
import SoundProduct from "./components/user/SoundProduct";
import WatchProduct from "./components/user/WatchProduct";
import ScreenProduct from "./components/user/ScreenProduct";
import TvProduct from "./components/user/TvProduct";
import PhoneDetail from "./components/user/PhoneDetail";
import TabletDetail from "./components/user/TabletDetail";
import LaptopDetail from "./components/user/LaptopDetail";
import SoundDetail from "./components/user/SoundDetail";
import ScreenDetail from "./components/user/ScreenDetail";
import WatchDetail from "./components/user/WatchDetail";
import TvDetail from "./components/user/TvDetail";
import AdminLayout from "./components/AdminLayout"
import HomeAdmin from "./components/admin/HomeAdmin"
import UserLayout from "./components/UserLayout";
import AddCategory from "./components/admin/Add/AddCategory";
import ListCategory from "./components/admin/Get/ListCategory";
import UpdateCategory from "./components/admin/Update/UpdateCategory";
import ListProduct from "./components/admin/Get/ListProduct";
import ProductDetail from "./components/admin/ProductDetail";
import AddProduct from "./components/admin/Add/AddProduct";
import ListBrand from "./components/admin/Get/ListBrand";
import AddBrand from "./components/admin/Add/AddBrand";
import UpdateBrand from "./components/admin/Update/UpdateBrand";
import UpdateProduct from "./components/admin/Update/UpdateProduct";
import ListUser from "./components/admin/Get/ListUser";
import Information from "./components/user/Information";
import Cart from "./components/user/Cart";
import PayResult from "./components/user/PayResult";
import Order from "./components/user/Order";
import OrderDetail from "./components/user/OrderDetail";
import ListOrder from "./components/admin/Get/ListOrder";
import ListOrderDetail from "./components/admin/Get/ListOrderDetail";
import Login from "./components/user/Login";
import PayMethod from "./components/user/PayMethod";
import AddProductColor from "./components/admin/Add/AddProductColor";
import AddProductVariant from "./components/admin/Add/AddProductVariant";
import LoginAdmin from "./components/admin/LoginAdmin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
function App() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div>
            <Router>
                <Routes>
                    {/* Layout User */}
                    <Route element={<UserLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/phoneProduct" element={<PhoneProduct />} />
                        <Route path="/tabletProduct" element={<TabletProduct />} />
                        <Route path="/laptopProduct" element={<LaptopProduct />} />
                        <Route path="/soundProduct" element={<SoundProduct />} />
                        <Route path="/watchProduct" element={<WatchProduct />} />
                        <Route path="/screenProduct" element={<ScreenProduct />} />
                        <Route path="/tiviProduct" element={<TvProduct />} />
                        <Route path="/phoneDetail/:id" element={<PhoneDetail />} />
                        <Route path="/tabletDetail/:id" element={<TabletDetail />} />
                        <Route path="/laptopDetail/:id" element={<LaptopDetail />} />
                        <Route path="/soundDetail/:id" element={<SoundDetail />} />
                        <Route path="/screenDetail/:id" element={<ScreenDetail />} />
                        <Route path="/watchDetail/:id" element={<WatchDetail />} />
                        <Route path="/tvDetail/:id" element={<TvDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/confirmInformation/:id" element={<Information />} />
                        <Route path="/pay-result" element={<PayResult />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/orderDetail/:id" element={<OrderDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/payOnline" element={<PayMethod />} />

                    </Route>

                    {/* Layout Admin */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="/admin/home" element={
                            <AdminProtectedRoute>
                                <HomeAdmin />
                            </AdminProtectedRoute>

                        } />
                        <Route path="/admin/addCategory" element={<AddCategory />} />
                        <Route path="/admin/listCategory" element={<ListCategory />} />
                        <Route path="/admin/updateCategory/:id" element={<UpdateCategory />} />
                        <Route path="/admin/listProduct" element={<ListProduct />} />
                        <Route path="/admin/productDetail/:id" element={<ProductDetail />} />
                        <Route path="/admin/addProduct" element={<AddProduct />} />
                        <Route path="/admin/listBrand" element={<ListBrand />} />
                        <Route path="/admin/addBrand" element={<AddBrand />} />
                        <Route path="/admin/updateBrand/:id" element={<UpdateBrand />} />
                        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />} />
                        <Route path="/admin/listUser" element={<ListUser />} />
                        <Route path="/admin/listOrder" element={<ListOrder />} />
                        <Route path="/admin/orderDetail/:id" element={<ListOrderDetail />} />
                        <Route path="/admin/addProductColor" element={<AddProductColor />} />
                        <Route path="/admin/addProductVariant" element={<AddProductVariant />} />
                    </Route>
                    <Route path="/admin/login" element={<LoginAdmin />} />
                </Routes>
            </Router>

            {showButton && (
                <div className="button-scroll-top" onClick={handleScrollToTop}>
                    <IoIosArrowUp className="icon-scroll" />
                    <p>Lên đầu</p>
                </div>
            )}
        </div>
    )
}

export default App;
