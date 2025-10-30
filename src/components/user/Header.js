import './indexUser.css'
import { CiViewList } from "react-icons/ci";
import { IoMdSearch, IoIosClose } from "react-icons/io";
import { FaCartPlus, FaRegUser } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { LuTruck } from "react-icons/lu";
import Category from "./Category.js"
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import axios from 'axios';
function Header() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const [showCategory, setShowCategory] = useState(false);
    const [changeArow, setChangeArow] = useState(false);
    const [changeColorBtnCategory, setChangeColorBtnCategory] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [results, setResults] = useState([]);

    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);



    useEffect(() => {
        if (location.state?.user) {
            setUser(location.state.user);
        } else {
            const savedUser = sessionStorage.getItem("user");
            if (savedUser) setUser(JSON.parse(savedUser));
        }
    }, [location.state]);

    const handleCall = () => {
        alert('Liên hệ số điện thoại 0942314');
    };

    const handleCategory = () => {
        setShowCategory((pre) => !pre);
        setChangeArow((change) => !change);
        setChangeColorBtnCategory((changeColor) => !changeColor)
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setShowUserMenu(false);
        navigate("/");
    };

    const handleBoxShowSearch = () => {
        setShowSearchBox(true);
    };
    const closeBox = () => {
        setShowSearchBox(false);
    };
    const handleSearchChange = (e) => {
        setSearchItem(e.target.value);
    };

    const fetchProducts = async (value) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/product/search/productName?productName=${value}`, {
            });
            setResults(response.data.data);
        } catch (error) {
            console.error("Lỗi khi tìm sản phẩm:", error);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchItem.trim() !== "") {
                fetchProducts(searchItem);
            } else {
                setResults([]);
            }
        }, 400); // 0.4s debounce tránh gọi API liên tục

        return () => clearTimeout(delayDebounce);
    }, [searchItem]);
    return (
        <>
            <div className="container-header">
                <div className='content-header-top'>
                    <div className="content-header-child-top">
                        <div className='header-item-call'
                            onClick={handleCall}
                        >
                            <div className="header-item-call">
                                <p>Hotline: 1900 1234</p>
                            </div>
                        </div>
                        <div className='tb-ship'>
                            Miễn phí vận chuyển từ 500k
                        </div>
                        <div className='container-login-mobile'>
                            <div className='header-box-right'>
                                <div className='header-item-order' onClick={() => user ? navigate("/order") : navigate("/login")}>
                                    <div className="btn-order">
                                        <LuTruck className='order-icon' />
                                    </div>
                                </div>
                                <div className='header-item-cart' onClick={() => user ? navigate("/cart") : navigate("/login")}>
                                    <div className="btn-cart">
                                        <FaCartPlus />
                                    </div>
                                </div>
                                {/* Thông tin user + Logout */}
                                <div className='header-item-username'
                                    onClick={() => user && setShowUserMenu(!showUserMenu)}
                                >
                                    <FaRegUser className='icon-login' />
                                    {user ? (
                                        <>
                                            <p className='name-user'>{user.fullName.split(" ").pop()}</p>
                                            {showUserMenu && (
                                                <div className="user-dropdown">

                                                    <button onClick={handleLogout}>Đăng xuất <MdOutlineLogout /></button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link to="/login"><p className='login-p'>Đăng nhập</p></Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='content-header-bottom'>
                    <div className="content-header-child-bottom">
                        <div className="logo">
                            <Link to="/">
                                <img src="./image/Logo.png" alt='Ảnh logo' />
                            </Link>
                        </div>
                        <div className="header-item-category"
                            onClick={handleCategory}
                        >
                            <div className={`btn-category ${changeColorBtnCategory ? 'btn-category-change' : ''}`}>
                                <CiViewList className='icon-category' />
                                <p>Danh mục</p>
                                <div className={`arow-category ${changeArow ? 'arow-chage-category' : ''}`}>
                                    <AiOutlineCaretDown />
                                </div>
                            </div>
                            {/* Show danh mục   */}
                            <div className={`container-category ${showCategory ? 'show' : ''}`}>
                                <Category />
                            </div>
                        </div>
                        <div className='header-item-search'>
                            <div className='search-left'>
                                <IoMdSearch className='icon-search' />
                            </div>
                            <input
                                placeholder='Bạn muốn tìm gì hôm nay ?'
                                onFocus={handleBoxShowSearch}
                                onChange={handleSearchChange}
                                value={searchItem}
                            />
                            <div className='close-search'
                                onClick={closeBox}
                            >
                                <IoIosClose />
                            </div>
                        </div>
                        <div className='header-box-right not-mobile'>
                            <div className='header-item-order' onClick={() => user ? navigate("/order") : navigate("/login")}>
                                <div className="btn-order">
                                    <LuTruck className='order-icon' />
                                </div>
                            </div>
                            <div className='header-item-cart' onClick={() => user ? navigate("/cart") : navigate("/login")}>
                                <div className="btn-cart">
                                    <FaCartPlus />
                                </div>
                            </div>
                            {/* Thông tin user + Logout */}
                            <div className='header-item-username'
                                onClick={() => user && setShowUserMenu(!showUserMenu)}
                            >
                                <FaRegUser className='icon-login' />
                                {user ? (
                                    <>
                                        <p className='name-user'>{user.fullName.split(" ").pop()}</p>
                                        {showUserMenu && (
                                            <div className="user-dropdown">

                                                <button onClick={handleLogout}>Đăng xuất <MdOutlineLogout /></button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/login"><p className='login-p'>Đăng nhập</p></Link>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className={`box-show-search ${showSearchBox ? 'search-show' : ''}`}>

                {results.length > 0 && (
                    <ul className="search-results">
                        {results.map((item) => (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} width={40} />
                                {item.productName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </>
    );
}

export default Header;
