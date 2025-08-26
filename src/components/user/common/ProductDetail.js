import "../indexUser.css"
import { IoStar, IoChatboxEllipses, IoHardwareChip } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef} from 'react';
import axios from "axios";
function ProductDetail (props) {
    const indexInit = props.data.versionProductDetail[0].idVerson;
    const [indexCurrent, setIndexCurrent] = useState(indexInit);
    const indexColor = props.data.dataImage[0].idImage;
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

    const [message, setMessage] = useState(false);
    const sectionRef = useRef(null);
    const handleScroll = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    };

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

  
    const { id } = useParams();
  const [product, setProduct] = useState([]);

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
    return (
        <>
             <div className="container-ProductDetail">
        {message && <div className="alert">Thêm sản phẩm thành công</div>}
            <div className="product-detail">
            <div className="container-title">
            <h4>{props.data.title}</h4>
            <div>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            <IoStar className="icon-product-detail"/>
            </div> 
            </div>
             <div className="label-detail-product">
                 <button
                 onClick={handleScroll}
                 ><IoChatboxEllipses/>Hỏi đáp</button>  
                 <button
                 onClick={openBoxSpecification}
                 ><IoHardwareChip/>Xem thông số</button> 
             </div>
            <div className="wrapper-product">
                <div className="container-productImage">
                    <img src={props.data.dataImage[selectBoxColor -1].url} alt={props.data.title}/>
                </div>
                <div className="container-productDetail-right">
                    <div className="content-price-productDetail">
                        <p>Giá sản phẩm</p>
                        <div>
                            <span className="price-detail-product">
                               { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                props.data.price)}     
                            </span>
                            <span className="discount-detail-product">
                                { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                props.data.discount)}    
                            </span>
                        </div>
                    </div>
                    <div className="container-version-product-detail">
                         Phiên bản
                         <div className="content-version-product-detail">
                            {props.data.versionProductDetail.map((data)=>{
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
                            {props.data.dataImage.map((data)=>{
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
                            {props.data.specification.map((d)=>{
                                return (
                                    <>
                                    <h6>{d.nameSpecification}</h6>
                                    <div className="table-detail">
                                    { Object.entries(d.detail).map(([keys, value])=>{
                                        return (
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td className="td-title">{keys}</td>
                                                        <td>{value}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                
                                    })}
                                   </div>
                                    </>
                                    

                                )
                            })}
  
                        </div>
                   </div>
                </div>
            </div>
            </div>
            <div ref={sectionRef} className="container-comment">
                Bình luận
            </div>
            
        </div>
        </>
    )
}
export default ProductDetail;