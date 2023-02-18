import { Col } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import logoLogin from '../../assets/images/logo-orange.png'
import './HeaderLogin.scss'

const HeaderLogin = () => {
    return (
        <Col span={16} offset={4}>
            <div className='header__login'>
                <Link to='/'><img className='header__login--img' src={logoLogin} alt='logo_login' /></Link>
                <div className='header__login--help'>Can i help you?</div>
            </div>
        </Col>
    )
}

export default HeaderLogin