import React, { useEffect, useState } from 'react'
import { DeleteOutlined, ExclamationCircleOutlined, ExclamationCircleTwoTone, HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Divider, Form, Input, InputNumber, Modal, Radio, Row, Space, Table, Tag, Tooltip, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { actChangeQuantity, actClearCart, actDeleteCart } from '../../redux/features/Cart/cartSlice'
import './CartPage.scss'
import { actOrderProduct } from '../../redux/features/Order/orderSlice'
import { KEY_LIST_CART } from '../../constants/config'
import useGoToTop from '../../hooks/useGoToTop'
import { Link, useNavigate } from 'react-router-dom'

const xs = { span: 24, offset: 0 }
const sm = { span: 24, offset: 0 }
const md = { span: 24, offset: 1 }
const lg = { span: 17, offset: 1 }


const CartPage = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [confirmBuy, setConfirmBuy] = useState(false)
    const [acceptPayment, setAcceptPayment] = useState(false)
    const { user, isLogged } = useSelector(state => state.users)
    const { listCart, totalCart } = useSelector(state => state.carts)
    const idUser = user?.id
    const handleChangeFormOrder = (e) => {
        const { name, value } = e.target
        setFormOrders({
            ...formOrders,
            [name]: value
        })
    }

    useEffect(() => {
        setCart(listCart?.map((cartMap, index) => {
            return (
                {
                    key: index,
                    id: cartMap?.id,
                    image: cartMap?.images[0],
                    nameProduct: cartMap?.name,
                    price: cartMap?.price,
                    priceSale: cartMap?.priceSale,
                    category: cartMap?.category,
                    quantity: cartMap?.quantity
                }
            )
        }))
    }, [listCart])


    const handleDeleteCart = (product) => {
        dispatch(actDeleteCart(product))
    }

    const handleChangeQuantity = (value, quantity) => {
        const dataChange = { value, quantity }
        dispatch(actChangeQuantity(dataChange))
    }

    const handlePayment = () => {
        if (listCart.length <= 0) {
            toast.warn('There are no products in the cart!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setAcceptPayment(false)
            return
        }

        if (isLogged) {
            setAcceptPayment(true)
        } else {
            toast.warn('Please Loggin to payment!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const totalMoney = cart?.reduce((total, product) => {
        total += product?.price * product?.quantity
        return total;
    }, 0)

    const totalMoneySale = cart?.reduce((total, product) => {
        total += product?.priceSale * product?.quantity
        return total;
    }, 0)

    const [formOrders, setFormOrders] = useState({
        receiverOfName: '',
        phone: '',
        address: '',
        description: '',
        codeOrder: uuidv4(),
        idUser: idUser,
        cart: listCart,
        totalMoney: listCart?.reduce((total, product) => {
            total += product?.price * product?.quantity
            return total
        }, 0),
        totalMoneySale: listCart?.reduce((total, product) => {
            total += product?.priceSale * product?.quantity
            return total;
        }, 0),
        paymentMethod: 'whenReceive'
    })

    const handleCheckFillInfo = (formOrders) => {
        setConfirmBuy(true)
    }

    const handleConfirmBuy = () => {
        dispatch(actOrderProduct(formOrders))
        setConfirmBuy(false)
        setAcceptPayment(false)
        dispatch(actClearCart())
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
            width: 400,
            title: 'Name',
            dataIndex: 'nameProduct',
            key: 'name',
            render: (_, record) => {
                console.log(record, 'record');
                return <Link to={`/products/${record?.id}`}>{record.nameProduct}</Link>
            }
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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'name',
            render: (_, quantity) => {
                return <InputNumber min={1} max={999} defaultValue={quantity.quantity}
                    onChange={(value) => {
                        handleChangeQuantity(value, quantity)
                    }}
                />
            }

        },
        {
            width: 100,
            title: 'Actions',
            render: (product) => {
                return (
                    <Tooltip title="Delete" >
                        <Button><DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteCart(product)} /></Button>
                    </Tooltip>
                )
            },
        },
    ]
    return (
        <>
            <ToastContainer />
            <Row gutter={[0, 16]} className='cart'>
                <Col span={6} offset={2} >
                    <Breadcrumb >
                        <Breadcrumb.Item className='cart__breadcrumb'>
                            <HomeOutlined />
                        </Breadcrumb.Item>

                        <Breadcrumb.Item className='cart__breadcrumb'>Cart</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col xs={xs} sm={sm} md={md} lg={lg}>
                    <div className='cart__table' >
                        <Table dataSource={cart} columns={columns} scroll={{ x: 500, y: 5500 }} />
                    </div>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 5, offset: 0 }}>
                    <div className='cart__total'>
                        <h3>Cart Total: {totalMoney} USD</h3>
                        <Divider />
                        <div className='card__total--sub'>
                            Subtotal: {totalMoneySale} USD
                        </div>
                        <Divider />
                        <div className='card__total--payment'>Payment:</div>
                        <Radio.Group
                            name='radiogroup'
                            defaultValue={1}
                        >
                            <Radio className='card__total--select' value={1}>When reciving</Radio>
                            <Radio className='card__total--select' disabled value={2}>Online</Radio>
                        </Radio.Group>
                        <Divider />
                        <div className='cart__total--submit' >
                            <Button onClick={handlePayment}>Order</Button>
                            <Button>Continued Shopping</Button>
                        </div>
                    </div>
                </Col>

                {acceptPayment && (
                    <Modal
                        centered
                        open={acceptPayment}
                        width={600}
                        footer={null}
                        onCancel={() => setAcceptPayment(false)}
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
                            autoComplete="off"
                            onFinish={handleCheckFillInfo}

                        >
                            <h2 style={{ textAlign: 'center' }}>Purchase Confirmation</h2>
                            <Form.Item
                                label="Receiver's Name"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter full name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Receiver's Name"
                                    allowClear
                                    name='receiverOfName'
                                    value={formOrders.receiverOfName}
                                    onChange={handleChangeFormOrder}
                                />
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
                                <Input
                                    placeholder="Phone Number"
                                    allowClear
                                    name='phone'
                                    value={formOrders.phone}
                                    onChange={handleChangeFormOrder}
                                />
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
                                <Input
                                    placeholder="Your Address"
                                    allowClear
                                    name='address'
                                    value={formOrders.address}
                                    onChange={handleChangeFormOrder}
                                />
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
                                    allowClear
                                    name='description'
                                    value={formOrders.description}
                                    onChange={handleChangeFormOrder}
                                />
                            </Form.Item>

                            <Space>
                                <Button type='primary' htmlType='submit' >Order</Button>
                                <Button type='dashed' onClick={() => setAcceptPayment(false)}>Cancel</Button>
                            </Space>
                        </Form>
                        {confirmBuy && (
                            <Modal title="Notification" open={confirmBuy}
                                footer={null}>
                                <div className='cart__confirm'>
                                    <Space>
                                        <ExclamationCircleTwoTone style={{ fontSize: '30px' }} />
                                        <Typography.Title level={4}>Are you sure to buy?</Typography.Title>
                                    </Space>
                                </div>

                                <Space>
                                    <Button type='primary' htmlType='submit' onClick={handleConfirmBuy}>Order</Button>
                                    <Button type='dashed' onClick={() => setConfirmBuy(false)}>Cancel</Button>
                                </Space>
                            </Modal>
                        )}
                    </Modal>
                )}

            </Row>

        </>
    )
}

export default CartPage