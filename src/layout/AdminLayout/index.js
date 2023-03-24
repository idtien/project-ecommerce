import { AppstoreOutlined, HomeOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Divider, Input, Menu, Popover, Row } from 'antd'
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import FooterCpn from '../../components/Footer'

import { ROUTE_URL } from '../../constants/routingUrl'
import logo from '../../assets/images/logo-orange.png'
import './AdminLayout.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actLogout } from '../../redux/features/User/userSlice'
import { ToastContainer } from 'react-toastify'


const AdminLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)

    const handleLogout = () => {
        dispatch(actLogout())
        navigate('/login')
      }

    useEffect(() => {
        if (Object.values(user).length === 0) return
        if (!user.isAdmin) {
            navigate('/error')
        }
    }, [user])

    if (Object.values(user).length === 0 || !user.isAdmin) return null
    
    const content = (
        <div className='header__user'>
            <Link to={ROUTE_URL.HOME}>
                <p> <HomeOutlined /> Home</p>
            </Link>
            <hr />
            <Link to={ROUTE_URL.PROFILE_USER}>
                <p> <UserOutlined /> Profile</p>
            </Link>
            <hr />
            <Link to={ROUTE_URL.LOGIN}>
                <p onClick={handleLogout}><LogoutOutlined /> Logout</p>
            </Link>
        </div>
    )


    return (
        <>
        <ToastContainer/>
            <Row className='admin'>
                <Col span={4}>
                    <div className='admin__menu'>
                        <div className='admin_menu--logo'>
                            <Link to={ROUTE_URL.HOME}>
                                <img src={logo} style={{ width: '200px' }} alt='img' />
                            </Link>
                        </div>
                        <Divider />
                        <div className='admin__menu--menu'>
                            <Menu
                                onClick={({ key }) => {
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
                            <Popover content={content} placement="bottomRight" >
                                <span>
                                    <Avatar
                                    src='https://joesch.moe/api/v1/random?key=1'
                                        style={{
                                            backgroundColor: 'red',
                                            verticalAlign: 'right',
                                        }}
                                        size={50}
                                    // gap={gap}
                                    >
                                        {user?.fullname}
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