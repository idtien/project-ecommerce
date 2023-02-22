import { Avatar, Button, Col, Form, Input, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'

import './UserProfile.scss'
import TextArea from 'antd/es/input/TextArea'

const xs = { span: 24, offset: 0 }
const sm = { span: 24, offset: 0 }
const md = { span: 24, offset: 0 }
const lg = { span: 24, offset: 0 }
const UserProfilePage = () => {
    return (
        <>

            <Row className='userProfile'>
                <Col className='userProfile__avatar' span={2} offset={4}>
                    <Avatar
                        className='userProfile__avatar--img'
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                        icon={<UserOutlined />}
                    />
                    <br />
                    <br />
                    <div className='userProfile__avatar--btn'>
                        <Button type='primary'>EDIT</Button>
                        <Button type='dashed'>UPLOAD</Button>
                    </div>
                </Col>

                <Col span={16} offset={2}>
                    <Form className='userProfile__form'
                        name="basic"
                        labelCol={{
                            span: 24
                        }}
                        wrapperCol={{
                            span: 24
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
                        <h2 style={{ textAlign: 'center' }}>INFORMATION PROFILE USER</h2>
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
                            <Input placeholder="Full Name" disabled />
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
                            <Input placeholder="Phone Number"  disabled/>
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
                            <Input placeholder="Email address" disabled/>
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
                            <Input placeholder="Your Address" disabled />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                                placeholder="Type some description"
                                disabled
                            />
                        </Form.Item>

                        <Form.Item

                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                                <Button disabled type="default" style={{marginRight: '15px'}}>
                                    Cancel
                                </Button>
                                <Button disabled type="primary" htmlType="submit">
                                    Save
                                </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default UserProfilePage