import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchFilteredProducts,
} from "../redux/reducers/productSlice";
import {
  fetchCategories,
} from "../redux/reducers/categoriesSlice";
import { addProduct } from "../redux/reducers/cartSlice";
import { useEffect } from "react";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Product } from "../@types";
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store/store';

const { Meta } = Card;

const Products = () => {
  const { products, filteredProducts } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();

  useEffect(() => {
    dispatch(fetchProducts()), dispatch(fetchCategories());
  }, []);

  return (
    <section>
      <div className='container'>
        <Row gutter={[24, 24]}>
          <Col span={24} className='text-center mt-3 mb-3'>
            <Button
              onClick={() => dispatch(fetchFilteredProducts('All'))}
              className='m-1 rounded-0'
            >
              All
            </Button>
            {categories.map((category: string, i: number) => {
              return (
                <Button
                  key={i}
                  onClick={() => dispatch(fetchFilteredProducts(category))}
                  className='m-1 rounded-0'
                >
                  {category}
                </Button>
              );
            })}
          </Col>
          {(filteredProducts?.length > 0 ? filteredProducts : products).map(
            (item: Product) => {
              return (
                <Col md={6} sm={8} key={item.id}>
                  <Card
                    className='product_card'
                    hoverable
                    cover={<img alt={item.title} src={item.image} />}
                    actions={[
                      <Button
                        type='primary'
                        onClick={() => dispatch(addProduct(item))}
                        block
                        size='large'
                        className='add_to_cart_btn'
                      >
                        Add To Cart
                      </Button>
                      
                    ]}
                  >
                    <Link to={`/products/${item.id}`}>
                      <Meta
                        title={item.title}
                        description={
                          <>
                            <p className='desc'>{item.description}</p>
                            <p>
                              <b>Price: {item.price}$</b>
                            </p>
                          </>
                        }
                      />
                    </Link>
                  </Card>
                </Col>
              );
            }
          )}
        </Row>
      </div>
    </section>
  );
};

export default Products;
