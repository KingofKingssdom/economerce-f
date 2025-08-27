import ProductSlider from "./common/ProductSlider";

function HotSaleProduct () {
    const dataProduct = [
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
        {id: 4,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: './image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên"   
        }
    ]
    return (
        <>
           <div className="container-hotSale">
                <div className="header-hotSale">
                   <p>BẢNG TIN KHUYẾN MÃI</p> 
                </div>
                <div className="top-sale">
                </div>
                <div className="content-hotSale">
                    <div className="time-container-hotSale">
                        <div className="timer-left">
                            Từ 
                            <span className="day-sale">20 / 08</span>  
                            Đến 
                            <span className="day-sale">22 / 08</span>
                        </div>
                          <div className="timer-right">
                            Kết thúc sau <span className="day-sale">10 : 10 : 59</span>
                        </div>  
                    </div>
                    <ProductSlider
                        links = 'hotSale'
                        data = {dataProduct}
                    />
                </div>
                 
           </div>
          
        </>
    )
}
export default HotSaleProduct;