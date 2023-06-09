import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {fetchProducts} from '../redux/reducers/productSlice'
import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { Product } from '../@types';
import { RootState } from '../redux/store/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const ProductDetail = () => {
    const {products} = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();

    const { productId } = useParams();

    useEffect(()=>{
        dispatch(fetchProducts())
      }, [])

      const product = products.find((item: Product) => item.id === Number(productId))
 
    return (
      <section className='product_detail_page'>
        <div className='container'>
          <Row gutter={[24, 24]}>
            <Col md={12}>
              <div>
                <img src={product?.image} alt="product img" />
              </div>
            </Col>
            <Col md={12}>
              <small className='d-block mb-4'>{product?.category}</small>
              <h5>{product?.title}</h5>
              <p>{product?.description}</p>
              <p><b>Price: {product?.price} $</b></p>

            </Col>
          </Row>
          
        </div>
      </section>
    )
  }
  
  export default ProductDetail;
  