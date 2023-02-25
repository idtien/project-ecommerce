
import { FacebookOutlined, HeartOutlined, InstagramOutlined, LoginOutlined, LogoutOutlined, ShoppingCartOutlined, TwitterOutlined, UserAddOutlined, YoutubeOutlined, MenuOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons/lib/icons'
import { Avatar, Badge, Col, Divider, Drawer, Input, Popover, Row, Table } from 'antd'
import './Header.scss'
import '../../styles/Responsive.scss'

import logoOrange from '../../assets/images/logo-orange.png'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE_URL } from '../../constants/routingUrl'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actLogout } from '../../redux/features/User/userSlice'

const xs = { span: 24, offset: 0 }
const sm = { span: 24, offset: 0 }
const md = { span: 12, offset: 6 }
const lg = { span: 12, offset: 6 }

const HeaderCpn = () => {

  const isLogged = useSelector(state => state.users.isLogged)
  const isAdmin = useSelector(state => state.users.user.isAdmin)
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(actLogout())

    navigate('/login')
  }

  const goDashboard = () => {
    navigate('/admin')
  }


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
    }
  ]

  const columns = [
    {
      width: 100,
      title: 'Product',
      dataIndex: 'product',
      key: 'name',
      render: (text) => {
        console.log(text);
        return <img className='img-product' style={{ width: '50px' }} src={logoOrange} alt='cart'></img>
      },

    },
    {
      width: 400,
      title: 'Name',
      dataIndex: 'nameProduct',
      key: 'name',
    },
    {
      width: 200,
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      width: 200,
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ]

  const content = (
    <div className='header__user'>
      {isAdmin && (
        <>
        <span href='' onClick={goDashboard}><DashboardOutlined /> Dashboard</span>
        <hr />
        </>
      )}
      
      <Link to={ROUTE_URL.PROFILE_USER}>
        <p> <UserOutlined /> Profile</p>
      </Link>
      <hr />
      <div onClick={handleLogout}><LogoutOutlined /> Logout</div>
    </div>
  )
  const contentCart = (
    <div className='header__user'>
      <Table pagination={false} dataSource={cart} columns={columns} />
    </div>
  )

  return (
    <>
      <Row id='header'>
        <Col className='header__top' span={24}>
          <div className='header__contact'> Contact with us
            <span > <FacebookOutlined /></span>
            <span > <InstagramOutlined /></span>
            <span > <YoutubeOutlined /></span>
            <span > <TwitterOutlined /></span>
          </div>
          <div className='header__contact2'>

            {!isLogged && (
              <>
                <Link to={ROUTE_URL.REGISTER}><span><UserAddOutlined /> Register</span></Link>
                <Link to={ROUTE_URL.LOGIN}><span style={{ marginLeft: '8px' }}> <LoginOutlined />  Login</span></Link>
              </>
            )}
          </div>
        </Col>
        <Divider className='header__divider' />
        <Col className='header__main' span={24}>
          <div className='header__main--logo'>
            <Link to={ROUTE_URL.HOME}>
              <img src={logoOrange} style={{ width: '150px', height: '40px' }} alt='logo' />
            </Link>
          </div>
          <div className='header__main--search'>
            <Row>
              <Col span={24}>
                <Input.Search
                  size="large"
                  allowClear
                  placeholder='Type to search'
                />
              </Col>
            </Row>
          </div>
          <div className='header__main--btn'>

            <span >
              <Link to={ROUTE_URL.WISHLIST}>
                <Badge style={{}} count={5}><HeartOutlined style={{ fontSize: '20px' }} /></Badge>
                <div>WishList</div>
              </Link>
            </span>
            <span style={{ marginLeft: '32px' }}>
              <Link to={ROUTE_URL.CART}>
                <Popover overlayStyle={{
                  width: '350px'
                }} content={contentCart} placement="bottomRight" >
                  <Badge count={5}><ShoppingCartOutlined style={{ fontSize: '20px' }} /></Badge>
                  <div>
                    Card
                  </div>
                </Popover>
              </Link>
            </span>
            {isLogged && (
              <>
                <Popover content={content} placement="bottomRight" >
                  <span style={{ marginLeft: '32px' }}>
                    <Avatar
                      style={{
                        backgroundColor: 'red',
                        verticalAlign: 'right',
                      }}
                      size="large"
                    // gap={gap}
                    >
                      HelloTien
                    </Avatar>
                  </span>
                </Popover>
              </>
            )}
          </div>
          <div className='header__main--bars' onClick={() => setVisibleDrawer(true)}>
            <MenuOutlined />
          </div>
        </Col>
      </Row>
      <div className='header__menu--wrap'>
        <Col className='header__menu' xs={xs} sm={sm} md={md} lg={lg} >
          <ul className='header__menu--list'>
            <li className='header__menu--active'><Link to={ROUTE_URL.HOME}>Home</Link></li>
            <li><Link to={ROUTE_URL.SHOP}>Shop</Link></li>
            <li><Link to={ROUTE_URL.CONTACT}>Contact</Link></li>
            <li><Link to={ROUTE_URL.ABOUT}>About</Link></li>
            <li><Link to={ROUTE_URL.ABOUT}>Posts</Link></li>
          </ul>
        </Col>
      </div>
      <Drawer
        title='SHOP MALL'
        placement='right'
        onClose={() => setVisibleDrawer(false)}
        open={visibleDrawer}
      >
        <Col className='header__menu' xs={xs} sm={sm} md={md} lg={lg} >
          <div className='header__menu--draw'>
            <ul className='header__menu--list'>
              <li className='header__menu--active'><Link to={ROUTE_URL.HOME}>Home</Link></li>
              <li><Link to={ROUTE_URL.SHOP}>Shop</Link></li>
              <li><Link to={ROUTE_URL.ABOUT}>About</Link></li>
              <li><Link to={ROUTE_URL.CONTACT}>Contact</Link></li>
              <li><Link to={ROUTE_URL.CONTACT}>Posts</Link></li>
            </ul>
          </div>
        </Col>
      </Drawer>
    </>
  )
}

export default HeaderCpn



