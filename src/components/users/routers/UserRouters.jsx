import { Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PhoneProductDetail from '../features/phone/PhoneProductDetail';
import Cart from '../features/cart/Cart';
import PayMethod from '../features/pay/Paymethod';
import PayResult from '../features/pay/Payresult';
import Order from '../features/order/Order';
import OrderDetail from '../features/order/OrderDetail';
import PhoneListProduct from '../features/phone/PhoneListProduct';
import TabletListProduct from '../features/tablet/TabletListProduct';
import LaptopListProduct from '../features/laptop/LaptopListProduct';
import TabletProductDetail from '../features/tablet/TabletProductDetail';
import LaptopProductDetail from '../features/laptop/LaptopProductDetail';
import SoundListProduct from '../features/sound/SoundListProduct';
import SoundProductDetail from '../features/sound/SoundProductDetail';
import WatchListProduct from '../features/watch/WatchListProduct';
import ScreenListProduct from '../features/screen/ScreenListProduct';
import TiviListProduct from '../features/tivi/TiviListProduct';
import ScreenProductDetail from '../features/screen/ScreenProductDetail';
import WatchProductDetail from '../features/watch/WatchProductDetail';
import TiviProductDetail from '../features/tivi/TiviProductDetail';
import UserProtectedRoute from './UserProtectedRoute';
const UserRouters =
    (
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/phoneDetail/:id" element={<PhoneProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orderDetail/:id" element={<OrderDetail />} />
            <Route path="/payOnline" element={<PayMethod />} />
            <Route path="/pay-result" element={<PayResult />} />
            <Route path="/phoneProduct" element={<PhoneListProduct />} />
            <Route path="/tabletProduct" element={<TabletListProduct />} />
            <Route path="/laptopProduct" element={<LaptopListProduct />} />
            <Route path="/tabletDetail/:id" element={<TabletProductDetail />} />
            <Route path="/laptopDetail/:id" element={<LaptopProductDetail />} />
            <Route path="/soundProduct" element={<SoundListProduct />} />
            <Route path="/soundDetail/:id" element={<SoundProductDetail />} />
            <Route path="/watchProduct" element={<WatchListProduct />} />
            <Route path="/screenProduct" element={<ScreenListProduct />} />
            <Route path="/tiviProduct" element={<TiviListProduct />} />
            <Route path="/screenDetail/:id" element={<ScreenProductDetail />} />
            <Route path="/watchDetail/:id" element={<WatchProductDetail />} />
            <Route path="/tiviDetail/:id" element={<TiviProductDetail />} />
        </>
    )
export default UserRouters