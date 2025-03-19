import "./indexUser.css";
import {useState, useEffect} from 'react';
import { IoIosPhonePortrait, IoIosArrowForward } from "react-icons/io";
import { FaTabletAlt, FaLaptop  } from "react-icons/fa";
import { TbDeviceAirpods } from "react-icons/tb";
import { IoWatch } from "react-icons/io5";
import { MdScreenshotMonitor } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
function Category() {
    
    const imgs = ["./image/banner1.webp", "./image/banner2.webp", "./image/banner3.webp","./image/banner4.webp"];
    const rigthBanner = ["./image/right-banner1.webp", "./image/right-banner2.webp", "./image/right-banner3.webp"]
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgs.length);
      }, 4000);
      return () => clearInterval(interval);
    }, [imgs.length]);
    return(
    <>
    <div className="container-category">
        <div className="category">
          <Link to="/phoneProduct" className="item-category">
            <IoIosPhonePortrait className="icon-item-category"/>
            <li className="item-li">Điện thoại</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
          <Link to="/tabletProduct" className="item-category">
              <FaTabletAlt className="icon-item-category"/>
            <li className="item-li">Tablet</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
          <Link to="/laptopProduct" className="item-category">
            <FaLaptop className="icon-item-category"/>
            <li className="item-li">Laptop</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
          <Link to="/soundProduct" className="item-category">
            <TbDeviceAirpods className="icon-item-category"/>
            <li className="item-li">Âm thanh</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
          <Link to="/watchProduct" className="item-category">
            <IoWatch  className="icon-item-category"/>
            <li className="item-li">Đồng hồ</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
          <Link to="/screenProduct" className="item-category" >
            <HiMiniComputerDesktop className="icon-item-category"/>
            <li className="item-li">Màn hình</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
          <Link  to="/tiviProduct" className="item-category">
            <MdScreenshotMonitor className="icon-item-category"/>
            <li className="item-li">Tivi</li>
            <IoIosArrowForward className="icon-item-category"/>
          </Link>
        </div>
        
        <div className="slider-category">
      {/* Tính toán offset dựa trên currentIndex */}
      <div
        className="banner-category"
        style={{
          transform: `translateX(${-currentIndex * 100}%)`,
        }}
      >
        {imgs.map((img, index) => (
          <img key={index} src={img} alt={`banner-${index}`} />
        ))}
      </div>
    </div>
    <div className="block-right-banner">
      {rigthBanner.map((rigth, index)=>{
        return (
          <div className="right-banner" key={index}>
          <img src={rigth} alt={rigth}/>
        </div>
        )
      })}  
    </div>
    </div>
    </>
 )   
}
export default Category;