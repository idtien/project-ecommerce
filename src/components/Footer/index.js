import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React from 'react'
import './Footer.scss'
import logo from '../../assets/images/logo.png'



const xs = { span: 12 }
const sm = { span: 12 }
const md = { span: 6 }
const lg = { span: 6 }

const FooterCpn = () => (
  <div>
    <Row id='footer'>
      <Col className='footer__menu' span={24}>
        <Row className='footer__menu-col'>
          <Col xs={xs} sm={sm} md={md} lg={lg}>
            {/* ShopMall */}
            <img src={logo} style={{ width: '100px', height: '30px' }} alt='logo' />

            <div>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
          </Col>
          <Col xs={xs} sm={sm} md={md} lg={lg} >
            SHOP
            <div>
              <a href='/'>Sell Online</a>
            </div>
            <div>
              <a href='/'>Features</a>
            </div>
            <div>
              <a href='/'>Examples</a>
            </div>
            <div>
              <a href='/'>Website editors</a>
            </div>
            <div>
              <a href='/'>Online retails</a>
            </div>

          </Col>
          <Col xs={xs} sm={sm} md={md} lg={lg}>
            PRESS
            <div>
              <a href='/'>Events</a>
            </div>
            <div>
              <a href='/'>News</a>
            </div>
            <div>
              <a href='/'>Awards</a>
            </div>
            <div>
              <a href='/'>Testimonials</a>
            </div>
            <div>
              <a href='/'>Online retails</a>
            </div>
          </Col>
          <Col xs={xs} sm={sm} md={md} lg={lg}>
            ABOUT
            <div>
              <a href='/'>Contact</a>
            </div>
            <div>
              <a href='/'>Services</a>
            </div>
            <div>
              <a href='/'>Teams</a>
            </div>
            <div>
              <a href='/'>Career</a>
            </div>
            <div>
              <a href='/'>About</a>
            </div>
          </Col>
        </Row>
      </Col>
      <Divider className='footer__divider' />
      {/* className='footer__social' */}
      <Col className='footer__social' span={24}>
        <div className='footer__social-content'>
        <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Code of Conduct</span>
        </div>
        <div className='footer__social-icons'>
          <span > <FacebookOutlined /></span>
          <span > <InstagramOutlined /></span>
          <span > <YoutubeOutlined /></span>
          <span > <TwitterOutlined /></span>
        </div>
      </Col>
      <Col className='footer__copyright' span={18} offset={4}>
        <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </div>
      </Col>
    </Row>
  </div>
)

export default FooterCpn