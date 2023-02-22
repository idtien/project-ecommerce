import { Badge, Card, Col, Rate, Row } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import React from 'react'
import './Product.scss'

import cardImg from '../../assets/images/product_1.jpg'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../../constants/routingUrl'

const xs = { span: 24 }
const sm = { span: 12 }
const md = { span: 6 }
const lg = { span: 6 }
const Product = () => {
    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <Row gutter={[16, 16]}>
                        <Col xs={xs} sm={sm} md={md} lg={lg}>
                            <Badge.Ribbon text="New Product" color="red">
                                <Card
                                    bodyStyle={{ height: '260px' }}
                                    hoverable
                                    className='card'
                                    cover={<img alt="example" src={cardImg} />}
                                    actions={[
                                        <>
                                            <HeartOutlined key="favorite" />Favorites
                                        </>,
                                        <>
                                            <ShoppingCartOutlined key="buyNow" />Buy now
                                        </>,
                                    ]}>
                                    <div className='card__title'>
                                        <Link to={ROUTE_URL.PRODUCT_DETAILS}>
                                            MSI Gaming GF63 Thin 11SC-1090VN i5 11400H
                                        </Link>
                                    </div>

                                    <div className='card__des'>
                                        <strong>Description: </strong>
                                        15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, IPS FHD
                                        Intel, Core i5, 11400H
                                        8 GB (1 thanh 8 GB), DDR4, 3200 MHz
                                        SSD 512 GB
                                        NVIDIA GeForce GTX 1650 4GB
                                    </div>
                                    <div className='card__price'>
                                        <span>Price: $2000 </span>
                                        <div className='card__sold'>Sold: 15 </div>
                                    </div>
                                    <div className='card__rate'>
                                        <Rate disabled defaultValue={3} />
                                        <span>Reviews: 12 </span>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={xs} sm={sm} md={md} lg={lg}>
                            <Badge.Ribbon text="New Product" color="red">
                                <Card
                                    bodyStyle={{ height: '260px' }}
                                    hoverable
                                    className='card'
                                    cover={<img alt="example" src={cardImg} />}
                                    actions={[
                                        <>
                                            <HeartOutlined key="favorite" />Favorites
                                        </>,
                                        <>
                                            <ShoppingCartOutlined key="buyNow" />Buy now
                                        </>,
                                    ]}>
                                    <div className='card__title'>
                                        <Link to={ROUTE_URL.PRODUCTDETAILS}>
                                            MSI Gaming GF63 Thin 11SC-1090VN i5 11400H
                                        </Link>
                                    </div>

                                    <div className='card__des'>
                                        <strong>Description: </strong>
                                        15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, IPS FHD
                                        Intel, Core i5, 11400H
                                        8 GB (1 thanh 8 GB), DDR4, 3200 MHz
                                        SSD 512 GB
                                        NVIDIA GeForce GTX 1650 4GB
                                    </div>
                                    <div className='card__price'>
                                        <span>Price: $2000 </span>
                                        <div className='card__sold'>Sold: 15 </div>
                                    </div>
                                    <div className='card__rate'>
                                        <Rate disabled defaultValue={3} />
                                        <span>Reviews: 12 </span>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={xs} sm={sm} md={md} lg={lg}>
                            <Badge.Ribbon text="New Product" color="red">
                                <Card
                                    bodyStyle={{ height: '260px' }}
                                    hoverable
                                    className='card'
                                    cover={<img alt="example" src={cardImg} />}
                                    actions={[
                                        <>
                                            <HeartOutlined key="favorite" />Favorites
                                        </>,
                                        <>
                                            <ShoppingCartOutlined key="buyNow" />Buy now
                                        </>,
                                    ]}>
                                    <div className='card__title'>
                                        <Link to={ROUTE_URL.PRODUCTDETAILS}>
                                            MSI Gaming GF63 Thin 11SC-1090VN i5 11400H
                                        </Link>
                                    </div>

                                    <div className='card__des'>
                                        <strong>Description: </strong>
                                        15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, IPS FHD
                                        Intel, Core i5, 11400H
                                        8 GB (1 thanh 8 GB), DDR4, 3200 MHz
                                        SSD 512 GB
                                        NVIDIA GeForce GTX 1650 4GB
                                    </div>
                                    <div className='card__price'>
                                        <span>Price: $2000 </span>
                                        <div className='card__sold'>Sold: 15 </div>
                                    </div>
                                    <div className='card__rate'>
                                        <Rate disabled defaultValue={3} />
                                        <span>Reviews: 12 </span>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={xs} sm={sm} md={md} lg={lg}>
                            <Badge.Ribbon text="New Product" color="red">
                                <Card
                                    bodyStyle={{ height: '260px' }}
                                    hoverable
                                    className='card'
                                    cover={<img alt="example" src={cardImg} />}
                                    actions={[
                                        <>
                                            <HeartOutlined key="favorite" />Favorites
                                        </>,
                                        <>
                                            <ShoppingCartOutlined key="buyNow" />Buy now
                                        </>,
                                    ]}>
                                    <div className='card__title'>
                                        <Link to={ROUTE_URL.PRODUCTDETAILS}>
                                            MSI Gaming GF63 Thin 11SC-1090VN i5 11400H
                                        </Link>
                                    </div>

                                    <div className='card__des'>
                                        <strong>Description: </strong>
                                        15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, IPS FHD
                                        Intel, Core i5, 11400H
                                        8 GB (1 thanh 8 GB), DDR4, 3200 MHz
                                        SSD 512 GB
                                        NVIDIA GeForce GTX 1650 4GB
                                    </div>
                                    <div className='card__price'>
                                        <span>Price: $2000 </span>
                                        <div className='card__sold'>Sold: 15 </div>
                                    </div>
                                    <div className='card__rate'>
                                        <Rate disabled defaultValue={3} />
                                        <span>Reviews: 12 </span>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        </Col>

                    </Row>
                </Col>
            </Row>
            <br /><br /><br /><br /><br />
        </>
    )
}

export default Product
