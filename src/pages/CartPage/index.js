import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Radio, Row, Table, Tag, Tooltip } from 'antd'
import React from 'react'
import './CartPage.scss'
import logoOrange from '../../assets/images/logo_part2_orange.png'


const xs = { span: 24, offset: 0 }
const sm = { span: 24, offset: 0 }
const md = { span: 24, offset: 1 }
const lg = { span: 17, offset: 1 }

const CartPage = () => {
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
                    <Tooltip title="Delete" >
                        <Button><DeleteOutlined style={{ color: 'red' }}  /></Button>
                    </Tooltip>
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
            <Row gutter={[0, 16]}>
                <Col span={22} offset={1} >
                    <Tag className='cart__tag' icon={<ShoppingCartOutlined />} >
                        List of products you want to buy
                    </Tag>
                </Col>
                <Col xs={xs} sm={sm} md={md} lg={lg}>
                    {/* style={{ backgroundColor: 'red', width: '100%', height: '100vh' }} */}
                    <div className='cart__table' >
                        <Table dataSource={cart} columns={columns} scroll={{ x: 500, y: 300 }} />
                    </div>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 5, offset: 0 }}>
                    <div className='cart__total'>
                        <h3>Cart Total: </h3>
                        <Divider />
                        <div className='card__total--sub'>
                            Subtotal:
                        </div>
                        <Divider />
                        <div className='card__total--payment'>Payment:</div>
                        <Radio.Group
                            name='radiogroup'
                            defaultValue={1}
                        >
                            <Radio className='card__total--select' value={1}>When reciving</Radio>
                            <Radio className='card__total--select' value={2}>Online</Radio>
                        </Radio.Group>
                        <Divider />
                        <div className='cart__total--submit' >
                            <Button>Submit</Button>
                            <Button>Back</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CartPage