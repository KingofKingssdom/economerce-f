import Banner from "./CarouselBanner";
import HotSaleProduct from "./HotSaleProducts";
import OutStandingProduct from "./OutStandingProduct";
import Buy from "./ExperienceBuy";
import CategoryBox from "./CategoryBox";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Footer from "./Footer";
function HomePage() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false,
        });
    }, []);
    return (
        <>
            <Banner />
            <div>
                <CategoryBox />
            </div>
            <div data-aos="fade-down">
                <HotSaleProduct />
            </div>

            <div data-aos="fade-right">
                <OutStandingProduct />
            </div>
            <div>
                <Buy />
            </div>
        </>
    )
}
export default HomePage;