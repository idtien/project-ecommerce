import { DeleteOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'

import './WishList.scss'
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteWishList } from '../../redux/features/WishList/wishListSlice';
import { ToastContainer } from 'react-toastify';
import { actListCart } from '../../redux/features/Cart/cartSlice';
import useGoToTop from '../../hooks/useGoToTop';


const xs = { span: 20, offset: 2 }
const sm = { span: 20, offset: 2 }
const md = { span: 20, offset: 2 }
const lg = { span: 20, offset: 2 }
const WishListPage = () => {
    useGoToTop()

    const dispatch = useDispatch()
    const [wishList, setWishList] = useState([])

    const { listWishList } = useSelector(state => state.wishList)

    const handleDeleteWishList = (product) => {
        dispatch(actDeleteWishList(product))
    }

    const handleAddToCart = (id) => {
        const existProduct = listWishList.findIndex(item => item.id === id)
        dispatch(actListCart(listWishList[existProduct]))
    }

    const columns = [
        {
            width: 100,
            title: 'Product',
            dataIndex: 'image',
            key: 'name',
            render: (text) => {
                return <img className='img-product' style={{ width: '100px' }} src={text} alt='cart'></img>
            },

        },
        {
            width: 150,
            title: 'Name',
            dataIndex: 'nameProduct',
            key: 'name',
        },
        {
            width: 100,
            title: 'Price',
            dataIndex: 'price',
            key: 'name',
        },
        {
            width: 100,
            title: 'Price Sale',
            dataIndex: 'priceSale',
            key: 'name',
        },
        {
            width: 100,
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'name',
        },
        {
            width: 100,
            title: 'Category',
            dataIndex: 'category',
            key: 'name',
            render: (category) => {
                let color = ''

                if (category === 'technological') {
                    color = '#f5222d'
                } else if (category === 'clothes') {
                    color = '#52c41a'
                } else if (category === 'jewelry') {
                    color = '#69b1ff'
                }
                return (
                    <Tag color={color}>
                        {category}
                    </Tag>
                )
            }
        },
        {
            width: 100,
            title: 'Actions',
            render: (product) => {
                return (
                    <>
                        <Tooltip title="Delete" >
                            <Button><DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteWishList(product)} /></Button>
                        </Tooltip>
                        <Tooltip title="Add To Card">
                            <Button style={{ marginLeft: '8px' }}><ShoppingCartOutlined onClick={() => handleAddToCart(product.id)} style={{ color: 'blue' }} /></Button>
                        </Tooltip>
                    </>
                )
            },
        },
    ]


    useEffect(() => {
        setWishList(listWishList?.map((wishListMap, index) => {
            return (
                {
                    key: index,
                    id: wishListMap?.id,
                    image: wishListMap?.images[0],
                    nameProduct: wishListMap?.name,
                    price: wishListMap?.price,
                    priceSale: wishListMap?.priceSale,
                    category: wishListMap?.category,
                    quantity: wishListMap?.quantity
                }
            )
        }))
    }, [listWishList])

    return (
        <>
            <ToastContainer />
            <Row gutter={[0, 16]}>
                <Col span={6} offset={2} >
                    <Breadcrumb >
                        <Breadcrumb.Item className='wishList__breadcrumb'>
                            <HomeOutlined />
                        </Breadcrumb.Item>

                        <Breadcrumb.Item className='wishList__breadcrumb'>Wish List</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col xs={xs} sm={sm} md={md} lg={lg}>
                    <div className='wishList__table' >
                        <Table dataSource={wishList} columns={columns} scroll={{ x: 500, y: 1000 }} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default WishListPage