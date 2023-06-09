import { Button, Form, Input, Col, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logInUser } from '../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import {useEffect} from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { LoginValueType } from '../@types';


const LogIn = () => {

  const { token } = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const navigate = useNavigate();

  const onFinish = (values: LoginValueType) => {
    dispatch(logInUser(values))
    
  };

  useEffect(() => {
    if(token){
        dispatch(getUser())
        navigate('/')
    }
  }, [token])
 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <Row
        justify='center'
        align='middle'
        id='components-form-normal-login'
        style={{ height: 'calc(100vh - 144px)' }}
      >
        
        <Col span={8}>
        <h1 className='text-center'>Login</h1>
          <Form
            form={form}
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              initialValue='mor_2314'
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='username'
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              initialValue='83r5^_'
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='form_button'
                block
              >
                Log in
              </Button>
              
                <Link to={`/sign-up`} className='text-center d-block mt-2'>Don't have an account? Sign Up</Link>
            </Form.Item>
            
          </Form>
        </Col>
      </Row>
  );
};



export default LogIn;
