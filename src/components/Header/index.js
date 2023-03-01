
import { FacebookOutlined, HeartOutlined, InstagramOutlined, LoginOutlined, LogoutOutlined, ShoppingCartOutlined, TwitterOutlined, UserAddOutlined, YoutubeOutlined, MenuOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons/lib/icons'
import { Avatar, Badge, Col, Divider, Drawer, Input, Popover, Row, Table } from 'antd'
import './Header.scss'
import '../../styles/Responsive.scss'

import logoOrange from '../../assets/images/logo-orange.png'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE_URL } from '../../constants/routingUrl'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actLogout } from '../../redux/features/User/userSlice'

const xs = { span: 24, offset: 0 }
const sm = { span: 24, offset: 0 }
const md = { span: 12, offset: 6 }
const lg = { span: 12, offset: 6 }

const HeaderCpn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [cart, setCart] = useState([])
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const isLogged = useSelector(state => state.users.isLogged)
  const isAdmin = useSelector(state => state.users.user.isAdmin)
  const { user } = useSelector(state => state.users)
  const { listCart, totalCart } = useSelector(state => state.carts)
  const {totalWishList} = useSelector(state => state.wishList)

  const handleLogout = () => {
    dispatch(actLogout())

    navigate('/login')
  }

  useEffect(() => {
    setCart(listCart?.map((cart, index) => {
      return (
        {
          key: index,
          id: cart?.id,
          image: cart?.images[0],
          nameProduct: cart?.nameProduct,
          price: cart?.price,
          quantity: cart?.quantity,
          totalPrice: cart?.totalMoney,
        }
      )
    }))
  }, [listCart])

  const goDashboard = () => {
    navigate('/admin')
  }

  const handleChangeInputSearch = (e) => {
    console.log(e.target.value);
  }


  const columns = [
    {
      with: 20000,
      title: 'Product',
      dataIndex: 'image',
      key: 'key',
      render: (image) => {
        return <img className='img-product' style={{ width: '50px' }} src={image} alt='cart'></img>
      },

    },
    {
      with: 20000,
      height: '1500px',
      title: 'Name',
      dataIndex: 'nameProduct',
      key: 'name',
    },
    {
      with: 20000,
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ]

  const content = (
    <div className='header__user'>
      {isAdmin && (
        <>
          <span onClick={goDashboard}><DashboardOutlined /> Dashboard</span>
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
      <div className='header__user--'>
        <Table pagination={false} dataSource={cart} columns={columns} />
      </div>
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
                  onChange={handleChangeInputSearch}
                />
              </Col>
            </Row>
          </div>
          <div className='header__main--btn'>

            <span >
              <Link to={ROUTE_URL.WISHLIST}>
                <Badge style={{}} count={totalWishList}><HeartOutlined style={{ fontSize: '20px' }} /></Badge>
                <div>WishList</div>
              </Link>
            </span>
            <span style={{ marginLeft: '32px' }}>
              <Link to={ROUTE_URL.CART}>
                <Popover
                  overlayInnerStyle={{
                    width: '500px',
                  }} content={contentCart} placement="bottomRight" >
                  <Badge count={totalCart}><ShoppingCartOutlined style={{ fontSize: '20px' }} /></Badge>
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
                      {user?.fullname}
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



