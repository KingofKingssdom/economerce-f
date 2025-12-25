import "./indexUser.css";
import { Link } from 'react-router-dom';
function CategoryBox() {
    return (
        <>
            <div className="container-cate-box">
                <div className="container-item-cate-box">
                    <Link to="/phoneProduct">
                        <div className="icon-cate-box">
                            <img src="./image/CatePhone.png" />
                        </div>
                    </Link>
                    <p>Điện thoại</p>
                </div>
                <div className="container-item-cate-box">
                    <a href="./demo">
                        <div className="icon-cate-box">
                            <img src="./image/CateTablet.png" />
                        </div>
                    </a>
                    <p>Tablet</p>
                </div>
                <div className="container-item-cate-box">
                    <a href="./demo">
                        <div className="icon-cate-box">
                            <img src="./image/CateWatch.png" />
                        </div>
                    </a>
                    <p>Đồng hồ</p>
                </div>
                <div className="container-item-cate-box">
                    <a href="./demo">
                        <div className="icon-cate-box">
                            <img src="./image/CateLaptop.png" />
                        </div>
                    </a>
                    <p>Latop</p>
                </div>
                <div className="container-item-cate-box">
                    <a href="./demo">
                        <div className="icon-cate-box">
                            <img src="./image/CateSound.png" />
                        </div>
                    </a>
                    <p>Tai nghe</p>
                </div>
                <div className="container-item-cate-box">
                    <a href="./demo">
                        <div className="icon-cate-box">
                            <img src="./image/CateScreen.png" />
                        </div>
                    </a>
                    <p>Màn hình</p>
                </div>
                <div className="container-item-cate-box">
                    <a href="./demo">
                        <div className="icon-cate-box">
                            <img src="./image/CateTivi.png" />
                        </div>
                    </a>
                    <p>Ti vi</p>
                </div>
            </div>
        </>
    )
}

export default CategoryBox