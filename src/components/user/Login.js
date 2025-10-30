import { useState } from "react";
import axios from "axios";
import { CiUser, CiUnlock, CiMail } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
import "./indexUser.css";
import { useNavigate } from 'react-router-dom';
function Login() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  const showBox = () => {
    setCurrentIndex(() => 100)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Đăng ký thành công!");
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: ""
      });
      setCurrentIndex(0)
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // chặn reload trang
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      alert("Đăng nhập thành công!");
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: ""
      });
      sessionStorage.setItem("user", JSON.stringify(response.data));

      navigate("/", { state: { user: response.data } });
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="conatainer-form">
      <video id="background-video" autoPlay loop muted >
        <source src="/image/backgroundLogin.mp4" type="video/mp4" />
      </video>
      <div className="image-form"
        style={{
          transform: `translateX(-${currentIndex}%)`,
          transition: "ease 0.7s",
        }}
      >
        <img src="/image/backgroundLog.png" />
      </div>
      <div className="content-form">
        <div className="container-login">
          <h4 className="title">Đăng nhập</h4>
          <form className="form-log">
            <p className="title-fill">Số điện thoại</p>
            <div className="fill-form">
              <div>
                <CiUser />
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

            </div>
            <p className="title-fill">Mật khẩu</p>
            <div className="fill-form">

              <div>
                <CiUnlock />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn-login"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </form>
          <div className="choose-log">
            <p>Bạn chưa có tài khoản ?</p>
            <div className="toggle-log"
              onClick={showBox}
            > Đăng kí</div>
          </div>

        </div>


        <div className="container-register">
          <h4 className="title">Đăng kí tài khoản</h4>
          <form className="form-log">
            <p className="title-fill">Họ và tên</p>
            <div className="fill-form">
              <div>
                <CiUser />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />

            </div>
            <p className="title-fill">Số điện thoại</p>
            <div className="fill-form">
              <div>
                <IoIosPhonePortrait />
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

            </div>
            <p className="title-fill">Email</p>
            <div className="fill-form">
              <div>
                < CiMail />
              </div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>
            <p className="title-fill">Mật khẩu</p>
            <div className="fill-form">

              <div>
                <CiUnlock />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn-login"
              onClick={handleSubmit}
            >
              Đăng kí
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
