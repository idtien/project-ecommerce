import { Carousel, Col, Row } from 'antd'
import React from 'react'

import { useSelector } from 'react-redux'

import Product from '../../components/Product'

import './HomePage.scss'
import '../../styles/Responsive.scss'

import bnSale from '../../assets/images/banner3.png'
import bnSale2 from '../../assets/images/banner4.png'
import { ToastContainer } from 'react-toastify'


const xs = { span: 24 }
const sm = { span: 24 }
const md = { span: 16 }
const lg = { span: 16 }
const HomePage = () => {
    const { allProduct, isLoading } = useSelector(state => state.products)
    const { isLogged, user } = useSelector(state => state.users)
    

    const renderListProduct = (listProduct) => {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
    }

    return (
        <>
        <ToastContainer/>
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