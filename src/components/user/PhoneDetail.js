import ProductDetail from "./common/ProductDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function PhoneDetail() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();
  const [d, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product/search?productId=${id}`)
      .then((response) => {
        setData(response.data.data);
      })
  }, [id]);
  return (
    <>
      {d && <ProductDetail data={d} />}
    </>
  )
}
export default PhoneDetail;