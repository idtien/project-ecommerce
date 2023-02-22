import { AppstoreOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Divider, Input, Menu, Popover, Row, Space } from 'antd'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import FooterCpn from '../../components/Footer'
import AdminPage from '../../pages/AdminPage'

import { ROUTE_URL } from '../../constants/routingUrl'
import logo from '../../assets/images/logo-orange.png'
import './AdminLayout.scss'


const AdminLayout = () => {
    const content = (
        <div className='header__user'>
            <Link to={ROUTE_URL.PROFILE_USER}>
                <p> <UserOutlined /> Profile</p>
            </Link>
            <hr />
            <Link to={ROUTE_URL.LOGIN}>
                <p><LogoutOutlined /> Logout</p>
            </Link>
        </div>
    )

    const navigate = useNavigate()
    return (
        <>

            <Row className='admin'>
                <Col span={4}>
                    <div className='admin__menu'>
                        <div className='admin_menu--logo'>
                            <img src={logo} style={{ width: '200px' }} />
                        </div>
                        <Divider />
                        <div className='admin__menu--menu'>
                            <Menu
                                onClick={({key}) => {
                                    navigate(key)
                                }}
                                items={[
                                    {
                                        label: 'Dashboard',
                                        icon: <AppstoreOutlined />,
                                        key: `${ROUTE_URL.ADMIN}`,
                                        
                                    },
                                    {
                                        label: 'Products',
                                        icon: <ShopOutlined />,
                                        key: `${ROUTE_URL.ADMIN_PRODUCT}`,
                                    },
                                    {
                                        label: 'Orders',
                                        icon: <ShoppingCartOutlined />,
                                        key: `${ROUTE_URL.ADMIN_ORDER}`,
                                    },
                                    {
                                        label: 'Customer',
                                        icon: <UserOutlined />,
                                        key: `${ROUTE_URL.ADMIN_CUSTOMER}`
                                    },
                                ]}
                            >
                            </Menu>
                        </div>
                    </div>
                </Col>
                <Col span={16} offset={2}>
                    <div className='admin__main'>
                        <div className='admin__main--header'>
                            <Input.Search
                                size="large"
                                allowClear
                                placeholder='Type to search'
                                style={{ width: '500px' }}
                            />
                            <Popover content={content} placement="bottomRight" >
                                <span>
                                    <Avatar
                                        style={{
                                            backgroundColor: 'red',
                                            verticalAlign: 'right',
                                        }}
                                        size="large"
                                    // gap={gap}
                                    >
                                        Hello Tien
                                    </Avatar>
                                </span>
                            </Popover>
                        </div>
                        <Divider />
                    </div>
                    <Outlet />
                </Col>
            </Row>
            <FooterCpn />
        </>
    )
}

export default AdminLayout