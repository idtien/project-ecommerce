import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import React from 'react'

import './WishList.scss'
import logoOrange from '../../assets/images/logo_part2_orange.png'


const xs = { span: 20, offset: 2 }
const sm = { span: 20, offset: 2 }
const md = { span: 20, offset: 2 }
const lg = { span: 20, offset: 2 }
const WishListPage = () => {
    const columns = [
        {
            width: 100,
            title: 'Product',
            dataIndex: 'product',
            key: 'name',
            render: (text) => {
                console.log(text);
                return <img className='img-product' style={{ width: '100px' }} src={logoOrange} alt='cart'></img>
            },

        },
        {
            width: 100,
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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'name',
        },
        {
            width: 100,
            title: 'Total',
            dataIndex: 'totalPrice',
            key: 'name',
        },
        {
            width: 100,
            title: 'Actions',
            render: () => {
                return (
                    <>
                        <Tooltip title="Delete" >
                            <Button><DeleteOutlined style={{ color: 'red' }} /></Button>
                        </Tooltip>
                        <Tooltip title="Add To Card">
                            <Button style={{ marginLeft: '8px' }}><ShoppingCartOutlined style={{ color: 'blue' }} /></Button>
                        </Tooltip>
                    </>
                )
            },
        },
    ]

    const cart = [
        {
            key: '1',
            product: 'img',
            nameProduct: 'ABCCC',
            price: '$200',
            quantity: '9',
            totalPrice: '$1800',
        },
        {
            key: '2',
            product: 'img',
            nameProduct: 'ABCCC',
            price: '$200',
            quantity: '9',
            totalPrice: '$1800',
        },
        {
            key: '3',
            product: 'img',
            nameProduct: 'ABCCC',
            price: '$200',
            quantity: '9',
            totalPrice: '$1800',
        },
        {
            key: '4',
            product: 'img',
            nameProduct: 'ABCCC',
            price: '$200',
            quantity: '9',
            totalPrice: '$1800',
        },

    ]
    return (
        <>
            {/* style={{ display:'flex', alignItems:'center', justifyContent:'center', color: '#ee4d2d' }} */}
            <Row gutter={[0, 16]}>
                <Col span={10} offset={10} >
                <Typography.Title>WISH LIST</Typography.Title>
                </Col>
                <Col xs={xs} sm={sm} md={md} lg={lg}>
                    {/* style={{ backgroundColor: 'red', width: '100%', height: '100vh' }} */}
                    <div className='wishList__table' >
                        <Table dataSource={cart} columns={columns} scroll={{ x: 500, y: 300 }} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default WishListPage