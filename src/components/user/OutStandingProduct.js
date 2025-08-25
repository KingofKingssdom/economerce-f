import { useEffect, useState } from "react";
import "./indexUser.css"
import Product from "./Props/Product";
import axios from "axios"
import {Link} from "react-router-dom"
import BoxProduct from "./BoxProduct";
function OutStandingProduct() {
    const dataPhone = [
        {id: 1,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
         {id: 2,
         discountInfo : 'Giảm 12%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone16e128GB.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
         {id: 3,
         discountInfo : 'Giảm 15%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone16Promax.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
         {id: 4,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
        {id: 5,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        }
    ];

     const dataTablet = [
        {id: 1,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/ipadAir6M2.webp',
         title: 'Tablet Air6M2 Hàng chĩnh ahngx apple',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
         {id: 2,
         discountInfo : 'Giảm 12%',
         percent: 'Trả góp 0%',
         image: './image/ipadAir7.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
         {id: 3,
         discountInfo : 'Giảm 15%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone16Promax.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
         {id: 4,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        },
        {id: 5,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        }
    ];


    // const [phones, setPhones] = useState([]);
    // useEffect(()=>{
    //     const fetchPhone = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=1");
    //             setPhones(response.data)
    //         }
    //         catch(error){
    //         console.error("Lỗi gọi api sản phẩm theo danh mục điện thoại", error);
    //     }
    // }
    //     fetchPhone();
    // },[])

    // const [tablets, setTablets] = useState([]);
    //  useEffect(()=>{
    //     const fetchTablet = async () =>{
    //         try{
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=2");
    //             setTablets(response.data);
    //         }
    //         catch(error){
    //             console.error("Lỗi gọi api sản phẩm theo danh mục tablet" ,error);
    //         }
    //     }
    //     fetchTablet();
    //  },[])

    //  const [laptops, setLaptops] = useState([]);
    //  useEffect(()=> {
    //     const fetchLaptop = async () =>{
    //         try{
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=3");
    //             setLaptops(response.data); 
    //         }
    //         catch(error){
    //             console.error("Lỗi gọi api sản phẩm theo danh mục laptop", error);
    //         }
    //     }
    //     fetchLaptop();
    //  },[])

    //  const [sounds, setSounds] = useState([]);
    //  useEffect(()=>{
    //     const fetchSound = async () =>{
    //         try{
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=4");
    //             setSounds(response.data); 
    //         }
    //         catch(error){
    //             console.error("Lỗi gọi api sản phẩm theo danh mục âm thanh", error);
    //         }
    //     }
    //     fetchSound();
    //  },[])

    //  const [watchs, setWatchs] = useState([]);
    //  useEffect(()=>{
    //     const fetchWatch = async () =>{
    //         try{
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=5");
    //             setWatchs(response.data); 
    //         }
    //         catch(error){
    //             console.error("Lỗi gọi api sản phẩm theo danh mục đồng hồ", error);
    //         }
    //     }
    //     fetchWatch();
    //  },[])

    //  const [screens, setScreens] = useState([]);
    //  useEffect(()=>{
    //     const fetchScreen = async () =>{
    //         try{
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=6");
    //             setScreens(response.data); 
    //         }
    //         catch(error){
    //             console.error("Lỗi gọi api gọi sản phẩm theo danh mục màn hình", error);
    //         }
    //     }
    //     fetchScreen();
    //  },[])

    //  const [tivis, setTivis] = useState([]);
    //  useEffect(()=>{
    //     const fetchTivi = async () =>{
    //         try{
    //             const response = await axios.get("http://localhost:8080/product/category?categoryId=7");
    //             setTivis(response.data); 
    //         }
    //         catch(error){
    //             console.error("Lỗi gọi api sản phẩm theo danh mục Tivi", error);
    //         }
    //     }
    //     fetchTivi();
    //  },[])
    return(
        <>
            <div className="container-outStanding">
                <div className="title-outStanding">
                </div>
                <h3>SẢN PHẨM NỔI BẬT NHẤT</h3>
                <div className="content-outStading">
                    <div className="title-box-product">
                    <h2>ĐIỆN THOẠI</h2>
                    <Link to="/phoneProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataPhone}
                    links = "/phoneDetail"
                />
                <div className="title-box-product">
                    <h2>MÁY TÍNH BẢNG</h2>
                    <Link to="/tabletProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataTablet}
                    links = "/tabletDetail"
                />
                
               <div className="title-box-product">
                    <h2>TAI NGHE</h2>
                    <Link to="/soundProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataTablet}
                    links = "/soundDetail"
                />
                
                
               <div className="title-box-product">
                    <h2>LAPTOP</h2>
                    <Link to="/laptopProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataTablet}
                    links = "/laptopDetail"
                />
               <div className="title-box-product">
                    <h2>ĐỒNG HỒ</h2>
                    <Link to="/watchProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataTablet}
                    links = "/watchDetail"
                />
               <div className="title-box-product">
                    <h2>MÀN HÌNH</h2>
                    <Link to="/screenProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataTablet}
                    links = "/sceenDetail"
                />

                
               <div className="title-box-product">
                    <h2>TIVI</h2>
                    <Link to="/tiviProduct"><button>Xem tất cả</button></Link>
                    </div>
                <BoxProduct
                    data = {dataTablet}
                    links = "/tiviDetail"
                />
            </div>
        </div>

            
        </>
    )
}
export default OutStandingProduct;