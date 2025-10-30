import './indexAdmin.css'
import React, { useEffect, useState } from 'react';
import { FaUser, FaHome, FaTable, FaFacebookMessenger } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { MdOutlineSubject } from "react-icons/md";
import { Link } from "react-router-dom";
function Sidebar() {
    const [account, setAccount] = useState(false);
    const toggleAccount = () => {
        setAccount(!account);
    };

    const [show, setShow] = useState(false);
    const tonggleShow = () => {
        setShow(!show)
    }

    const [table, setTable] = useState(false);
    const tonggleTable = () => {
        setTable(!table);
    }

    const [subject, setSubject] = useState(false);
    const tonggleSubject = () => {
        setSubject(!subject);
    }

    const [semester, setSemester] = useState(false);
    const tonggleSemester = () => {
        setSemester(!semester);
    }
    const [fullName, setFullName] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
            setFullName(payload.fullName);
        }
    }, []);
    return (
        <>
            <div className="sidebar">
                <h5>Quản trị viên</h5>
                <ul>
                    <span><i><FaUser /></i> Đặng Huy </span>
                    <li><Link to="/adminPage"> <i><FaHome /></i> Trang chủ</Link> </li>
                    <li className='dropdown'>
                        <div className='' onClick={tonggleShow}><GiAutoRepair />Quản lý danh mục<MdOutlineKeyboardArrowDown /></div>
                        {show && <ul>
                            <li className='c-li'><Link to="/admin/addCategory">Thêm danh mục</Link> </li>
                            <li className='c-li'><Link to="/admin/listCategory">Xem danh mục</Link> </li>
                        </ul>}
                    </li>
                    <li className='dropdown'>
                        <div onClick={tonggleSemester}>
                            <MdOutlineSubject /> Quản lý nhãn hiệu<MdOutlineKeyboardArrowDown />
                        </div>
                        {semester && <ul>
                            <li><Link to="/admin/addBrand">Thêm nhãn hiệu</Link></li>
                            <li><Link to="/admin/listBrand">Xem nhãn hiện</Link></li>
                        </ul>}
                    </li>
                    <li className='dropdown'>
                        <div className='' onClick={tonggleTable}><FaTable /> Quản lý sản phẩm <MdOutlineKeyboardArrowDown /></div>
                        {table && <ul>
                            <li className='c-li'> <Link to="/admin/addProduct">Thêm sản phẩm</Link> </li>
                            <li className='c-li'> <Link to="/admin/addProductColor">Thêm màu sắc sản phẩm</Link> </li>
                            <li className='c-li'> <Link to="/admin/addProductVariant">Thêm phiên bản sản phẩm</Link> </li>
                            <li className='c-li'> <Link to="/admin/listProduct">Xem sản phẩm</Link> </li>
                        </ul>}
                    </li>

                    <li className='dropdown'>
                        <div onClick={tonggleSubject}> <MdOutlineSubject /> Quản lý đơn hàng <MdOutlineKeyboardArrowDown /></div>
                        {subject && <ul>
                            <li><Link to="/admin/listOrder">Xem đơn hàng</Link></li>

                        </ul>}
                    </li>
                    <span>Trao đổi</span>
                    <li><FaFacebookMessenger /> Tin nhắn</li>
                </ul>
            </div>

        </>
    )
}
export default Sidebar;