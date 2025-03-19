import { useEffect, useState } from "react";
import "./indexUser.css"
import Product from "./Props/Product";
import axios from "axios"
import {Link} from "react-router-dom"
function OutStandingProduct() {
    const [phones, setPhones] = useState([]);
    useEffect(()=>{
        const fetchPhone = async () => {
            try {
                const response = await axios.get("http://localhost:8080/product/category?categoryId=1");
                setPhones(response.data)
            }
            catch(error){
            console.error("Lỗi gọi api sản phẩm theo danh mục điện thoại", error);
        }
    }
        fetchPhone();
    },[])
    const [tablets, setTablets] = useState([]);
     useEffect(()=>{
        const fetchTablet = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=2");
                setTablets(response.data);
            }
            catch(error){
                console.error("Lỗi gọi api sản phẩm theo danh mục tablet" ,error);
            }
        }
        fetchTablet();
     },[])

     const [laptops, setLaptops] = useState([]);
     useEffect(()=> {
        const fetchLaptop = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=3");
                setLaptops(response.data); 
            }
            catch(error){
                console.error("Lỗi gọi api sản phẩm theo danh mục laptop", error);
            }
        }
        fetchLaptop();
     },[])

     const [sounds, setSounds] = useState([]);
     useEffect(()=>{
        const fetchSound = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=4");
                setSounds(response.data); 
            }
            catch(error){
                console.error("Lỗi gọi api sản phẩm theo danh mục âm thanh", error);
            }
        }
        fetchSound();
     },[])

     const [watchs, setWatchs] = useState([]);
     useEffect(()=>{
        const fetchWatch = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=5");
                setWatchs(response.data); 
            }
            catch(error){
                console.error("Lỗi gọi api sản phẩm theo danh mục đồng hồ", error);
            }
        }
        fetchWatch();
     },[])

     const [screens, setScreens] = useState([]);
     useEffect(()=>{
        const fetchScreen = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=6");
                setScreens(response.data); 
            }
            catch(error){
                console.error("Lỗi gọi api gọi sản phẩm theo danh mục màn hình", error);
            }
        }
        fetchScreen();
     },[])

     const [tivis, setTivis] = useState([]);
     useEffect(()=>{
        const fetchTivi = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=7");
                setTivis(response.data); 
            }
            catch(error){
                console.error("Lỗi gọi api sản phẩm theo danh mục Tivi", error);
            }
        }
        fetchTivi();
     },[])
    return(
        <>
            <div className="container-outStanding">
                <h2>ĐIỆN THOẠI</h2>
                <div className="item-product">
                    {phones.slice(0,4).map(
                    (phone)=>{
                        return (
                            <div className="box" key={phone.id}>
                            <Link to={`/phoneDetail/${phone.id}`}>
                            <Product 
                            discountInfo = {phone.discountPercent}
                            percent = {phone.installment}
                            image= {phone.productImage}
                            title ={phone.productName}
                            price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                phone.priceCurrent)}
                            discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(phone.pricePrevious)}
                            description={phone.description}
                            />
                            </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>

                <h2>MÁY TÍNH BẢNG</h2>
                <div className="item-product">
                    {tablets.slice(0,4).map(
                    (tablet)=>{
                        return (
                            <div className="box" key={tablet.id}>
                            <Link to ={`/tabletDetail/${tablet.id}`}>
                                <Product 
                            discountInfo = {tablet.discountPercent}
                            percent = {tablet.installment}
                            image= {tablet.productImage}
                            title ={tablet.productName}
                            price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                tablet.priceCurrent)}
                            discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(tablet.pricePrevious)}
                            description={tablet.description}
                            />
                                </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>

                <h2>TAI NGHE</h2>
                <div className="item-product">
                    {sounds.slice(0,4).map(
                    (sound)=>{
                        return (   
                            <div className="box" key={sound.id}>
                            <Link to={`/soundDetail/${sound.id}`}>
                                <Product 
                            discountInfo = {sound.discountPercent}
                            percent = {sound.installment}
                            image= {sound.productImage}
                            title ={sound.productName}
                            price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                sound.priceCurrent)}
                            discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(sound.pricePrevious)}
                            description={sound.description}
                            
                            />
                                </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>

                <h2>LAPTOP</h2>
                <div className="item-product">
                    {laptops.slice(0,4).map(
                    (laptop)=>{
                        return (
                            <div className="box" key={laptop.id}>
                            <Link to={`/laptopDetail/${laptop.id}`}>
                                <Product 
                            discountInfo = {laptop.discountPercent}
                            percent = {laptop.installment}
                            image= {laptop.productImage}
                            title ={laptop.productName}
                            price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                laptop.priceCurrent)}
                            discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(laptop.pricePrevious)}
                            description={laptop.description}
                            
                            />
                                </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>

                <h2>ĐỒNG HỒ</h2>
                <div className="item-product">
                    {watchs.slice(0,4).map(
                    (watch)=>{
                        return (
                            <div className="box"  key={watch.id}>
                            <Link to={`/watchDetail/${watch.id}`}>
                                <Product 
                           discountInfo = {watch.discountPercent}
                           percent = {watch.installment}
                           image= {watch.productImage}
                           title ={watch.productName}
                           price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                               watch.priceCurrent)}
                           discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(watch.pricePrevious)}
                           description={watch.description}
                            />
                                </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>

                <h2>MÀN HÌNH</h2>
                <div className="item-product">
                    {screens.slice(0,4).map(
                    (screen)=>{
                        return (
                            <div className="box"  key={screen.id}>
                            <Link to ={`/screenDetail/${screen.id}`}>
                                <Product 
                             discountInfo = {screen.discountPercent}
                             percent = {screen.installment}
                             image= {screen.productImage}
                             title ={screen.productName}
                             price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                 screen.priceCurrent)}
                             discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(screen.pricePrevious)}
                             description={screen.description}
                            />
                                </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>

                <h2>TIVI</h2>
                <div className="item-product">
                    {tivis.slice(0,4).map(
                    (tivi)=>{
                        return (
                            <div className="box" key={tivi.id}>
                            <Link to = {`/tvDetail/${tivi.id}`}>
                                <Product 
                             discountInfo = {tivi.discountPercent}
                             percent = {tivi.installment}
                             image= {tivi.productImage}
                             title ={tivi.productName}
                             price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                 tivi.priceCurrent)}
                             discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(tivi.pricePrevious)}
                             description={tivi.description}
                            />
                                </Link>
                            </div>
                            )
                        
                        }
                    )}
                </div>
            </div>

            
        </>
    )
}
export default OutStandingProduct;