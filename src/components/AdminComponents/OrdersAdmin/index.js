
import { DeleteOutlined, EditOutlined, ExclamationCircleTwoTone } from '@ant-design/icons'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteOrderByID, fetchAllOrders } from '../../../redux/features/Order/orderSlice'
import EditOrders from '../EditOrders'

const OrdersAdmin = () => {
    const dispatch = useDispatch()

    const [dataOrders, setDataOrders] = useState([])
    const [editOrders, setEditOrders] = useState(false)
    const [idOrder, setIdOrder] = useState()
    const [confirmDeleteOrder, setConfirmDeleteOrder] = useState(false)
    const [search, setSearch] = useState("")


    // const [showFormEditOrder, setShowFormEditOrder] = useState(false)

    const { allOrders } = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [])

    useEffect(() => {
        setDataOrders(allOrders?.map((ordersMap, index) => {
            return (
                {

                    key: index,
                    receiverOfName: ordersMap?.receiverOfName,
                    phone: ordersMap?.phone,
                    address: ordersMap?.address,
                    description: ordersMap?.description,
                    codeOrder: ordersMap?.codeOrder,
                    idUser: ordersMap?.idUser,
                    cart: ordersMap?.cart,
                    totalMoney: ordersMap?.totalMoney,
                    totalMoneySale: ordersMap?.totalMoneySale,
                    paymentMethod: ordersMap?.paymentMethod,
                    status: ordersMap?.status,
                    orderAt: ordersMap?.orderAt,
                    id: ordersMap?.id,
                }
            )
        }))
    }, [allOrders])

    const handleShowFormEdit = (id) => {
        setEditOrders(true)
        setIdOrder(id)
        console.log(idOrder, 'edit');
    }

    const handleShowFormDelete = (id) => {
        setConfirmDeleteOrder(true)
        setIdOrder(id)
        console.log(idOrder, 'delete');

    }

    const handleDeleteOrder = () => {
        dispatch(actDeleteOrderByID(idOrder))
        setConfirmDeleteOrder(false)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'receiverOfName',
            key: 'receiverOfName',
            filteredValue: [search],
            onFilter: (value, record) => {
                return String(record.receiverOfName).toLowerCase().includes(value.toLowerCase()) || 
                String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
                String(record.status).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Orders',
            dataIndex: 'cart',
            key: 'cart',
            render: (cart) => {
                return cart?.map((cart, index) => {
                    return <p key={index}>
                        {cart?.name}  <Tag>
                            x {cart.quantity}
                        </Tag>
                    </p>
                })
            }
        },
        {
            title: 'Order At',
            dataIndex: 'orderAt',
            key: 'orderAt'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color
                if (status === 'waiting') {
                    color = '#faad14'
                }
                else if (status === 'preparing') {
                    color = '#eb2f96';
                } else if (status === 'delivering') {
                    color = '#69b1ff';
                }
                else if (status === 'success') {
                    color = '#52c41a'
                } else {
                    color = '#f5222d'
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                )
            },
            filters: [
                { text: 'Waiting', value: 'waiting' },
                { text: 'Preparing', value: 'preparing' },
                { text: 'Delivering', value: 'delivering' },
                { text: 'Success', value: 'success' },
                { text: 'Failed', value: 'failed' },
            ],
            onFilter: (value, record) => {
                return record.status === value
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (order) => {
                return (
                    <Space size="middle">
                        <Tooltip title="Edit" >
                            <Button>
                                <EditOutlined style={{ color: '#4096ff' }}
                                    onClick={() => handleShowFormEdit(order.id)}
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete" >
                            <Button>
                                <DeleteOutlined
                                    style={{ color: '#f5222d' }}
                                    onClick={() => handleShowFormDelete(order.id)}
                                />
                            </Button>
                        </Tooltip>
                    </Space>
                )
            }
        },
    ];


    return (
        <>
            <Row>
                <Col span={12}>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Orders</Typography.Title>
                        <Input.Search
                            placeholder='Search...'
                            size='large'
                            onSearch={(value) => {
                                setSearch(value)
                            }}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            allowClear

                        />
                        <Table columns={columns} dataSource={dataOrders} />
                    </div>
                </Col>
            </Row>
            {editOrders && <EditOrders
                id={idOrder}
                open={editOrders}
                onClick={() => setEditOrders(false)} />
            }
            {confirmDeleteOrder && (
                <Modal title="Notification" open={confirmDeleteOrder}
                    footer={null}>
                    <div className='cart__confirm'>
                        <Space>
                            <ExclamationCircleTwoTone style={{ fontSize: '30px' }} />
                            <Typography.Title level={4}>Are you sure to Delete Order?</Typography.Title>
                        </Space>
                    </div>

                    <Space>
                        <Button type='primary' htmlType='submit' onClick={handleDeleteOrder}>Delete</Button>
                        <Button type='dashed' onClick={() => setConfirmDeleteOrder(false)}>Cancel</Button>
                    </Space>
                </Modal>
            )}
        </>
    )
}

export default OrdersAdmin