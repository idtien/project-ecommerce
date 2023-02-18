import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'


import { ROUTE_URL } from '../../constants/routingUrl'
import './LoginPage.scss'
import logoLogin2 from '../../assets/images/logo_part2.png'

const LoginPage = () => {
    return (
        <>
            <Row>
                <Col span={24}>
                    <div className='form__login'>
                        <Row>
                            <Col className='form__login--logo' span={12}>
                                <img src={logoLogin2} alt='logo_login' />
                                <p>Favorite E-Commerce Platform in Southeast Asia & Taiwan</p>
                            </Col>
                            <Col className='form__login--input' span={12}>
                                <Form className='form__login--input2'
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
                                    <h2>LOGIN</h2>

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
                                        <Input placeholder="Email/Phone Number/Username" />
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

                                    {/* <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item> */}

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <div className='form__login--btns'>
                                            <Button type="primary" htmlType="submit">
                                                Login
                                            </Button>
                                            <Button type="link">
                                                
                                            <Link to={ROUTE_URL.REGISTER}>You don't have account? Register</Link>
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

export default LoginPage