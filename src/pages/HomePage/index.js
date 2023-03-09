import { Carousel, Col, Row } from 'antd'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Product from '../../components/Product'

import './HomePage.scss'
import '../../styles/Responsive.scss'

import bnSale from '../../assets/images/banner3.png'
import bnSale2 from '../../assets/images/banner4.png'
import { ToastContainer } from 'react-toastify'
import useGoToTop from '../../hooks/useGoToTop'

import banner5 from '../../assets/images/banner5.png'
import banner6 from '../../assets/images/banner6.png'
import banner_extra1 from '../../assets/images/banner_extra1.png'
import banner_extra2 from '../../assets/images/banner_extra2.png'
import { fetchAllProduct } from '../../redux/features/Product/productSlice'


const xs = { span: 24 }
const sm = { span: 24 }
const md = { span: 16 }
const lg = { span: 16 }
const HomePage = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const { allProduct, isLoading } = useSelector(state => state.products)
    const { isLogged, user } = useSelector(state => state.users)



    const renderListProduct = (listProduct) => {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
    }
    useEffect(() => {
        dispatch(fetchAllProduct({ _page: 1, _limit: 20 }))
    }, [])
   

    return (
        <>
            <ToastContainer />
            <Row>
                <Col xs={xs} sm={sm} md={md} lg={lg} className='carousel'>
                    <Carousel autoplay draggable className='carousel'>
                        <div className='carousel__main'>
                            <img src={banner5} />
                        </div>
                        <div className='carousel__main'>
                            <img src={banner6} />
                        </div>
                        <div className='carousel__main'>
                            <img src={banner5} />
                        </div>
                        <div className='carousel__main'>
                            <img src={banner5} />
                        </div>

                    </Carousel>
                </Col>

                <Col span={8}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <div className='carousel__extra'>
                                <img src={banner_extra1} />
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className='carousel__extra'>
                                <img src={banner_extra2} />
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