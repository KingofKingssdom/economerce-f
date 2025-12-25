import "./indexUser.css";
import { GrMoney } from "react-icons/gr";
import { SlUser } from "react-icons/sl";
import { RiSwapBoxLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineCameraswitch } from "react-icons/md";
function Buy() {
    return (
        <>
            <div className="container-buy-ex">
                <h3>Trải nghiệm mua sắm 5T</h3>
                <div className="container-buy-item">
                    <div className="item-buy">
                        <div className="icon-buy-ex">
                            <GrMoney />
                        </div>
                        <h6>Tốt hơn về giá</h6>

                    </div>
                    <div className="item-buy">
                        <div className="icon-buy-ex">
                            <SlUser />
                        </div>
                        <h6>Thành viên</h6>
                        <p className="des-icon-buy-ex">Ưu đãi riêng tới 5%</p>
                    </div>
                    <div className="item-buy">
                        <div className="icon-buy-ex">
                            <RiSwapBoxLine />
                        </div>
                        <h6>Thu cũ đổi mới</h6>
                        <p className="des-icon-buy-ex">Thu cũ giá cao, trợ giá lên đời</p>
                    </div>
                    <div className="item-buy">
                        <div className="icon-buy-ex">
                            <MdOutlinePayments />
                        </div>
                        <h6>Thanh toán - Trả góp</h6>
                        <p className="des-icon-buy-ex">Dễ dàng</p>
                    </div>
                    <div className="item-buy">
                        <div className="icon-buy-ex">
                            <MdOutlineCameraswitch />
                        </div>
                        <h6>Trả máy lỗi</h6>
                        <p className="des-icon-buy-ex">Đổi máy liền</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Buy;