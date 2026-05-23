import "../../../styles/index.css";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getProductFeatured } from "../../../services/ApiProduct";
import ProductSlider from "../common/ProductSlider";
function OutStandingProduct() {
    const [productPhone, setProductPhone] = useState([]);
    const [productTablet, setProductTablet] = useState([]);
    const [productLaptop, setProductLaptop] = useState([]);
    const [productSound, setProductSound] = useState([]);
    const [productWatch, setProductWatch] = useState([]);
    const [productScreen, setProductScreen] = useState([]);
    const [productTivi, setProductTivi] = useState([]);
    const categoryPhone = 1;
    const categoryTablet = 2;
    const categoryLaptop = 3;
    const categorySound = 4;
    const categoryWatch = 5;
    const categoryScreen = 6;
    const categoryTivi = 7;

    useEffect(() => {
        getProductFeatured(categoryPhone).then(
            (response) => {
                setProductPhone(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductFeatured(categoryTablet).then(
            (response) => {
                setProductTablet(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductFeatured(categoryLaptop).then(
            (response) => {
                setProductLaptop(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductFeatured(categorySound).then(
            (response) => {
                setProductSound(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductFeatured(categoryWatch).then(
            (response) => {
                setProductWatch(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductFeatured(categoryScreen).then(
            (response) => {
                setProductScreen(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductFeatured(categoryTivi).then(
            (response) => {
                setProductTivi(response.data);
            }
        )

    }, [])
    // useEffect(() => {
    //     getProductPromotional(categoryTablet).then(
    //         (response) => {
    //             setProductTablet(response.data.result);
    //         }
    //     )

    // }, [])
    return (
        <>
            <div className="container-outStanding">
                <div className="content-outStading">
                    <div className="container-outStanding-header">
                        <h3>SẢN PHẨM NỔI BẬT NHẤT</h3>
                    </div>
                    <div className="container-phone">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>ĐIỆN THOẠI</h2>
                                <p>Khám phá những dòng điện thoại mới nhất</p>
                            </div>
                            <Link to="/phoneProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-phone-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/BannerPhoneNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productPhone}
                                    links="/phoneDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Tablet</h2>
                                <p>Giá trị và làm việc không giới hạn</p>
                            </div>
                            <Link to="/tabletProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/bannerTabletNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productTablet}
                                    links="/tabletDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Laptop</h2>
                                <p>Đơn giản để làm nhiều hơn</p>
                            </div>
                            <Link to="/laptopProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/bannerLaptopNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productLaptop}
                                    links="/laptopDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Tai nghe</h2>
                                <p>Âm thanh sống động</p>
                            </div>
                            <Link to="/soundProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/bannerTaiNgheNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productSound}
                                    links="/soundDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Đồng hồ</h2>
                                <p>Thay đổi cuộc sống mỗi ngày</p>
                            </div>
                            <Link to="/watchProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/bannerDongHoNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productWatch}
                                    links="/watchDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Màn hình</h2>
                                <p>Góc nhìn màn hình siêu đỉnh</p>
                            </div>
                            <Link to="/screenProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/bannerManHinhNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productScreen}
                                    links="/screenDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Tivi</h2>
                                <p>Vươn xa tầm nhìn</p>
                            </div>
                            <Link to="/tiviProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/bannerTiviNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productTivi}
                                    links="/tiviDetail"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OutStandingProduct;