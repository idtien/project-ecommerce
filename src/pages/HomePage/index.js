import { Button, Carousel, Col, Row } from 'antd'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchAllProduct } from '../../redux/features/Product/productSlice'
import Product from '../../components/Product'


import './HomePage.scss'
import '../../styles/Responsive.scss'

import bnSale from '../../assets/images/banner3.png'
import bnSale2 from '../../assets/images/banner4.png'
import { actReLogin } from '../../redux/features/User/userSlice';
import { KEY_ACCESS_TOKEN } from '../../constants/config';


const xs = { span: 24 }
const sm = { span: 24 }
const md = { span: 16 }
const lg = { span: 16 }
const HomePage = () => {
    const dispatch = useDispatch();
    const { allProduct, isLoading } = useSelector(state => state.products)
    const { isLogged, user } = useSelector(state => state.users)


    useEffect(() => {
        if (user?.fullname) {
            toast.success(`Hello ${user?.fullname}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, [user?.fullname])



    const renderListProduct = (listProduct) => {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Row>
                <Col xs={xs} sm={sm} md={md} lg={lg} className='carousel'>
                    <Carousel autoplay draggable className='carousel'>
                        <div>
                            <h3 className='carousel__main'> </h3>
                        </div>
                        <div>
                            <h3 className='carousel__main'> </h3>
                        </div>
                        <div>
                            <h3 className='carousel__main'> </h3>
                        </div>
                        <div>
                            <h3 className='carousel__main'> </h3>
                        </div>
                    </Carousel>
                </Col>

                <Col span={8}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <div>
                                <h3 className='carousel__extra'> </h3>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <h3 className='carousel__extra'> </h3>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={24} className='features'>
                    <div className='features__content'>
                        <p className='features__content--header'>Featured Product</p>
                        <p className='features__content--des'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <Row>
                        <Col span={20} offset={2}>
                            <Row gutter={[16, 16]}>
                                {isLoading ? <Product loading={isLoading} /> :
                                    (
                                        renderListProduct(allProduct)
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={20} offset={2} className='sales'>
                    <Carousel autoplay draggable className='carousel'>
                        <div>
                            <img className='sales__img' src={bnSale} alt='bannerSale' />
                        </div>
                        <div>
                            <img className='sales__img' src={bnSale2} alt='bannerSale' />
                        </div>
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='features'>
                    <div className='features__content'>
                        <p className='features__content--header'>Featured Product</p>
                        <p className='features__content--des'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default HomePage