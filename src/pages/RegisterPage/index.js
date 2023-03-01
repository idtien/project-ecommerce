import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Input, Row } from 'antd'
import { ToastContainer, toast } from 'react-toastify'

import { ROUTE_URL } from '../../constants/routingUrl'
import { actRegister } from '../../redux/features/User/userSlice'

import logoLogin2 from '../../assets/images/logo_part2.png'
import './RegisterPage.scss'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLogged, isRegister } = useSelector(state => state.users)

    const [formRegister, setFormRegister] = useState({
        username: '',
        password: '',
        phone: '',
        email: '',
        address: '',
        fullname: '',
        isAdmin: false
    })

    const handleChangeFormRegister = (e) => {
        const { name, value } = e.target
        setFormRegister({
            ...formRegister,
            [name]: value
        })
    }
    console.log('register: ', isRegister);

    useEffect(() => {
        if (isLogged) {
            navigate('/')
        }
    })

    const handleRegister = (e) => {
        dispatch(actRegister(formRegister))
    }

    if (isLogged) return null


    return (
        <>
            <ToastContainer />
            <Row>
                <Col span={24}>
                    <div className='form__register'>
                        <Row>
                            <Col className='form__register--logo' span={12}>
                                <img src={logoLogin2} alt='logo_login' />
                                <p>Favorite E-Commerce Platform in Southeast Asia & Taiwan</p>
                            </Col>
                            <Col className='form__register--input' span={12}>
                                <Form className='form__register--input2'
                                    name="basic"
                                    labelCol={{
                                        span: 24,
                                    }}
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    autoComplete="off"
                                >
                                    <h2>REGISTER</h2>
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder="Username"
                                            allowClear
                                            name='username'
                                            value={formRegister.username}
                                            onChange={handleChangeFormRegister} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder="Password"
                                            allowClear
                                            name='password'
                                            value={formRegister.password}
                                            onChange={handleChangeFormRegister} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Comfirm Password"
                                        name="confirmPassword"
                                        dependencies={['password']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder="Comfirm Password"
                                            allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone Number"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your phone number!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder="Phone Number"
                                            allowClear
                                            name='phone'
                                            value={formRegister.phone}
                                            onChange={handleChangeFormRegister} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your email!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder="Email address"
                                            allowClear
                                            name='email'
                                            value={formRegister.email}
                                            onChange={handleChangeFormRegister} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your address!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder="Your Address"
                                            allowClear
                                            name='address'
                                            value={formRegister.address}
                                            onChange={handleChangeFormRegister} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Full Name"
                                        name="fullname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter full name!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder="Full Name"
                                            allowClear
                                            name='fullname'
                                            value={formRegister.fullname}
                                            onChange={handleChangeFormRegister} />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <div className='form__register--btns'>
                                            <Button type="primary" htmlType='submit' onClick={handleRegister}>
                                                Submit
                                            </Button>
                                            <Button type="link">

                                                <Link to={ROUTE_URL.LOGIN}>You have a account? Login</Link>
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default RegisterPage