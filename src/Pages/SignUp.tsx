import { Button, Form, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from '../redux/reducers/userSlice';
import { RootState } from '../redux/store/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { SignUpValueType } from '../@types';


const SignUp = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const [form] = Form.useForm();


  const onFinish = (values: SignUpValueType) => {
    console.log(values)
    dispatch(signUpUser(values));
 
  };


  return (
    <Row
      justify='center'
      align='middle'
      id='components-form-normal-login'
      style={{ height: 'calc(100vh - 144px)' }}
    >
      <Col span={8}>
        <h1 className='text-center'>Sign Up</h1>
        <Form
          layout='vertical'
          form={form}
          name='register'
          onFinish={onFinish}
          initialValues={{
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name='username'
            label='Username'
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-100 form_button'>
              Sign up
            </Button>
             <Link to={`/log-in`} className='text-center mt-2 d-block'>Already have an account? Log in</Link>
          </Form.Item>
          
        </Form>
      </Col>
    </Row>
  );
};


export default SignUp;