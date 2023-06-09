import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import ProductDetail from '../Pages/Product';
import Cart from '../Pages/Cart';
import LogIn from '../Pages/LogIn';
import SignUp from '../Pages/SignUp';

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/products' element={<Products/>} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/log-in' element={<LogIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='*' element={<div>404 not found</div>} />
            </Routes>
        </>
    );
}
  
export default Routing;
