import ProductDetail from "./common/ProductDetail";
import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function PhoneDetail() {
   const {id } = useParams(); 
       const [d, setData] = useState(null);
       
    useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/search?productId=${id}`)
      .then((response) => {
        setData(response.data.data);
      })
  }, [id]);
    return(
        <>  
           {d && <ProductDetail data={d} />}
        </>
    )
}
export default PhoneDetail;