import {  Button, Col, Row, Space, Table,  Typography } from 'antd'
import React from 'react'

const CustomerAdmin = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href='#'>{text}</a>,
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

        {
            title: 'Type',
            key: 'isAdmin',
            dataIndex: 'isAdmin',
            render: (_, { isAdmin }) => {
              if(isAdmin) {

              }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            username: 'Tien',
            password: 'admin',
            email: 'tien@gmail.com',
            phone: '0123456789',
            address: 'Hue, Viet Nam',
            id: 1,
            isAdmin: true
        },
        {
            key: '2',
            name: 'John Brown',
            username: 'Tien',
            password: 'admin',
            email: 'tien@gmail.com',
            phone: '0123456789',
            address: 'Hue, Viet Nam',
            id: 3,
            isAdmin: false
        },
        {
            key: '3',
            name: 'John Brown',
            username: 'Tien',
            password: 'admin',
            email: 'tien@gmail.com',
            phone: '0123456789',
            address: 'Hue, Viet Nam',
            id: 3,
            isAdmin: false
        },
    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Customer</Typography.Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CustomerAdmin