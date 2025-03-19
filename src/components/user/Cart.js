import { useState, useEffect } from "react";
import "./indexUser.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link} from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const cartId = user?.id;
    useEffect(() => {
        if (!cartId) return;
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cartItem/cart?cartId=${cartId}`);
                setCartItems(response.data);
            } catch (error) {
                console.error('Lỗi gọi api lấy ra giỏ hàng theo id', error);
            }
        };

        fetchCartItems();
    }, [cartId]);
    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/cartItem/delete/${itemId}`);

            setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Lỗi gọi api xóa chi tiết sản phẩm', error);
        }
    };

    
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.product.priceCurrent * item.quantity);
    }, 0);
     
    return (
        <>
            <div className="container-order">
                <h4>Giỏ hàng của bạn</h4>
                {cartItems.length > 0 ? (
                    cartItems.map((cartItem) => (
                        <div className="container-order-product" key={cartItem.id}>
                            <div className="left-order-product">
                                <img src={`data:image/webp;base64,${cartItem.product.productImage}`} alt={cartItem.product.productName} />
                            </div>
                            <div className="center-order-product">
                                <h6>{cartItem.product.productName}</h6>
                                <p className="p-buy">{(cartItem.product.priceCurrent).toLocaleString()} đ</p>
                                <p>Số lượng: {cartItem.quantity}</p>
                            </div>
                            <div className="rigth-order-product">
                                <div className="btn-delete" onClick={() => handleDeleteItem(cartItem.id)}>
                                    <MdDelete />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Giỏ hàng của bạn trống.</p>
                )}

               {cartItems.length > 0 ? (
                <div className="container-total">
                <p>
                    <b>Tổng tiền:</b> {totalPrice.toLocaleString()} đ
                </p>
                
               <Link to={`/confirmInformation/${cartId}`}><div className="btn-buy">Mua ngay</div></Link> 
            </div>
               ): ("")} 
            </div>
        </>
    );
}

export default Cart;