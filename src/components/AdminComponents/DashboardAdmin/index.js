import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Space, Statistic, Typography } from 'antd'
import React from 'react'

const DashboardAdmin = () => {
    return (
        <>
            <Row>
                <Col>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Dashboard</Typography.Title>
                        <Space direction='horizontal'>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<ShoppingCartOutlined />} style={{backgroundColor: '#91caff'}} />
                                    <Statistic title='Orders' value='5.482' />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<UserOutlined />} style={{backgroundColor: '#ffc53d'}} />
                                    <Statistic title='Customer' value='12.992' />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<ShoppingOutlined />} style={{backgroundColor:'#ff4d4f'}} />
                                    <Statistic title='Inventory' value='2.031' />
                                </Space>
                            </Card>
                            <Card>
                                <Space>
                                    <Avatar size={64} icon={<DollarCircleOutlined />} style={{backgroundColor: '#95de64'}} />
                                    <Statistic title='Revenue' value='15.230 USD' />
                                </Space>
                            </Card>
                        </Space>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DashboardAdmin