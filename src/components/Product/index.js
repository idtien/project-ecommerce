import { Badge, Card, Col, Rate } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import React from 'react'
import './Product.scss'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actGetProduct, actGetProductById } from '../../redux/features/Product/productSlice'
const xs = { span: 24 }
const sm = { span: 12 }
const md = { span: 6 }
const lg = { span: 6 }

const Product = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, products } = props

    const handleRedirectProductDetail = (id) => {
        navigate(`/products/${id}`)
    }
    return (
        <>
            <Col xs={xs} sm={sm} md={md} lg={lg}>
                <Badge.Ribbon text="New Product" color="red">
                    <Card
                        loading={loading}
                        bodyStyle={{ height: '260px' }}
                        hoverable
                        className='card'
                        cover={
                            <div className='test_img'>
                                {loading ? "" : (<img alt="example" src={products?.images[0]} />)}
                            </div>
                        }
                        actions={[
                            <>
                                <HeartOutlined key="favorite" />Favorites
                            </>,
                            <>
                                <ShoppingCartOutlined key="buyNow" />Buy now
                            </>,
                        ]}>
                        <div className='card__title'
                            onClick={() => handleRedirectProductDetail(products?.id)}
                        >
                            {products?.name}
                        </div>
                        <div className='card__des'>
                            <strong>Description: </strong>
                            {products?.description}
                        </div>
                        <div className='card__price'>
                            <span>Price: ${products?.priceSale} <span className='card__price--old'>${products?.price}</span> </span>
                            {/* <div className='card__sold'>Sold: 15 </div> */}
                        </div>
                        <div className='card__rate'>
                            <Rate allowHalf disabled defaultValue={products?.rating} />
                            <span>Reviews: 12 </span>
                        </div>
                    </Card>
                </Badge.Ribbon>
            </Col>

        </>
    )
}

export default Product
