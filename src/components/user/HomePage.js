import Banner from "./CarouselBanner";
import HotSaleProduct from "./HotSaleProducts";
import OutStandingProduct from "./OutStandingProduct";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
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
            <div data-aos="fade-down">
                <HotSaleProduct />
            </div>
            <div data-aos="fade-right">
                <OutStandingProduct />
            </div>


        </>
    )
}
export default HomePage;