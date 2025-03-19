import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./indexUser.css"
function VnPayResult() {
    const location = useLocation();
    const navigate = useNavigate();

    const [paymentStatus, setPaymentStatus] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setPaymentStatus(queryParams.get("paymentStatus") || "Failed");
    }, [location.search]);

    return (
        <div className="vnpay-result-container">
            <div className={`result-box ${paymentStatus === "Success" ? "success" : "failed"}`}>
                <h2>{paymentStatus === "Success" ? " Thanh toán thành công!" : " Thanh toán thành công"}</h2>
                <button className="btn btn-danger" onClick={() => navigate("/")}>Quay về trang chủ</button>
            </div>
        </div>
    );
}

export default VnPayResult;
