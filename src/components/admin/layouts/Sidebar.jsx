import "../../../styles/index.css"
import { useState, useEffect } from 'react';
import { FaListAlt, FaFolder, FaHome, FaFacebookMessenger, FaFileInvoiceDollar, FaRegListAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory, MdOutlineKeyboardArrowDown, MdOutlineBrandingWatermark } from "react-icons/md";
import { MdOutlineSubject } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoEyeSharp, IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { getUserCurrent } from "../../../services/ApiAuth"
function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const fetchUser = async () => {
        try {
            await getUserCurrent()
                .then((response) => {
                    setUser(response);
                })
        } catch (error) {
            console.log("Lỗi gọi api lấy thông tin user " + error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    console.log("User bên addmin " + user)
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setShowUserMenu(false);
        navigate("/admin/login");
    }
    const tonggleShow = () => {
        setShow(!show)
    }

    const [product, setProduct] = useState(false);
    const tongleProduct = () => {
        setProduct(!product);
    }

    const [order, setOrder] = useState(false);
    const tongleOrder = () => {
        setOrder(!order);
    }

    const [brand, setBrand] = useState(false);
    const tonggleBrand = () => {
        setBrand(!brand);
    }
    const [specification, setSpecification] = useState(false);
    const tonggleSpec = () => {
        setSpecification(!specification)
    }
    return (
        <>
            <div className="sidebar">
                <div className='sidebar-hearder'>
                    <img src='/image/Logo.png' className='image-logo' alt='Logo' />
                    TechStore
                </div>
                <div className='container-select-item'>
                    <div className='select-item'>
                        <div className='content-item'>
                            <Link to="/admin/homePage"> <i><FaHome /></i> Trang chủ</Link>
                        </div>
                    </div>
                    <div className={`dropdown ${activeDropdown === "category" ? "select-item-active" : ""}`}
                    >

                        <div className='select-item'
                            onClick={
                                () => {
                                    // tonggleShow();
                                    setActiveDropdown("category");
                                }}>
                            <Link to="/admin/listCategory" className='content-item'>
                                <i><MdCategory /></i>Danh mục
                            </Link>
                        </div>

                    </div>
                    <div className={`dropdown ${activeDropdown === "brand" ? "select-item-active" : ""}`}>
                        <div className='select-item'
                            onClick={
                                () => {
                                    // tonggleBrand();
                                    setActiveDropdown("brand");
                                }}
                        >
                            <Link to="/admin/listBrand" className='content-item'>
                                <i><MdOutlineBrandingWatermark /></i>  Nhãn hàng
                            </Link>


                        </div>

                    </div>
                    <div className={`dropdown ${activeDropdown === "product" ? "select-item-active" : ""}`}>
                        <div className='select-item'
                            onClick={
                                () => {
                                    // tonggleBrand();
                                    setActiveDropdown("product");
                                }}
                        >
                            <Link to="/admin/listProduct" className='content-item'>
                                <i><MdOutlineSubject /></i>  Sản phẩm
                            </Link>


                        </div>

                    </div>


                    <div className={`dropdown ${activeDropdown === "order" ? "select-item-active" : ""}`}
                    >
                        <div className='select-item'
                            onClick={
                                () => {
                                    // tongleOrder();
                                    setActiveDropdown("order");
                                }}
                        >
                            <Link to="/admin/listOrder" className='content-item'>
                                <i><FaFileInvoiceDollar /></i>  Đơn hàng
                            </Link>

                        </div>

                    </div>
                    <div className={`dropdown ${activeDropdown === "specification" ? "select-item-active" : ""}`}
                    >
                        <div className='select-item'
                            onClick={
                                () => {
                                    // tongleOrder();
                                    setActiveDropdown("specification");
                                }}
                        >
                            <Link to="/admin/listSpecification" className='content-item'>
                                <i><IoSettingsSharp /></i>  Thông số sản phẩm
                            </Link>

                        </div>


                    </div>
                    <div><FaFacebookMessenger /> Tin nhắn</div>
                    {/* Thông tin user + Logout */}
                    <div className="header-item-username" style={{ marginTop: '270px' }}>
                        <FaRegUser className="icon-login" />

                        {user ? (
                            <>
                                <p
                                    className="name-user"


                                >
                                    {user.fullName.split(" ").pop()}
                                </p>


                            </>
                        ) : (
                            <Link to="/admin/login" className="login-link">
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}
export default Sidebar;