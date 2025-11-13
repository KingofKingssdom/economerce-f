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
                <ul>
                    <span><i><FaUser /></i> Đặng Huy </span>
                    <li><Link to="/admin/home"> <i><FaHome /></i> Trang chủ</Link> </li>
                    <li className='dropdown'>
                        <div className='' onClick={tonggleShow}><GiAutoRepair />Quản lý danh mục<MdOutlineKeyboardArrowDown /></div>
                        {show && <div>
                            <Link to="/admin/addCategory"><div className='c-li'>Thêm danh mục</div></Link>
                            <Link to="/admin/listCategory"><div className='c-li'>Xem danh mục</div></Link>
                        </div>}
                    </li>
                    <li className='dropdown'>
                        <div onClick={tonggleSemester}>
                            <MdOutlineSubject /> Quản lý nhãn hiệu<MdOutlineKeyboardArrowDown />
                        </div>
                        {semester && <div>
                            <Link to="/admin/addBrand"><div className='c-li'>Thêm nhãn hiệu</div></Link>
                            <Link to="/admin/listBrand"><div className='c-li'>Xem nhãn hiệu</div></Link>
                        </div>}
                    </li>
                    <li className='dropdown'>
                        <div className='' onClick={tonggleTable}><FaTable /> Quản lý sản phẩm <MdOutlineKeyboardArrowDown /></div>
                        {table && <div>
                            <Link to="/admin/addProduct"> <div className='c-li'>Thêm sản phẩm</div></Link>
                            <Link to="/admin/addProductColor"> <div className='c-li'>Thêm màu sắc</div></Link>
                            <Link to="/admin/addProductVariant"> <div className='c-li'>Thêm phiên bản</div></Link>
                            <Link to="/admin/listProduct"> <div className='c-li'>Xem sản phẩm</div></Link>
                        </div>}
                    </li>

                    <li className='dropdown'>
                        <div onClick={tonggleSubject}> <MdOutlineSubject /> Quản lý đơn hàng <MdOutlineKeyboardArrowDown /></div>
                        {subject && <div>
                            <Link to="/admin/listOrder"> <div className='c-li'>Xem đơn hàng</div></Link>

                        </div>}
                    </li>
                    <span>Trao đổi</span>
                    <li><FaFacebookMessenger /> Tin nhắn</li>
                </ul>
            </div>

        </>
    )
}
export default Sidebar;