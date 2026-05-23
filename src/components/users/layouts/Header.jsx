import "../../../styles/index.css"
import Category from "../ui/Category";
import SearchProduct from "../ui/SearchProduct";
import { CiViewList } from "react-icons/ci";
import { IoMdSearch, IoIosClose } from "react-icons/io";
import { FaCartPlus, FaRegUser } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { LuTruck } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { getUserCurrent } from "../../../services/ApiAuth";
function Header() {

    const location = useLocation();
    const navigate = useNavigate();
    const [showCategory, setShowCategory] = useState(false);
    const [changeArow, setChangeArow] = useState(false);
    const [changeColorBtnCategory, setChangeColorBtnCategory] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchItem, setSearchItem] = useState('');

    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleCall = () => {
        alert('Liên hệ số điện thoại 0942314');
    }

    const handleCategory = () => {
        setShowCategory((pre) => !pre);
        setChangeArow((change) => !change);
        setChangeColorBtnCategory((changeColor) => !changeColor)
    }

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setShowUserMenu(false);
        navigate("/Login");
    }
    const handleBoxShowSearch = () => {
        setShowSearchBox(true);
    }

    const closeBox = () => {
        setShowSearchBox(false);
    }
    const handleSearchChange = (e) => {
        setSearchItem(e.target.value);
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        // Nếu chưa đăng nhập (không có token), đá về trang login ngay
        if (!token) {
            alert("Vui lòng đăng nhập để xem thông tin cá nhân!");
            navigate("/login");
            return;
        }

        // Nếu có token, tiến hành gọi API lấy profile
        getUserCurrent()
            .then((response) => {
                // response lúc này chính là cục Map.of("id",..., "fullName",...) từ Backend trả về
                setUser(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi lấy thông tin profile:", error);
                alert("Không thể tải thông tin profile. Phiên đăng nhập có thể đã hết hạn.");
                setLoading(false);
                // Nếu lỗi 403/401, có thể xóa token cũ và bắt đăng nhập lại
                // localStorage.removeItem("accessToken");
                // navigate("/login");
            });
    }, [navigate]);


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
                                <div className='header-item-order' > {/*onClick={() => { user ? navigate("/order") : navigate("/login") }}*/}
                                    <div className="btn-order">
                                        <LuTruck className='order-icon' />
                                    </div>
                                </div>
                                <div className='header-item-cart'>{/* onClick={() => user ? navigate("/cart") : navigate("/login")}*/}
                                    <div className="btn-cart">
                                        <FaCartPlus />
                                    </div>
                                </div>
                                {/* Thông tin user + Logout */}
                                <div className="header-item-username">
                                    <FaRegUser className="icon-login" />

                                    {user ? (
                                        <>
                                            <p
                                                className="name-user"
                                                onClick={() => setShowUserMenu(!showUserMenu)}
                                            >
                                                {user.fullName.split(" ").pop()}
                                            </p>

                                            {showUserMenu && (
                                                <div className="user-dropdown" >
                                                    <button onClick={handleLogout}>
                                                        Đăng xuất <MdOutlineLogout />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link to="/login" className="login-link" onClick={(e) => e.stopPropagation()}>
                                            Đăng nhập
                                        </Link>
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
                            <div className="header-item-username">
                                <FaRegUser className="icon-login" />

                                {user ? (
                                    <>
                                        <p
                                            className="name-user"
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                        >
                                            {user.fullName.split(" ").pop()}
                                        </p>

                                        {showUserMenu && (
                                            <div className="user-dropdown">
                                                <button onClick={handleLogout}>
                                                    Đăng xuất <MdOutlineLogout />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/login" className="login-link" onClick={(e) => e.stopPropagation()}>
                                        Đăng nhập
                                    </Link>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
                <div className={`box-show-search ${showSearchBox ? 'search-show' : ''}`}>
                    <SearchProduct
                        dataSearch={searchItem}
                    />
                </div>
            </div>



        </>
    )
}
export default Header;