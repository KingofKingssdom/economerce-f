import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import Product from "./Props/Product";
function BoxProduct({data = []}) {
  
    // const dataProduct = [
    //     {id: 1,
    //      discountInfo : 'Giảm 10%',
    //      percent: 'Trả góp 0%',
    //      image: './image/phoneIphone13.webp',
    //      title: 'Iphone 13 promax',
    //      price: 25000000,
    //      discount: 30000000,
    //      description: "Đang khuyến mãi dành cho giáo viên"   
    //     },
    //      {id: 2,
    //      discountInfo : 'Giảm 12%',
    //      percent: 'Trả góp 0%',
    //      image: './image/phoneIphone16e128GB.webp',
    //      title: 'Iphone 13 promax',
    //      price: 25000000,
    //      discount: 30000000,
    //      description: "Đang khuyến mãi dành cho giáo viên"   
    //     },
    //      {id: 3,
    //      discountInfo : 'Giảm 15%',
    //      percent: 'Trả góp 0%',
    //      image: './image/phoneIphone16Promax.webp',
    //      title: 'Iphone 13 promax',
    //      price: 25000000,
    //      discount: 30000000,
    //      description: "Đang khuyến mãi dành cho giáo viên"   
    //     },
    //      {id: 4,
    //      discountInfo : 'Giảm 10%',
    //      percent: 'Trả góp 0%',
    //      image: './image/phoneIphone13.webp',
    //      title: 'Iphone 13 promax',
    //      price: 25000000,
    //      discount: 30000000,
    //      description: "Đang khuyến mãi dành cho giáo viên"   
    //     },
    //     {id: 4,
    //      discountInfo : 'Giảm 10%',
    //      percent: 'Trả góp 0%',
    //      image: './image/phoneIphone13.webp',
    //      title: 'Iphone 13 promax',
    //      price: 25000000,
    //      discount: 30000000,
    //      description: "Đang khuyến mãi dành cho giáo viên"   
    //     }
    // ]
    const [currentIndex, setCurrentIndex] = useState(0);
    let widthBox = 266;
    const changeLeft = () =>{
        setCurrentIndex(pre => {
            if(pre === 0) {
                return 0
            }
            else{
              return  pre - widthBox;
            }
        })
    }
    
    const changeRight = () =>{
        setCurrentIndex(pre => {
            if(pre >= (data.length -4)* widthBox) {
                return ((data.length -4)* widthBox);
            }
            else{
              return  pre + widthBox;
            }
        })
    }
    
    return(
        <>
        <div className="container-box">
            <div className="slider-box-product" style={{transform: `translateX(${- currentIndex}px)`, transition: "ease 0.7s"}}>
                {data.map((array)=>{
                return(
                    <div>
                        <Product
                    discountInfo = {array.discountInfo}
                    percent = {array.percent}
                    image = {array.image}
                    title = {array.title}
                    price = {array.price}
                    discount = {array.discount}
                    description = {array.description}
                />
                    </div>
                
                )
            })}
            </div>
            <div className="container-button-slider-product">
                <button onClick={changeLeft} className={`btn-left-product ${currentIndex === 0 ? "hidden-btn" : ""}`}>
                       <IoIosArrowBack />
                </button>
                <button onClick={changeRight} className={`btn-right-product ${currentIndex === ((data.length -4)*widthBox) ? "hidden-btn" : ""} `}>
                   <IoIosArrowForward />
                </button>
            </div>
        </div>
            
        
        </>
    )
}
export default BoxProduct;