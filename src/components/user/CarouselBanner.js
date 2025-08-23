import {useEffect, useRef, useState} from "react"
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import "./indexUser.css"
function Banner () {
    const arrays = [
        {
            id: 1,
            image: "./image/Banner1.webp",
            description: "Banner1"
        }, 
        {
            id: 2,
            image: "./image/Banner2.png",
            description: "Banner2"       
        }, 
        {
            id: 3,
            image: "./image/Banner3.png",
            description: "Banner3"      
        }, 
        {
            id: 4,
            image: "./image/Banner4.png",
            description: "Banner4"      
        }];

        const [currentIndex, setCurrentIndex] = useState(0);
        const widthBox = 1020;
        const timer = useRef();
        function autoSlider(){
         timer.current = setInterval(()=>{
            setCurrentIndex((pre)=> {
                if(pre >= (arrays.length -1)* widthBox) {
                    return 0;
                }
                else {
                   return pre + widthBox
                }
            }
                 );
          },3000)
        }
        useEffect(()=>{ 
            autoSlider();
            return () => clearInterval(timer.current)
        },[])

        const changeLeft = () => {
           setCurrentIndex((pre)=>{
                if(pre === 0) {
                    return 0
                }
                else {
                    return pre - widthBox;
                }
           })
           resetInterval()
        }

        const changeRight = () =>{
            setCurrentIndex((pre)=>{
                if(pre >= (arrays.length -1)*widthBox){
                    return (arrays.length -1)*widthBox;
                }
                else{
                   return pre + widthBox;
                }
            })
            resetInterval();
        }

        const resetInterval = () =>{
            clearInterval(timer.current);
            autoSlider()
        }
    return(
        <>
            <div className="container-slider">
                <div className="slider" style={{transform: `translateX(${- currentIndex}px)`, transition: "ease 1s"}}>
                    {arrays.map((array) => {
                        return (
                        <img key={array.id} 
                        src = {array.image}
                        alt= {array.description}
                        />
                        )
                        
                    })}
                </div>
            </div>
            <div className="btn-container">
                <button className="btn-left"
                onClick={changeLeft}
                >
                    <IoIosArrowBack />
                </button>
                <button className="btn-right"
                    onClick={changeRight}
                    >
                    <IoIosArrowForward />
                </button>
            </div>
            <div className="container-indicator">
                {arrays.map((array, index)=>{
                    return (
                        <div key={index} className={`indicator ${((index * widthBox) === currentIndex) ? "show-indicator": ""}`}
                        onClick={()=>{
                            console.log(index)
                            resetInterval()
                            setCurrentIndex(index * widthBox)
                        }}
                        ></div>
                    )
                })}
            </div>
        </>
        
    )
}

export default Banner;