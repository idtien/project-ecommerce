import { Badge, Card, Col, Rate } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import './Product.scss'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actListCart } from '../../redux/features/Cart/cartSlice'
import { toast } from 'react-toastify'
import { actAddWishList } from '../../redux/features/WishList/wishListSlice'
const xs = { span: 24 }
const sm = { span: 12 }
const md = { span: 6 }
const lg = { span: 6 }

const Product = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, products } = props
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState({})
    const { isLogged } = useSelector(state => state.users)

    const handleRedirectProductDetail = (id) => {
        navigate(`/products/${id}`)
    }

    useEffect(() => {
        setCart({
            ...products,
            quantity: quantity
        })
    }, [quantity])


    const handleAddToWishList = (products) => {
        if (!isLogged) {
            toast.warn('Please Login To Add Wish List!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
        } else {
            dispatch(actAddWishList(cart))
        }
    }

    const handleAddToCart = (products) => {
        dispatch(actListCart(cart))
    }


    return (
        <>
            <Col xs={xs} sm={sm} md={md} lg={lg}>

                <Badge.Ribbon text='New Product' color="red">
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
                                <span
                                    onClick={() => handleAddToWishList(products)}
                                >
                                    <HeartOutlined key="favorite" />Favorites
                                </span>
                            </>,
                            <>
                                <span
                                    onClick={() => handleAddToCart(products)}
                                >
                                    <ShoppingCartOutlined key="buyNow" />
                                    Add To Cart
                                </span>
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
