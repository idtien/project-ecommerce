import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { ROUTE_URL } from '../../constants/routingUrl'
import { useDispatch, useSelector } from 'react-redux'
import { actReLogin, fetchLogin } from '../../redux/features/User/userSlice'

import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import logoLogin2 from '../../assets/images/logo_part2.png'
import './LoginPage.scss'
import { fetchAllProduct } from '../../redux/features/Product/productSlice'


const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isLogged, accessToken } = useSelector(state => state.users)

    const [inputDataLogin, setInputDataLogin] = useState({
        email: '',
        password: ''
    })
    
    const handleSubmit = (e) => {
        if (!isLogged) {
            toast.error('Please check email or password!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        dispatch(fetchLogin(inputDataLogin))
    }

    useEffect(() => {
        if (isLogged) {
            navigate('/')
        }
    }, [isLogged])

    
    const handleLoginForm = (e) => {
        const { name, value } = e.target
        setInputDataLogin({
            ...inputDataLogin,
            [name]: value
        })
    }
    
    if (isLogged) return null

    return (
        <>
        <ToastContainer
                position="top-center"
                autoClose={5000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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
                                        <Input placeholder="Email/Phone Number/Username" name="email" value={inputDataLogin.username} onChange={handleLoginForm} />
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
                                        <Input.Password placeholder="Password" name='password' value={inputDataLogin.password} onChange={handleLoginForm} />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <div className='form__login--btns'>
                                            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
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