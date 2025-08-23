import { useState } from "react"
import "./indexProps.css"
function Product(props) {
   const [change, setChange] = useState(false)
   const toggle = () =>{
    setChange(pre => !pre)
   }
    return(
        <>
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
                    {/* data:image/webp;base64, */}
                    <img src={`${props.image}`} alt="Ảnh sản phẩm"/> 
                </div>
                <div className="product-title">
                    <p>{props.title} </p>
                </div>
                <div className="product-price">
                    <p>{props.price}</p> 
                    <p className="discount-price">{props.discount}</p>
                </div>
                <div className="product-description">
                    <p>{props.description}</p>
                </div>
        </div>
        </>
    )
}
export default Product