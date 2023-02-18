
import { FacebookOutlined, HeartOutlined, InstagramOutlined, LoginOutlined, ShoppingCartOutlined, TwitterOutlined, UserAddOutlined, YoutubeOutlined, MenuOutlined } from '@ant-design/icons/lib/icons'
import { Badge, Col, Divider, Drawer, Input, Row } from 'antd'
import './Header.scss'
import '../../styles/Responsive.scss'

import logoBlack from '../../assets/images/logo-black.png'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../../constants/routingUrl'
import { useState } from 'react'

const xs = { span: 24, offset: 0 }
const sm = { span: 24, offset: 0 }
const md = { span: 12, offset: 6 }
const lg = { span: 12, offset: 6 }

const HeaderCpn = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

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
            <Link to={ROUTE_URL.REGISTER}><span><UserAddOutlined /> Register</span></Link>
            <Link to={ROUTE_URL.LOGIN}><span style={{ marginLeft: '8px' }}> <LoginOutlined />  Login</span></Link>
          </div>
        </Col>
        <Divider className='header__divider' />

        <Col className='header__main' span={24}>
          <div className='header__main--logo'>
            <img src={logoBlack} style={{ width: '150px', height: '40px' }} alt='logo' />
            {/* <span >SHOPPING ONLINE</span> */}
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
            <span>
              <Link to={ROUTE_URL.WISHLIST}>
                <Badge style={{}} count={5}><HeartOutlined style={{ fontSize: '20px' }} /></Badge>
                <div>WishList</div>
              </Link>
            </span>
            <span style={{ marginLeft: '16px' }}>
              <Link to={ROUTE_URL.CART}>
                <Badge count={5}><ShoppingCartOutlined style={{ fontSize: '20px' }} /></Badge>
                <div>
                  Card
                </div>
              </Link>
            </span>
          </div>
          <div className='header__main--bars' onClick={() => setVisibleDrawer(true)}>
            <MenuOutlined />
          </div>
        </Col>
      </Row>
      {/* <Divider className='header__divider' /> */}
      {/* <hr/> */}
      <div className='header__menu--wrap'>
        <Col className='header__menu' xs={xs} sm={sm} md={md} lg={lg} >
          <ul className='header__menu--list'>
            <li className='header__menu--active'><Link to={ROUTE_URL.HOME}>Home</Link></li>
            <li><Link to={ROUTE_URL.SHOP}>Shop</Link></li>
            <li><Link to={ROUTE_URL.PRODUCT}>Product</Link></li>
            <li><Link to={ROUTE_URL.ABOUT}>About</Link></li>
          </ul>
        </Col>
      </div>
      
        <Drawer
          title='SHOP MALL'
          placement='right'
          onClose={() => setVisibleDrawer(false)}
          open={visibleDrawer}
        >
          <div className='header__menu--drawer'>
          <Col className='header__menu' xs={xs} sm={sm} md={md} lg={lg} >
            <div className='header__menu--draw'>
              <ul className='header__menu--list'>
                <li className='header__menu--active'><Link to={ROUTE_URL.HOME}>Home</Link></li>
                <li><Link to={ROUTE_URL.SHOP}>Shop</Link></li>
                <li><Link to={ROUTE_URL.ABOUT}>About</Link></li>
                <li><Link to={ROUTE_URL.PRODUCT}>Product</Link></li>
              </ul>
            </div>
          </Col>
          </div>
        </Drawer>

    </>
  )
}

export default HeaderCpn



