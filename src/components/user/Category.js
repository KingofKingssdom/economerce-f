import "./indexUser.css";
import { IoIosPhonePortrait, IoIosArrowForward } from "react-icons/io";
import { FaTabletAlt, FaLaptop } from "react-icons/fa";
import { TbDeviceAirpods } from "react-icons/tb";
import { IoWatch } from "react-icons/io5";
import { MdScreenshotMonitor } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
function Category() {
  return (
    <>
      <div className="category">
        <Link to="/phoneProduct" className="item-category">
          <IoIosPhonePortrait className="icon-item-category" />
          <li className="">Điện thoại</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
        <Link to="/tabletProduct" className="item-category">
          <FaTabletAlt className="icon-item-category" />
          <li className="item-li">Tablet</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
        <Link to="/laptopProduct" className="item-category">
          <FaLaptop className="icon-item-category" />
          <li className="item-li">Laptop</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
        <Link to="/soundProduct" className="item-category">
          <TbDeviceAirpods className="icon-item-category" />
          <li className="item-li">Âm thanh</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
        <Link to="/watchProduct" className="item-category">
          <IoWatch className="icon-item-category" />
          <li className="item-li">Đồng hồ</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
        <Link to="/screenProduct" className="item-category" >
          <HiMiniComputerDesktop className="icon-item-category" />
          <li className="item-li">Màn hình</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
        <Link to="/tiviProduct" className="item-category">
          <MdScreenshotMonitor className="icon-item-category" />
          <li className="item-li">Tivi</li>
          <IoIosArrowForward className="icon-item-category" />
        </Link>
      </div>
    </>
  )
}
export default Category;