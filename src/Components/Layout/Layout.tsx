import { Layout } from 'antd';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Content } from 'antd/es/layout/layout';
import { FC } from 'react';


const StoreLayout: FC<{ children: JSX.Element }> = ({children}) => {

    return (
      <>
        <Header/>
        <Content>
          {children}
        </Content>
        <Footer/>
      </>
    )
  }
  
  export default StoreLayout;
  