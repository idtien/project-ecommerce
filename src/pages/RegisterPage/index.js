import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'
import { ROUTE_URL } from '../../constants/routingUrl'
import { Link } from 'react-router-dom'

import logoLogin2 from '../../assets/images/logo_part2.png'
import './RegisterPage.scss'

const RegisterPage = () => {
  return (
    <>
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
                                    // onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
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
                                    >
                                        <Input placeholder="Username" />
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
                                    >
                                        <Input.Password placeholder="Password"/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Comfirm Password"
                                        name="confirmPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="Comfirm Password" />
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
                                    >
                                        <Input placeholder="Phone Number" />
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
                                    >
                                        <Input placeholder="Email address" />
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
                                    >
                                        <Input placeholder="Your Address" />
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
                                    >
                                        <Input placeholder="Full Name" />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <div className='form__register--btns'>
                                            <Button type="primary" htmlType="submit">
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