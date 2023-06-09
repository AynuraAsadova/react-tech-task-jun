import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProduct,
  removeProduct,
  decreaseProduct,
  clearCart,
} from "../redux/reducers/cartSlice";
import { Button } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { RootState } from '../redux/store/store';

const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  console.log(cartItems);

  return (
    <>
      <div className='container cart'>
        <h3 className='text-center mt-5 mb-5'>Shopping cart</h3>
        {cartItems.length === 0 ? (
          <div className='empty_cart text-center mt-5'>
            <h4 className='mb-4'>Your cart is empty</h4>
            <Link to='/'>
              <Button
                className='m-2 rounded-0 d-inline-flex align-items-center'
                size='large'
              >
                <ArrowLeftOutlined /> Start shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className='titles d-none d-md-grid'>
              <h4 className='product_title'>Product</h4>
              <h4 className='price text-md-center'>Price</h4>
              <h4 className='quantity text-md-center'>Count</h4>
              <h4 className='total'>Total</h4>
            </div>
            <div className='product_item'>
              {cartItems?.map((cartItem) => (
                <div className='cart_item' key={cartItem.id}>
                  <div className='cart_product'>
                    <img src={cartItem.image} alt={cartItem.title} />
                    <div>
                      <h6>{cartItem.title}</h6>
                      <p className='cart_product_desc'>
                        {cartItem.description}
                      </p>
                      <Button
                        danger
                        onClick={() => dispatch(removeProduct(cartItem))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className='cart_product_price text-md-center'>
                    <div>
                      <h4 className='price d-inline-block d-md-none me-2'>
                        Price:
                      </h4>
                      {cartItem.price}$
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-md-center'>
                    <h4 className='quantity d-inline-block d-md-none me-3'>
                      Count:
                    </h4>
                    <div className='cart_product_quantity'>
                      <button
                        onClick={() => dispatch(decreaseProduct(cartItem))}
                      >
                        -
                      </button>
                      <div className='count'>{cartItem.cartQuantity}</div>
                      <button onClick={() => dispatch(addProduct(cartItem))}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className='cart_product_total_price'>
                    <h4 className='total d-inline-block d-md-none me-2'>
                      Total:{" "}
                    </h4>
                    {(cartItem.price * (cartItem.cartQuantity as number)).toFixed(2)}$
                  </div>
                </div>
              ))}
            </div>
            <div className='cart_summary'>
              <Button
                className='clear_cart rounded-0 d-flex align-items-center'
                onClick={() => dispatch(clearCart())}
                size='large'
              >
                Clear cart
                <DeleteOutlined twoToneColor={"red"} />
              </Button>
              <div className='subtotal'>
                 Subtotal: <b>{cartTotalAmount.toFixed(2)}$</b>
              </div>
            </div>
            <Link to='/' className='d-block text-md-end text-center mb-5'>
              <Button
                className='rounded-0 continue_btn'
                size='large'
                type='primary'
              >
                Continue shopping
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
