import React, { useEffect, useState } from 'react'
import { DeleteOutlined, DollarCircleOutlined, EditOutlined, ExclamationCircleTwoTone, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Modal, Row, Space, Statistic, Table, Tag, Typography } from 'antd'
import useGoToTop from '../../../hooks/useGoToTop'
import {
    data,
    options,
    data2,
    options2,
} from './data'


import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteOrderByID, fetchAllOrders } from '../../../redux/features/Order/orderSlice'
import EditOrders from '../EditOrders'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)
ChartJS.register(ArcElement)



const DashboardAdmin = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const [editOrders, setEditOrders] = useState(false)
    const [idOrder, setIdOrder] = useState()
    const [confirmDeleteOrder, setConfirmDeleteOrder] = useState(false)



    const [dataOrders, setDataOrders] = useState([])
    // const [filterStatusOrder, setFilterStatusOrder] = useState([])
    const { allOrders, isOrder } = useSelector(state => state.orders)

    const filterStatusOrder = []
    for (let i = 0; i < dataOrders.length; i++) {
        if (dataOrders[i]?.status === 'waiting') {
            filterStatusOrder.push(dataOrders[i])
        }
    }


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
    const columnsTable = [
        {
            title: 'Name',
            dataIndex: 'receiverOfName',
            key: 'receiverOfName',
        },
        {
            title: 'Orders',
            dataIndex: 'cart',
            key: 'cart',
            render: (cart) => {
                return cart?.map((cart, index) => {
                    return <p key={index}>
                        {cart?.name}  <Tag >
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
                else if (status === 'delivering') {
                    color = '#69b1ff';
                } else if (status === 'success') {
                    color = '#52c41a'
                } else {
                    color = '#f5222d'
                }
                return (
                    <Tag color={color} key={status}>
                        {status?.toUpperCase()}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (order) => {
                return (
                    <Space size="middle">
                        <Button>
                            <EditOutlined style={{ color: '#4096ff' }}
                                onClick={() => handleShowFormEdit(order.id)}
                            />
                        </Button>
                        <Button>
                            <DeleteOutlined
                                style={{ color: '#f5222d' }}
                                onClick={() => handleShowFormDelete(order.id)}
                            />
                        </Button>
                    </Space>
                )
            }
        },
    ]

    return (
        <>
            <Row>
                <Col>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Dashboard</Typography.Title>
                        <Space direction='horizontal'>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<ShoppingCartOutlined />} style={{ backgroundColor: '#91caff' }} />
                                    <Statistic title='Orders' value='5.482' />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#ffc53d' }} />
                                    <Statistic title='Customer' value='12.992' />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<ShoppingOutlined />} style={{ backgroundColor: '#ff4d4f' }} />
                                    <Statistic title='Inventory' value='2.031' />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<DollarCircleOutlined />} style={{ backgroundColor: '#95de64' }} />
                                    <Statistic title='Revenue' value='15.230 USD' />
                                </Space>
                            </Card>
                            {/* <Card>
                                <Space>
                                    <Avatar size={64} icon={<DollarCircleOutlined />} style={{ backgroundColor: '#95de64' }} />
                                    <Statistic title='Revenue' value='15.230 USD' />
                                </Space>
                            </Card> */}
                        </Space>
                    </div>
                    <Divider />
                    <div className='dashboard_orderStatus'>
                        <Typography.Title level={4}>Order Status</Typography.Title>
                        <Table columns={columnsTable} dataSource={filterStatusOrder} />
                    </div>

                    <div className='dashboard_chart'>
                        <Divider />
                        <Typography.Title>MONTHS 2022</Typography.Title>
                        <Bar
                            data={data}
                            options={options}
                        >
                        </Bar>
                        <Divider />
                        <Typography.Title>Year: 2018-2023</Typography.Title>
                        <Bar
                            data={data2}
                            options={options2}
                        >
                        </Bar>
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

export default DashboardAdmin