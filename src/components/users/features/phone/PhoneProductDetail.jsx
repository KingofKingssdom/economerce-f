import "../../../../styles/index.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../../services/ApiProduct";
import ProductDetail from "../../common/ProductDetail";
function PhoneProductDetail() {
    const { id } = useParams();
    const [dataProduct, setDataProduct] = useState(null);
    const fethProduct = async () => {

        try {
            await getProductById(id).then((response) => {
                setDataProduct(response.data);
            })
        } catch (error) {
            console.log("Lỗi lấy sản phẩm theo id " + error)
        }
    }
    useEffect(() => {
        fethProduct()
    }, [])
    return (
        <>
            {dataProduct && <ProductDetail data={dataProduct} />}
        </>
    )
}
export default PhoneProductDetail;