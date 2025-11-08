import "../indexUser.css"
import { IoStar, IoChatboxEllipses, IoHardwareChip } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from "axios";
function ProductDetail(props) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const indexInit = props.data.productVariants[0].id;
    const [indexCurrent, setIndexCurrent] = useState(indexInit);
    const indexColor = props.data.productColors[0].id;
    const [selectBoxColor, setSelectBoxColor] = useState(indexColor);

    const [priceChange, setPriceChange] = useState(props.data.productVariants[0].priceDiscount);
    const [priceOrigin, setPriceOrigin] = useState(props.data.productVariants[0].priceOrigin);
    const [open, setOpen] = useState(false);
    const openBoxSpecification = () => {
        setOpen(true);
        document.body.style.overflow = "hidden";
    }
    const closeBoxSpecification = () => {
        setOpen(false);
        document.body.style.overflow = "auto";
    }

    const [message, setMessage] = useState(false);
    const sectionRef = useRef(null);
    const handleScroll = () => {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const user = sessionStorage.getItem("user");

    const addToCart = async () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/cartItem/create?productId=${id}&productVariantId=${indexCurrent}&productColorId=${selectBoxColor}`,
                {},
                { withCredentials: true });
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
            }, 5000);
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    const addToBuy = async () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/cartItem/create?productId=${id}&productVariantId=${indexCurrent}&productColorId=${selectBoxColor}`,
                {},
                { withCredentials: true });
            navigate('/cart');
        } catch (error) {
            console.error("Lỗi khi mua hàng :", error);
        }
    };

    return (
        <>
            <div className="container-ProductDetail">
                {message && <div className="alert">Thêm sản phẩm thành công</div>}
                <div className="product-detail">
                    <div className="container-title">
                        <h4>{props.data.productName}</h4>
                        <div>
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                        </div>
                    </div>
                    <div className="label-detail-product">
                        <button
                            onClick={handleScroll}
                        ><IoChatboxEllipses />Hỏi đáp</button>
                        <button
                            onClick={openBoxSpecification}
                        ><IoHardwareChip />Xem thông số</button>
                    </div>
                    <div className="wrapper-product">
                        <div className="container-productImage">
                            <img src={props.data.productColors[selectBoxColor - 1].urlPhoto} alt={props.data.productName} />
                        </div>
                        <div className="container-productDetail-right">
                            <div className="content-price-productDetail">
                                <p>Giá sản phẩm</p>
                                <div>
                                    <span className="price-detail-product">
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
                                            .format(priceChange)}
                                    </span>
                                    <span className="discount-detail-product">
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
                                            .format(priceOrigin)}
                                    </span>
                                </div>
                            </div>
                            <div className="container-version-product-detail">
                                Phiên bản
                                <div className="content-version-product-detail">
                                    {props.data.productVariants.map((data) => {
                                        return (
                                            <div key={data.id} className={`box-version-product-detail ${indexCurrent === data.id ? "selectBox" : " "}`}
                                                onClick={() => {
                                                    setIndexCurrent(data.id);
                                                    setPriceChange(data.priceDiscount);
                                                    setPriceOrigin(data.priceOrigin);
                                                }}
                                            >
                                                {data.storage}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="container-version-product-detail">
                                Màu sắc
                                <div className="content-version-product-detail">
                                    {props.data.productColors.map((data) => {
                                        return (
                                            <div key={data.id} className={`box-color-product-detail ${selectBoxColor === data.id ? "selectBoxColor" : " "}`}
                                                onClick={() => {
                                                    setSelectBoxColor(data.id);
                                                }}
                                            >
                                                <img src={`${IMAGE_BASE_URL}${data.urlPhoto}`} alt="" className="img-color-product-item" />
                                                {data.titleVariant}
                                            </div>
                                        )
                                    })}
                                </div>


                            </div>
                        </div>

                    </div>
                    <div className="btn-container-product">

                        <div className="btn-buy"
                            onClick={addToBuy}
                        >
                            Mua ngay
                        </div>

                        <div className="btn-addCart" onClick={addToCart}>
                            Thêm vào giỏ hàng <FaCartPlus />
                        </div>
                    </div>
                    <div className={`${open ? "overlay" : ""}`}>
                        <div className={`container-specification ${open ? "specification-show" : ""}`}>
                            <div className="specification-table-top">
                                <h4>THÔNG SỐ KĨ THUẬT</h4>
                                <div className="btn-close-box-specification"
                                    onClick={closeBoxSpecification}
                                >X</div>
                            </div>
                            <div className="specification-table-bottom">
                                <div className="table-bottom">
                                    {props.data.specifications.map((d) => {
                                        return (
                                            <>
                                                <h6>{d.nameSpecification}</h6>
                                                <div className="table-detail">
                                                    {(d.specificationDetails).map((data2) => {
                                                        return (
                                                            <table className="table table-striped">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="td-title">{data2.labelSpecification}</td>
                                                                        <td>{data2.valueSpecification}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        )

                                                    })}
                                                </div>
                                            </>


                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={sectionRef} className="container-comment">
                    Bình luận
                </div>

            </div>
        </>
    )
}
export default ProductDetail;