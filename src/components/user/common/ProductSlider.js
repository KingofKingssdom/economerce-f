import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import Product from "./Product";
function ProductSlider(props) {
    const datas = props.data;

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
            if(pre >= (datas.length -4)* widthBox) {
                return ((datas.length -4)* widthBox);
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
                {datas.map((data)=>{
                return(
                    <div>
                        <Product
                     preLink = {props.links}   
                    id = {data.id}
                    discountInfo = {data.discountInfo}
                    percent = {data.percent}
                    image = {data.image}
                    title = {data.title}
                    price = {data.price}
                    discount = {data.discount}
                    description = {data.description}
                />
                    </div>
                
                )
            })}
            </div>
            <div className="container-button-slider-product">
                <button onClick={changeLeft} className={`btn-left-product ${currentIndex === 0 ? "hidden-btn" : ""}`}>
                       <IoIosArrowBack />
                </button>
                <button onClick={changeRight} className={`btn-right-product ${currentIndex === ((datas.length -4)*widthBox) ? "hidden-btn" : ""} `}>
                   <IoIosArrowForward />
                </button>
            </div>
        </div>
            
        
        </>
    )
}
export default ProductSlider;