import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, Modal, Radio, Row, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import './CartPage.scss'
import logoOrange from '../../assets/images/logo_part2_orange.png'
import AcceptPayment from '../../components/AcceptPayment'
import { Link } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'


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
                        <Button><DeleteOutlined style={{ color: 'red' }} /></Button>
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

    const [acceptPayment, setAcceptPayment] = useState(false)
    return (
        <>
            <Row gutter={[0, 16]}>
                <Col span={6} offset={9} >
                    <Typography.Title>CART</Typography.Title>
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
                            <Button onClick={() => { setAcceptPayment(true) }}>Order</Button>
                            <Button>Continued Shopping</Button>
                        </div>
                    </div>
                </Col>

                {acceptPayment && <Modal
                    // title="Please Enter Your Information"
                    centered
                    onOk={() => setAcceptPayment(false)}
                    onCancel={() => setAcceptPayment(false)}
                    open={acceptPayment}
                    width={600}
                >
                    <Form className='form__register--input2'
                        name="basic"
                        labelCol={{
                            span: 24
                        }}
                        wrapperCol={{
                            span: 24
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 style={{ textAlign: 'center' }}>Purchase Confirmation</h2>
                        <Form.Item
                            label="Full Name"
                            name="fullname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter full name!',
                                },
                            ]}
                        >
                            <Input placeholder="Full Name" />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Phone Number" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!',
                                },
                            ]}
                        >
                            <Input placeholder="Email address" />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your address!',
                                },
                            ]}
                        >
                            <Input placeholder="Your Address" />
                        </Form.Item>



                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                                placeholder="Type some description"
                            />
                        </Form.Item>
                    </Form>
                </Modal>}
            </Row>
        </>
    )
}

export default CartPage