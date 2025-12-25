import "./indexAdmin.css"
import { FaCartPlus, FaUserGroup } from "react-icons/fa6";
import { FaMoneyBill, FaTasks } from "react-icons/fa";
function Summary() {
    let total = 1000;
    return (
        <>
            <div className="container-summary">
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-order">
                            <FaCartPlus />
                        </div>
                        <p>Tổng đơn hàng</p>
                        <h3>{total.toLocaleString('en-US')}</h3>
                    </div>

                </div>
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-revenue">
                            < FaMoneyBill />
                        </div>
                        <p>Tổng doanh thu</p>
                        <h3>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                            total)}</h3>
                    </div>

                </div>
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-product">
                            < FaTasks />
                        </div>
                        <p>Tổng sản phẩm</p>
                        <h3>{total.toLocaleString('en-US')}</h3>
                    </div>

                </div>
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-user">
                            < FaUserGroup />
                        </div>
                        <p>Tổng người dùng</p>
                        <h3>{total.toLocaleString('en-US')}</h3>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Summary;