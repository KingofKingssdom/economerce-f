
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./indexUser.css"
function PayResult() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const id = sessionStorage.getItem("orderId");

    const handlePayDone = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/order/update/payment?orderId=${id}&paymentMethod=VNPAY&paymentStatus=PAID`,
                {},
                {
                    withCredentials: true
                });
            sessionStorage.removeItem("orderId");
            navigate("/")
        } catch (error) {
            console.error("Lỗi khi xác nhận:", error);
        }
    }

    return (
        <div className="pay-result-container">
            Bấm xác nhận để hoàn tất thanh toán
            <div className="btn-done-pay"
                onClick={handlePayDone}>Xác nhận</div>

        </div>
    );
}

export default PayResult;
