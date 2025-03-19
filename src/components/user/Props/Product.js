import "./indexProps.css"
import { IoIosStar } from "react-icons/io";
function Product(props) {
    return(
        <>
        <div className="container-product-item">
                <div className="info">
                    <p className="info-discount">{props.discountInfo}</p>
                    <p className="info-percent">{props.percent}</p>
                </div>
                <div className="image-product">
                    <img src={`data:image/webp;base64,${props.image}`} alt="Ảnh sản phẩm"/>
                </div>
                <div className="product-title">
                    <p>{props.title} </p>
                </div>
                {/* <div className="product-status">
                    <p>{props.status}</p>
                </div> */}
                <div className="product-price">
                    <p>{props.price}</p> 
                    <p className="discount-price">{props.discount}</p>
                </div>
                <div className="product-description">
                    <p>{props.description}</p>
                </div>
                <div className="product-icon">
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                </div>
        </div>
        </>
    )
}
export default Product