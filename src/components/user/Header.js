import './indexUser.css'
import { CiViewList } from "react-icons/ci";
import { IoMdSearch, IoIosClose } from "react-icons/io";
import { FaPhoneAlt, FaTruck, FaCartPlus, FaRegUser } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import Category from "./Category.js"
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showCategory, setShowCategory] = useState(false);
    const [changeArow, setChangeArow] = useState(false);
    const [changeColorBtnCategory, setChangeColorBtnCategory] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false); 
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleCall = () => {
        alert('Liên hệ số điện thoại 0942314');
    };

    const handleCategory = () => {
        setShowCategory((pre)=>!pre);
        setChangeArow((change) => !change);
        setChangeColorBtnCategory((changeColor)=> !changeColor)
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        navigate("/login"); // Chuyển hướng về trang login
    };

    useEffect(() => {
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
                 <div className="header-item-category" 
                            onMouseEnter={handleCategory}
                            onMouseLeave={handleCategory}
                            
                    >
                                <div className={`btn-category ${changeColorBtnCategory ? 'btn-category-change': ''}`}>
                                <CiViewList className='i' /> 
                                <p>Danh mục</p> 
                                <div className={`arow-category ${changeArow ? 'arow-chage-category': ''}`}>
                                <AiOutlineCaretDown />
                                </div>
                                </div>
                            {/* Show danh mục   */}
                            <div className={`container-category ${showCategory ? 'show' : ''}`}> 
                                <Category/> 
                            </div>
                    </div>
                <div className="content-header">
                    <div className="logo">
                        <Link to="/">
                            <img src="./image/Logo.png" alt='Ảnh logo'/>
                        </Link>
                    </div> 
                    
                   

                    <div className='header-item-search'>
                            <IoMdSearch className='i'/>
                            <input placeholder='Bạn muốn tìm gì hôm nay' />
                            <IoIosClose className='i search-close' />
                    </div>

                    <div className='header-item-call' onClick={handleCall}>
                        <div className="btn-call">
                            <FaPhoneAlt className='i call-icon' />
                            <p>Liên hệ</p>
                        </div>
                    </div>

                    <div className='header-item-order' onClick={() => user ? navigate("/order") : navigate("/login")}>
                        <div className="btn-order">
                            <FaTruck className='i order-icon'/>
                            <p>Tra cứu đơn hàng</p>
                        </div>
                    </div>

                     <div className='header-item-cart'  onClick={() => user ? navigate("/cart") : navigate("/login")}>
                        <div className="btn-cart">
                            <FaCartPlus className='i'/>
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

            
        </>
    );
}

export default Header;
