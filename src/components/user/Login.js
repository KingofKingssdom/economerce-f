import { useState } from "react";
import axios from "axios";
import "./indexUser.css";
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? "http://localhost:8080/user/add"
      : "http://localhost:8080/user/login";

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true, // Cho phép gửi session
        headers: { "Content-Type": "application/json" }
      });

      alert(isRegister ? "Đăng ký thành công!" : "Đăng nhập thành công!");
      if( !isRegister){
         navigate('/');
      }
      localStorage.setItem("user", JSON.stringify(response.data)); 
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="conatainer-form">
      <div className="content-form">
        <h2>
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="block">
              <input 
              type="text" 
              name="lastName" 
              placeholder="Họ" 
              value={formData.lastName} 
              onChange={handleChange} 
              className="input-login" 
              required />
              <input 
              type="text" 
              name="firstName" 
              placeholder="Tên" 
              value={formData.firstName} 
              onChange={handleChange} 
              className="input-login" 
              required />
            </div>
          )}
          <div className="block">
          <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange}  
          className="input-login" required />
          <input 
          type="password" 
          name="password" 
          placeholder="Mật khẩu" 
          value={formData.password} 
          onChange={handleChange}  
          className="input-login" required />
          </div>
          
          <button type="submit" className="btn btn-danger logbtn">
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>
        <p className="">
          {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="btn btn-danger">
            {isRegister ? "Đăng nhập" : "Đăng ký"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
