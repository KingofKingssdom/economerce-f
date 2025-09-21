// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { LuTruck } from "react-icons/lu";
// import { FaCartPlus, FaRegUser } from "react-icons/fa";
// import { useState } from 'react';
import './indexUser.css'
function headerChild() {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [showCategory, setShowCategory] = useState(false);
    // const [changeArow, setChangeArow] = useState(false);
    // const [changeColorBtnCategory, setChangeColorBtnCategory] = useState(false);
    // const [showUserMenu, setShowUserMenu] = useState(false);
    // const storedUser = localStorage.getItem("user");
    // const user = storedUser ? JSON.parse(storedUser) : null;
    // const [cartItems, setCartItems] = useState([]);
    // const cartId = user?.id;
    return (
        <>
            <div className='container-header-child'>
                Header dùng phụ
                {/* <div className='header-box-right'>
                    <div className='header-item-order' onClick={() => user ? navigate("/order") : navigate("/login")}>
                        <div className="btn-order">
                            <LuTruck className='order-icon' />
                        </div>
                    </div>
                    <div className='header-item-cart' onClick={() => user ? navigate("/cart") : navigate("/login")}>
                        <div className="btn-cart">
                            <FaCartPlus />
                            <span>{cartItems}</span>
                        </div>
                    </div>
                    {/* Thông tin user + Logout */}
                {/* <div className='header-item-username' onClick={() => setShowUserMenu(!showUserMenu)}>
                        <FaRegUser className='icon-login' />
                        {user ? (
                            <>
                                <p className='name-user'>{user.firstName}</p>
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
                </div> */}
            </div>

        </>
    )
}
export default headerChild