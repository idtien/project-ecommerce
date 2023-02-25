import React from 'react'
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Row, Space, Statistic, Table, Tag, Typography } from 'antd'

import {
    data,
    options,
    data2,
    options2,
    data3,
    dataTable,
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
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)
ChartJS.register(ArcElement)



const DashboardAdmin = () => {
    const columnsTable = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href='#'>{text}</a>,
        },
        {
            title: 'Name Product',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
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
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: (_, { type }) => (
                <>
                    {type.map((type) => {
                        let color
                        if (type === 'preparing') {
                            color = '#faad14'
                        }
                        else if (type === 'delivering') {
                            color = '#69b1ff';
                        } else if (type === 'success') {
                            color = '#52c41a'
                        } else {
                            color = '#f5222d'
                        }

                        return (
                            <Tag color={color} key={type}>
                                {type.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Space>
            ),
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
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<DollarCircleOutlined />} style={{ backgroundColor: '#95de64' }} />
                                    <Statistic title='Revenue' value='15.230 USD' />
                                </Space>
                            </Card>
                        </Space>
                    </div>
                    <Divider />
                    <div className='dashboard_orderStatus'>
                        <Typography.Title level={4}>Order Status</Typography.Title>
                        <Table columns={columnsTable} dataSource={dataTable} />
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
                        <Divider />
                        <Typography.Title>Circle:</Typography.Title>
                        <Pie
                            style={{ width: '100px', height: '100px' }}
                            data={data3}
                        >
                        </Pie>

                    </div>
                </Col>
            </Row>

        </>
    )
}

export default DashboardAdmin