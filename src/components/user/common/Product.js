import { useState } from "react"
import "../indexUser.css"
import { Link } from "react-router-dom"


function Product(props) {
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const [change, setChange] = useState(false);
    const toggle = () => {
        setChange(pre => !pre)
    }
    return (
        <>
            <Link to={`${props.preLink}/${props.id}`}>
                <div className="container-product-item"
                    onMouseEnter={toggle}
                    onMouseLeave={toggle}
                >
                    <div className="info">
                        <div>
                            <div className="triangle-up-discount"></div>
                            <p className="info-discount">{props.discountInfo}</p>
                        </div>

                        <p className="info-percent">{props.percent}</p>
                    </div>
                    <div className={`image-product ${change ? "scale-image" : ""}`}>
                        <img src={`${IMAGE_BASE_URL}${props.image}`} alt="Ảnh sản phẩm" />
                    </div>
                    <div className="product-title">
                        <p>{props.title}</p>
                    </div>
                    <div className="product-price">
                        <p>
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                props.price)}</p>
                        <p
                            className="discount-price">
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                props.discount)}
                        </p>
                    </div>
                    <div className="product-description">
                        <p>{props.description}</p>
                    </div>
                </div>
            </Link>

        </>
    )
}
export default Product