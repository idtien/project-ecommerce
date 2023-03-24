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
import { fetchAllUser } from '../../../redux/features/User/userSlice'
import { fetchAllProduct } from '../../../redux/features/Product/productSlice'

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
    const { allOrders } = useSelector(state => state.orders)
    const {allUser } = useSelector(state => state.users)
    const { allProduct } = useSelector(state => state.products)
console.log(allUser, 'hi');
    const [dataChart, setDataChart] = useState({
        technological: 0,
        clothes: 0,
        jewelry: 0,
        other: 0
    })

    const [labelDataChartDate, setLabelDataChartDate] = useState([])
    const [dataChart2, setDataChart2] = useState({
        technological: [653215429, 552365864, 863215986, 745896212, 631542368, 965212356],
        clothes: [421563286, 475123685, 751243623, 865421352, 965121235, 675412586],
        jewelry: [254856325, 348756232, 452365236, 445876269, 623541235, 754268321]
    })

    const revenueShop = dataChart?.technological + dataChart?.clothes + dataChart?.jewelry

    const filterStatusOrder = []
    for (let i = 0; i < dataOrders.length; i++) {
        if (dataOrders[i]?.status === 'waiting') {
            filterStatusOrder.push(dataOrders[i])
        }
    }


    useEffect(() => {
        document.title = `SHOP MALL - Dashboard`;
    }, []);

    useEffect(() => {
        dispatch(fetchAllOrders())
        dispatch(fetchAllUser())
        dispatch(fetchAllProduct())
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

        const orderArr = []
        const orderAtArr = []
        let newOrderAtArr = []

        for (const order of allOrders) {
            order?.cart?.map(data => {
                return orderArr.push(data)
            })
            // const date = new Date(order.orderAt)
            // orderAtArr.push(date.getDate())
            orderAtArr.push(order.orderAt)
        }

        newOrderAtArr = orderAtArr.filter(day => {
            return newOrderAtArr.includes(day) ? '' : newOrderAtArr.push(day)
        })

        setLabelDataChartDate([
            ...newOrderAtArr
        ])


        const orderClothesArr = []
        const orderTechArr = []
        const orderJewelryArr = []

        for (let i = 0; i < orderArr.length; i++) {
            if (orderArr[i]?.category === 'clothes') {
                const totalClothes = orderArr[i]?.priceSale * orderArr[i]?.quantity
                orderClothesArr.push(totalClothes)
            } else if (orderArr[i]?.category === 'technological') {
                const totalClothes = orderArr[i]?.priceSale * orderArr[i]?.quantity
                orderTechArr.push(totalClothes)
            } else if (orderArr[i]?.category === 'jewelry') {
                const totalClothes = orderArr[i]?.priceSale * orderArr[i]?.quantity
                orderJewelryArr.push(totalClothes)
            }
        }

        const totalClothes = orderClothesArr?.reduce((total, price) => {
            total += price
            return total;
        }, 0)

        const totalTech = orderTechArr?.reduce((total, price) => {
            total += price
            return total;
        }, 0)
        const totalJewelry = orderJewelryArr?.reduce((total, price) => {
            total += price
            return total;
        }, 0)

        setDataChart({
            ...dataChart,
            technological: totalTech,
            clothes: totalClothes,
            jewelry: totalJewelry
        })

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
            key: 'orderAt',
            render: (order) => {
                const date = new Date(order)
                return <p>{`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`}</p>
            }
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

    const data = {
        // ['Technological', 'Clothes', 'Jewelry', 'Other']
        labels: ['Revenue'],
        datasets: [
            {
                label: 'Technological',
                data: [dataChart?.technological],
                backgroundColor: ['#ff4d4f'],
            },
            {
                label: 'Clothes',
                data: [dataChart?.clothes],
                backgroundColor: ['#faad14'],
            },
            {
                label: 'Jewelry',
                data: [dataChart?.jewelry],
                backgroundColor: ['#95de64'],
            }
        ],
    }

    const options = {
        scales: {

            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Revenue',
                    color: 'red',
                }
            }
        }
    }

    // const 
    const data2 = {
        labels: labelDataChartDate,
        datasets: [
            {
                label: 'Technological',
                data: [...dataChart2?.technological],
                backgroundColor: '#ff4d4f',
            },
            {
                label: 'Clothes',
                data: [...dataChart2?.clothes],
                backgroundColor: '#faad14',
            },
            {
                label: 'Jewelry',
                data: [...dataChart2?.jewelry],
                backgroundColor: '#95de64',
            }
        ],
    }


    const options2 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days',
                    color: 'red'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Revenue',
                    color: 'red',
                }
            }
        }
    }


    console.log();

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
                                    <Statistic title='Orders' value={allOrders?.length} />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#ffc53d' }} />
                                    <Statistic title='Customer' value={allUser?.length} />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<ShoppingOutlined />} style={{ backgroundColor: '#ff4d4f' }} />
                                    <Statistic title='Products' value={allProduct?.length} />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<DollarCircleOutlined />} style={{ backgroundColor: '#95de64' }} />
                                    <Statistic title='Revenue' value={`${revenueShop} USD`} />
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
                        <Typography.Title>Revenue of all kinds of products</Typography.Title>
                        <Bar
                            data={data}
                            options={options}
                        >
                        </Bar>
                        <Divider />
                        <Typography.Title>Year</Typography.Title>
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