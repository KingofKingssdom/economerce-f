import "../../../styles/index.css"

import { IoStar, IoChatboxEllipses, IoHardwareChip } from "react-icons/io5";
import { FaCartPlus, FaTruck } from "react-icons/fa";
import { BsFillCheckCircleFill, BsXCircleFill, BsCalendar2CheckFill, BsShieldFillCheck } from "react-icons/bs";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { postAddToCart } from "../../../services/ApiCart";
import { getUserCurrent } from "../../../services/ApiAuth";
function ProductDetail(props) {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const variants = props.data.productVariants;
    const uniqueStorages = [...new Set(variants.map(v => v.storage))];
    const [selectedStorage, setSelectedStorage] = useState(uniqueStorages[0]);
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const indexInit = props.data.productVariants[0].id;
    const [indexCurrent, setIndexCurrent] = useState(indexInit);
    const [selectBoxColor, setSelectBoxColor] = useState(0);
    const idProductColor = props.data.productVariants[selectBoxColor].id;
    const [priceChange, setPriceChange] = useState(props.data.productVariants[0].currentPrice);
    const [priceOrigin, setPriceOrigin] = useState(props.data.productVariants[0].originPrice);

    useEffect(() => {
        getUserCurrent().then((response) => {
            setUser(response);
        })
    }, [])
    useEffect(() => {
        const match = variants.find(v => v.storage === selectedStorage);
        if (match) setSelectedVariant(match);
    }, [selectedStorage, variants]);
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
    const addToCart = async () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        try {
            await postAddToCart(Number(user.cartId), selectedVariant.id, 1)
            // setMessage(true);
            // setTimeout(() => {
            //     setMessage(false);
            // }, 5000);
            alert("Sản phẩm đã thêm vào giỏ hàng")
        } catch (error) {
            alert("Lỗi thêm sản phẩm vào giỏ hàng")
            console.error("Lỗi khi thêm vào giỏ hàng: " + error);
        }
    };

    const addToBuy = async () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        try {
            await postAddToCart(Number(user.cartId), selectedVariant.id, 1)
            navigate('/cart');
        } catch (error) {
            console.error("Lỗi khi mua hàng :", error);
        }
    };

    return (

        <>
            <div className="container-ProductDetail">
                {/* {message && <div className="alert">Thêm sản phẩm thành công</div>} */}
                <div className="product-detail">
                    <div className="container-title">
                        <h4>{props.data.productName}</h4>
                        <div className="container-icon-product-detail">
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <IoStar className="icon-product-detail" />
                            <p> (245 đánh giá)</p>
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
                            <img src={`${IMAGE_BASE_URL}${selectedVariant?.urlProductColor}`} alt={props.data.productName} />
                        </div>
                        <div className="container-productDetail-right">
                            <div className="content-price-productDetail">
                                <div className="content-price-left">
                                    <p>Giá sản phẩm</p>
                                    <div>
                                        <span className="price-detail-product">
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
                                                .format(selectedVariant?.currentPrice)}
                                        </span>
                                        <span className="discount-detail-product">
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
                                                .format(selectedVariant?.originPrice)}
                                        </span>
                                    </div>
                                </div>

                                <div className="content-price-right">
                                    {selectedVariant?.stock > 0 ? (
                                        <span className="in-stock">
                                            <BsFillCheckCircleFill className="icon-stick" /> Còn hàng
                                        </span>
                                    ) : (
                                        <span className="out-stock">
                                            <BsXCircleFill className="icon-x" /> Hết hàng
                                        </span>
                                    )}


                                    <p>Giá sản phẩm đã bao gồm VAT</p>
                                </div>
                            </div>
                            <div className="container-version-product-detail">
                                Phiên bản
                                <div className="content-version-product-detail">

                                    {uniqueStorages.map((storage) => (
                                        <div
                                            key={storage}
                                            className={`box-version-product-detail ${selectedStorage === storage ? "selectBox" : ""}`}
                                            onClick={() => setSelectedStorage(storage)}
                                        >
                                            {storage}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="container-version-product-detail">
                                Màu sắc
                                <div className="content-version-product-detail">
                                    {variants
                                        .filter(v => v.storage === selectedStorage) // Chỉ lấy màu của dung lượng đang chọn
                                        .map((v) => (
                                            <div
                                                key={v.id}
                                                className={`box-color-product-detail ${selectedVariant?.id === v.id ? "selectBoxColor" : ""}`}
                                                onClick={() => setSelectedVariant(v)}
                                            >
                                                <img src={`${IMAGE_BASE_URL}${v.urlProductColor}`} alt="" className="img-color-product-item" />
                                                {v.colorName}
                                            </div>
                                        ))
                                    }
                                </div>


                            </div>
                            <div className="container-description-product-detail">
                                <div className="contaner-des-pro">
                                    <BsCalendar2CheckFill className="icon-des" /><h6>Khuyến mãi ưu đãi</h6>
                                </div>

                                <p>{props.data.description}</p>
                            </div>
                            <div className="btn-container-product">

                                <div className="btn-buy"
                                    onClick={addToBuy}
                                >
                                    MUA NGAY
                                    <p>Giao hàng tận nơi hoặc nhận tại cửa hàng</p>
                                </div>

                                <div className="btn-addCart" onClick={addToCart}>
                                    <FaCartPlus />
                                    <p>THÊM VÀO GIỎ</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container-tb-product-detail">
                        <div className="box-item-tb-protduct">
                            <div className="b-icon-bh b-icon">
                                <BsShieldFillCheck className="icon-bh bh-icon" />
                            </div>

                            <div className="txt-tb-product">
                                <h6>Bảo hành chính hãng</h6>
                                <p>12 tháng tại trung tâm</p>
                            </div>

                        </div>
                        <div className="box-item-tb-protduct">
                            <div className="b-icon-bh b-gh-icon">
                                <FaTruck className="icon-bh gh-icon" />
                            </div>

                            <div className="txt-tb-product">
                                <h6>Giao hành miễn phí</h6>
                                <p>Giao hàng nhanh trong 2h nội thành</p>
                            </div>

                        </div>
                        <div className="box-item-tb-protduct">
                            <div className="b-icon-bh b-sw-icon">
                                <MdOutlineSwapHoriz className="icon-bh sw-icon" />
                            </div>

                            <div className="txt-tb-product">
                                <h6>1 đổi 1 trong 30 ngày</h6>
                                <p>Nếu có lỗi từ nhà sản xuất</p>
                            </div>

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
                            {/* <div className="specification-table-bottom">
                                <div className="specification-table-bottom">
                                    <div className="table-bottom">
                                        {props.data.resProductSpecification.map((spec) => (
                                            <div key={spec.id}>
                                                <h6>{spec.nameSpecification}</h6>

                                                <div className="table-detail">
                                                    {spec.specificationDetails
                                                        .filter(
                                                            (detail) => detail.productId === props.data.id
                                                        )
                                                        .map((detail, index) => (
                                                            <table className="table table-striped" key={index}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="td-title">
                                                                            {detail.labelSpecification}
                                                                        </td>
                                                                        <td>{detail.valueSpecification}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> */}
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