import "../../../../styles/index.css";
import { getAllOrder } from "../../../../services/ApiOrder";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PageNavigation from "../../common/PageNavigation"
import { LiaEyeSolid } from "react-icons/lia";
function ListOrder() {
    const [orders, setOrders] = useState([]);
    const [showBoxUpdate, setShowBoxUpdate] = useState(false);
    const [idData, setIdData] = useState(0);
    const fetchOrderAll = async () => {
        try {
            await getAllOrder().then((response) => {
                setOrders(response.data)
            });

        } catch (error) {
            console.log("Lỗi lấy toàn bộ sản phẩm " + error)
        }
    }
    useEffect(() => {
        fetchOrderAll()
    }, [])
    const [displayData, setDisplayData] = useState([]);
    const [filterData, setFilterData] = useState("");
    const handleFilterData = (e) => {
        setFilterData(e.target.value);
    }
    const handleSearch = async () => {
        try {
            await getCategoryByCategoryCode(filterData).then((response) => {
                setCategories([response.data]);
            })
        }
        catch (error) {
            console.log("Lỗi lọc sản phẩm " + error)
        }
    }
    const handleUpdate = (id) => {
        setShowBoxUpdate(true)
        setIdData(id)
    }
    const ORDER_STATUS = {
        0: { text: "Đang chờ xác nhận", color: "orange" },
        1: { text: "Đã xác nhận", color: "blue" },
        2: { text: "Đang giao hàng", color: "purple" },
        3: { text: "Hoàn thành", color: "green" },
        4: { text: "Đã hủy", color: "red" },
    };
    const PAYMENT_STATUS = {
        0: { text: "Chưa thanh toán", color: "red" },
        1: { text: "Đã thanh toán", color: "green" },
    };
    return (
        <>
            <div className="container-admin">
                <div className="content-list">
                    <div className="container-content-list">
                        <div>
                            <h2>Quản lý đơn hàng</h2>
                            <p>Theo dõi và xử lý các giao dịch khách hàng trong hệ thống</p>
                        </div>
                        <div className="btn-add-list">
                            <IoAddOutline /> Xuất báo cáo
                        </div>
                    </div>
                    <div className="table-content-list">
                        <div className="content-top-list">
                            <div className="search-item-list">
                                Tìm kiếm theo mã đơn hàng
                                <div className="container-search-item-list">
                                    <input
                                        value={filterData}
                                        onChange={handleFilterData}
                                        placeholder="Nhập mã tìm kiếm ......."
                                    />
                                    <button
                                        onClick={handleSearch}
                                    >Tìm</button>
                                </div>

                            </div>
                            <div className="filter-item-list">
                                <div className="filter-sort">
                                    <CgSortAz />
                                </div>
                                <div className="filter-download">
                                    <MdFileDownload />
                                </div>
                            </div>
                        </div>

                        <table className="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Ngày cập nhập</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Thanh toán</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData.map((order) => (

                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        {/* <td style={{ color: "red", fontWeight: "bolder" }}>{order.orderCode.slice(0, 7)}</td> */}
                                        <td>{order.receiverName}</td>
                                        <td>{order.dayCreate.replace('T', ' ').split('.')[0]}</td>
                                        <td>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                order.totalPrice)}
                                        </td>
                                        <td style={{ color: ORDER_STATUS[order.orderStatus]?.color, fontWeight: 'bold' }}>
                                            {ORDER_STATUS[order.orderStatus]?.text || "Không xác định"}
                                        </td>
                                        <td style={{ color: PAYMENT_STATUS[order.paymentStatus]?.color, fontWeight: 'bold' }}>
                                            {PAYMENT_STATUS[order.paymentStatus]?.text || "Không xác định"}
                                        </td>
                                        <td>
                                            <Link to={`/admin/orderDetail/${order.id}`}>
                                                <button className="btn-view" style={{
                                                    border: 'none'
                                                }}>
                                                    <LiaEyeSolid />
                                                </button>
                                            </Link>

                                            <button className="btn-update" style={{
                                                border: "none",
                                                marginLeft: "5px"
                                            }}
                                                onClick={() => handleUpdate(order.id)}>
                                                <GoPencil />
                                            </button>
                                            <Link to={`/admin/updateProduct/${order.id}`}>
                                                <button className="btn-delete" style={{
                                                    marginLeft: '5px',
                                                    border: 'none'
                                                }}>
                                                    <FaRegTrashAlt />
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                ))
                                }

                            </tbody>
                        </table>
                        <div>
                            <div className="container-button-change-page">
                                <PageNavigation
                                    resData={orders}
                                    onPageChange={(items) => setDisplayData(items)}
                                />

                            </div>
                        </div>
                    </div>



                </div>
                {/* <div className={`container-update-in-list ${showBoxUpdate ? 'active-box-update' : ''}`} >
                    <div className={`container-box-update-content ${showBoxUpdate ? 'active-box-update-down' : ''}`}>
                        <UpdateProduct
                            id={idData}
                            onSuccess={() => setShowBoxUpdate(false)}
                        />
                    </div>

                </div> */}
            </div>
        </>
    )
}
export default ListOrder;