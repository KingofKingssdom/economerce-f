import { useEffect, useState } from "react";
import "./indexUser.css"
import axios from "axios"
import { Link } from "react-router-dom"
import ProductSlider from "./common/ProductSlider";
function OutStandingProduct() {
    const [productPhone, setProductPhone] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/product/search/category?categoryId=1")
            .then((response) => {
                setProductPhone(response.data.data.content);
            })

    }, []);

    return (
        <>

            <div className="container-outStanding">
                <div className="container-outStanding-header">
                    <div className="title-outStanding">
                    </div>
                    <h3>SẢN PHẨM NỔI BẬT NHẤT</h3>
                </div>


                <div className="content-outStading">
                    <div className="title-box-product">
                        <h2>ĐIỆN THOẠI</h2>
                        <Link to="/phoneProduct"><button>Xem tất cả</button></Link>
                    </div>
                    <ProductSlider
                        data={productPhone}
                        links="/phoneDetail"
                    />
                    {/* <div className="title-box-product">
                    <h2>MÁY TÍNH BẢNG</h2>
                    <Link to="/tabletProduct"><button>Xem tất cả</button></Link>
                    </div>
                <ProductSlider
                    data = {dataTablet}
                    links = "/tabletDetail"
                />
                
               <div className="title-box-product">
                    <h2>TAI NGHE</h2>
                    <Link to="/soundProduct"><button>Xem tất cả</button></Link>
                    </div>
                <ProductSlider
                    data = {dataTablet}
                    links = "/soundDetail"
                />
                
                
               <div className="title-box-product">
                    <h2>LAPTOP</h2>
                    <Link to="/laptopProduct"><button>Xem tất cả</button></Link>
                    </div>
                <ProductSlider
                    data = {dataTablet}
                    links = "/laptopDetail"
                />
               <div className="title-box-product">
                    <h2>ĐỒNG HỒ</h2>
                    <Link to="/watchProduct"><button>Xem tất cả</button></Link>
                    </div>
                <ProductSlider
                    data = {dataTablet}
                    links = "/watchDetail"
                />
               <div className="title-box-product">
                    <h2>MÀN HÌNH</h2>
                    <Link to="/screenProduct"><button>Xem tất cả</button></Link>
                    </div>
                <ProductSlider
                    data = {dataTablet}
                    links = "/sceenDetail"
                />

                
               <div className="title-box-product">
                    <h2>TIVI</h2>
                    <Link to="/tiviProduct"><button>Xem tất cả</button></Link>
                    </div>
                <ProductSlider
                    data = {dataTablet}
                    links = "/tiviDetail"
                /> */}
                </div>
            </div>


        </>
    )
}
export default OutStandingProduct;