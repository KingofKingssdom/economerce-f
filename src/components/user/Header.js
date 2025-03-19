import './indexUser.css'
import { CiViewList } from "react-icons/ci";
import { IoMdSearch, IoIosClose } from "react-icons/io";
import { FaPhoneAlt, FaTruck, FaCartPlus, FaRegUser, FaTabletAlt, FaLaptop } from "react-icons/fa";
import { IoIosPhonePortrait, IoIosArrowForward } from "react-icons/io";
import { TbDeviceAirpods } from "react-icons/tb";
import { IoWatch } from "react-icons/io5";
import { MdScreenshotMonitor } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showCategory, setShowCategory] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false); 
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleCall = () => {
        alert('Liên hệ số điện thoại 0942314');
    };

    const handleCategory = () => {
        setShowCategory(!showCategory);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        navigate("/login"); // Chuyển hướng về trang login
    };

    useEffect(() => {
        setShowCategory(false);
        setShowUserMenu(false); // Đóng menu khi thay đổi route
    }, [location]);

    const [cartItems, setCartItems] = useState([]);
    const cartId = user?.id;
    
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cartItem/count/${cartId}`);
                setCartItems(response.data);
            } catch (error) {
                console.error('Lỗi gọi api với cartItem :', error);
            }
        };

        fetchCartItems();
    }, [cartId]);

    return (
        <>
            <div className="container-header">
                <div className="navbar">
                    <div className="logo">
                        <Link to="/">
                            <img src="./image/Logo.jpg" alt='Ảnh logo'/>
                        </Link>
                    </div>
                    <div className="header-item-category">
                        <div className="btn-category" onClick={handleCategory}>
                            <CiViewList className='i' /> <p>Danh mục</p>
                        </div>
                    </div>
                    <div className='header-item-search'>
                        <IoMdSearch className='i' />
                        <input placeholder='Nhập sản phẩm cần tìm' />
                        <IoIosClose className='i search-close' />
                    </div>
                    <div className='header-item-call' onClick={handleCall}>
                        <div className="btn-call">
                            <FaPhoneAlt className='i call-icon' />
                            <p>Gọi mua hàng</p>
                        </div>
                    </div>
                    <div className='header-item-order' onClick={() => user ? navigate("/order") : navigate("/login")}>
                        
                            <div className="btn-order">
                                <FaTruck className='i ' />
                                <p>Tra cứu đơn hàng</p>
                            </div>
                        
                    </div>
                    <div className='header-item-cart'  onClick={() => user ? navigate("/cart") : navigate("/login")}>
                        
                            <div className="btn-cart">
                                <FaCartPlus className='i ' />
                                <p>Giỏ hàng</p>
                                <span>{cartItems}</span>
                            </div>
                     
                    </div>
                    
                    {/* Thông tin user + Logout */}
                    <div className='header-item-username' onClick={() => setShowUserMenu(!showUserMenu)}>
                        <FaRegUser className='i' />
                        {user ? (
                            <>
                                <p>{user.firstName}</p>
                                {showUserMenu && (
                                    <div className="user-dropdown">
    
                                        <button onClick={handleLogout}>Đăng xuất</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login"><p className='login-p'>Đăng nhập</p></Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Show danh mục */}
            <div className='container-show'>
                {showCategory && <div className="category show-category">
                    <Link to="/phoneProduct" className="item-category">
                        <IoIosPhonePortrait className="icon-item-category" />
                        <li className="item-li">Điện thoại</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                    <Link to="/tabletProduct" className="item-category">
                        <FaTabletAlt className="icon-item-category" />
                        <li className="item-li">Tablet</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                    <Link to="/laptopProduct" className="item-category">
                        <FaLaptop className="icon-item-category" />
                        <li className="item-li">Laptop</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                    <Link to="/soundProduct" className="item-category">
                        <TbDeviceAirpods className="icon-item-category" />
                        <li className="item-li">Âm thanh</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                    <Link to="/watchProduct" className="item-category">
                        <IoWatch className="icon-item-category" />
                        <li className="item-li">Đồng hồ</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                    <Link to="/screenProduct" className="item-category">
                        <HiMiniComputerDesktop className="icon-item-category" />
                        <li className="item-li">Màn hình</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                    <Link to="/tiviProduct" className="item-category">
                        <MdScreenshotMonitor className="icon-item-category" />
                        <li className="item-li">Tivi</li>
                        <IoIosArrowForward className="icon-item-category" />
                    </Link>
                </div>}
            </div>
        </>
    );
}

export default Header;
