import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiUnlock, CiMail } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
import { postLogin, postRegisterAdmin } from "../../../../services/ApiAuth";
import "../../../../styles/index.css";
function Login() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const showBox = () => {
        setCurrentIndex(() => 100)
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        try {
            const user = await postLogin(formData);
            setEmail("");
            setPassword("");
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/admin/homePage", { state: { user } });
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Sai tên đăng nhập hoặc mật khẩu vui lòng kiểm tra lại!");
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);
        try {
            const register = await postRegisterAdmin(formData)
            alert("Đăng ký thành công!");
            setPhoneNumber("");
            setPassword("");
            setFullName("");
            setPassword("");
            setCurrentIndex(0)
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            alert("Đăng kí không thành công vui lòng kiểm tra lại!");
        }
    };
    return (
        <>
            <div className="conatainer-form">

                <div className="image-form"
                    style={{
                        transform: `translateX(-${currentIndex}%)`,
                        transition: "ease 0.7s",
                    }}
                >
                    nội dung ở đây
                </div>
                <div className="content-form">
                    <div className="container-login">
                        <h4 className="title">Đăng nhập</h4>
                        <form className="form-log">
                            <p className="title-fill">Email</p>
                            <div className="fill-form">
                                <div>
                                    <CiUser />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
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
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
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
                            <p>Bạn chưa có tài khoản?</p>
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
                                    value={fullName}
                                    onChange={(e) => { setFullName(e.target.value) }}
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
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
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
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
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
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>

                            <button
                                className="btn-login"
                                onClick={handleRegister}
                            >
                                Đăng kí
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;