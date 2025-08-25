import "./indexUser.css"
import { IoStar, IoChatboxEllipses, IoHardwareChip } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from "axios";
function PhoneDetail() {
    const datas = {
        id: 1,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: '/image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên",
         dataImage: [
            { idImage: 1, url: "/image/item1.webp", titleItem: "Titan Đen"},
            { idImage: 2, url: "/image/item2.webp", titleItem: "Titan Tự Nhiên"},
            { idImage: 3, url: "/image/item3.webp", titleItem: "Titan Trắng"},
         ],
        versionProductDetail: [
            {idVerson: 1, name:"1TB"},
            {idVerson: 2, name:"512GB"},
            {idVerson: 3, name:"256GB"},
        ]
        }; 
    const indexInit = datas.versionProductDetail[0].idVerson;
    const [indexCurrent, setIndexCurrent] = useState(indexInit);
    const indexColor = datas.dataImage[0].idImage;
    const [selectBoxColor, setSelectBoxColor] = useState(indexColor);

    const [open, setOpen] = useState(false);
        const openBoxSpecification = () =>{
            setOpen(true);
            document.body.style.overflow = "hidden";
        }
        const closeBoxSpecification = () =>{
            setOpen(false);
            document.body.style.overflow = "auto";
        }
    const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
     
  }, [id]);


  const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log(user?.id)
    const cartId = user?.id;
  const addToCart = async () => {
    if (!user) {
        window.location.href = "/login";
        return;
    }
    try {
        await axios.post(`http://localhost:8080/cart/${cartId}/add/${id}`);
        setMessage(true);
        setTimeout(() => {
            setMessage(false); 
        }, 5000);
    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
};
    return(
        
        <>  
        <div className="container-ProductDetail">
        {message && <div className="alert">Thêm sản phẩm thành công</div>}
            <div className="product-detail">
            <div className="container-title">
            <h4>{datas.title}</h4>
            <div>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            </div> 
            </div>
             <div className="label-detail-product">
                 <button><IoChatboxEllipses/>Hỏi đáp</button>  
                 <button
                 onClick={openBoxSpecification}
                 ><IoHardwareChip/>Xem thông số</button> 
             </div>
            <div className="wrapper-product">
                <div className="container-productImage">
                    <img src={datas.dataImage[selectBoxColor -1].url} alt={datas.title}/>
                </div>
                <div className="container-productDetail-right">
                    <div className="content-price-productDetail">
                        <p>Giá sản phẩm</p>
                        <div>
                            <span className="price-detail-product">
                               { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                datas.price)}     
                            </span>
                            <span className="discount-detail-product">
                                { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                datas.discount)}    
                            </span>
                        </div>
                    </div>
                    <div className="container-version-product-detail">
                         Phiên bản
                         <div className="content-version-product-detail">
                            {datas.versionProductDetail.map((data)=>{
                          return(
                            <div key={data.idVerson} className={`box-version-product-detail ${indexCurrent === data.idVerson ? "selectBox" : " "}`}
                            onClick={() =>{
                                setIndexCurrent(data.idVerson)
                            }}
                            >
                                {data.name}
                            </div>  
                          )})}
                         </div>             
                    </div> 
                    <div className="container-version-product-detail">
                          Màu sắc
                         <div className="content-version-product-detail">
                            {datas.dataImage.map((data)=>{
                          return(
                            <div key={data.idImage} className={`box-color-product-detail ${selectBoxColor === data.idImage ? "selectBoxColor" : " "}`}
                            onClick={() =>{
                                setSelectBoxColor(data.idImage);
                            }}
                            >
                                <img src={data.url} alt="" className="img-color-product-item"/>
                                    {data.titleItem}
                                </div>
                          )})}
                        </div>             
                      
                                     
                    </div>  
                </div>
               
            </div>
            <div className="btn-container-product">
            <Link to={`/confirmInformation/${cartId}`}>
                             <div className="btn-buy">Mua ngay</div>
                             </Link> 
                            <div className="btn-addCart"  onClick={ addToCart }>
                                Thêm vào giỏ hàng <FaCartPlus />
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
                   <div className="specification-table-bottom">
                        <div className="table-bottom">
                        <h6>Màn hình</h6>
                            <div className="table-detail">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td className="td-title">Kích thước màn hình</td>
                                    <td>6.9 inches</td>
                                </tr>
                                <tr>
                                    <td>Công nghệ màn hình</td>
                                    <td>Dynamic AMOLED 2X</td>
                                </tr>
                                <tr>
                                    <td>Độ phân giải màn hình</td>
                                    <td>3120 x 1440 pixels (Quad HD+)</td>
                                </tr>
                                <tr>
                                    <td>Tính năng màn hình</td>
                                    <td>120Hz, 2600 nits, Corning® Gorilla® Armor 2</td>
                                </tr>
                                <tr>
                                    <td>Tần số quét</td>
                                    <td>120Hz</td>
                                </tr>
                                </tbody>
                                
                            </table>
                            </div>
                            <h6>Camera sau</h6>
                            <div className="table-detail">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td className="td-title">Camera sau</td>
                                    <td>Camera siêu rộng 50MP, Camera góc rộng 200 MP, Camera Tele (5x) 50MP, Camera Tele (3x) 10MP"</td>
                                </tr>
                                <tr>
                                    <td>Tính năng camera</td>
                                    <td>Chế độ quay phim 10-bit HDR, Quay Log Video, Zoom quang học 100x, Chụp hình Super HDR, Chân dung, Tự động lấy nét, Quay Video đêm</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            <h6>Camera trước</h6>
                            <div className="table-detail">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td className="td-title">Camera trước</td>
                                    <td>12MP</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            <h6>RAM & lưu trữ</h6>
                            <div className="table-detail">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td className="td-title">Dung lượng RAM</td>
                                    <td>12 GB</td>
                                </tr>
                                <tr>
                                    <td className="td-title">Bộ nhớ trong</td>
                                    <td>256 GB</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            <h6>PIN & công nghệ sạc</h6>
                            <div className="table-detail">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td className="td-title">Pin</td>
                                    <td>5000 mAh</td>
                                </tr>
                                <tr>
                                    <td className="td-title">Cổng sạc</td>
                                    <td>USB Type-C</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            <h6>Tính năng khác</h6>
                            <div className="table-detail">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td className="td-title">Hệ điều hành   </td>
                                    <td>Android 17</td>
                                </tr>
                               
                                </tbody>
                            </table>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
            </div>
            <div className="comment">
                Bình luận
            </div>
            
        </div>
        </>
    )
}
export default PhoneDetail;