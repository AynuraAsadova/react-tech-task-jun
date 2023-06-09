import NavMenu from './NavMenu';
import { Avatar, Badge, Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTotal } from '../../../redux/reducers/cartSlice';
import { ShoppingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Images } from '../../../Images';
import { RootState } from '../../../redux/store/store';
import { logout } from '../../../redux/reducers/userSlice';


const Header = () => {
  const {cartItems, cartTotalQuantity} = useSelector((state: RootState) => state.cart);
  const { token, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  
  const content = (
    <div className='profil-info'>
      <div>
        <p className='mb-0'>
          {/* <b>{user?.username}</b> */}
        </p>
        <p className='mb-0'>
          Email: 
          <em>example@gmail.com</em>
        </p>
       
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        
        <Button
          onClick={() => {
            LogOut();
          }}
          className='d-flex align-items-center'
        >
          <LogoutOutlined className='me-2' />
          LogOut
        </Button>
      </div>
    </div>
  );

  const LogOut = () => {
    dispatch(logout(''))
    navigate("/");
  };

  console.log(user)
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container ">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <Link className="navbar-brand" to="/">
              <img src={Images.logo} alt="logo" className='logo'/>
            </Link>
            <div className="menu_list">
              <NavMenu/>
            </div>
            <div className='btn_wrap header_right'>
              {token ? (
                <Popover
                overlayStyle={{width: 200}}
                  placement='bottomLeft'
                  content={content}
                  trigger='click'
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                    <Avatar
                      className='me-2'
                      size="large"
                      style={{
                        backgroundColor: "#87d068",
                      }}
                      icon={<UserOutlined style={{verticalAlign: "middle"}}/>}
                    />
                </Popover>
              ) : (
                <>
                  <Link to={'/sign-up'}>
                    <Button className='sign_up_btn rounded-0 me-2'>Sign up</Button>
                  </Link>
                  <Link to={'/log-in'}>
                    <Button className='log_in_btn rounded-0 me-2'>Log in</Button>
                  </Link>
                </>
              ) }
              
              <Link to='/cart'>
                <Badge count={cartTotalQuantity} showZero>
                  <ShoppingOutlined style={{ fontSize: 28 }} twoToneColor="#000"/>
                </Badge>
              </Link>
            </div>
          </div>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
