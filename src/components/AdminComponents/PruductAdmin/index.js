import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Space, Statistic, Table, Tag, Typography } from 'antd'
import React from 'react'

const ProductAdmin = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: (_, { type }) => (
                <>
                    {type.map((type) => {
                        let color = type.length > 5 ? 'geekblue' : 'green';
                        if (type === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={type}>
                                {type.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            description: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.',
            rate: '5 Starts',
            price: '100',
            image: [
                'img.png',
                'img2.png',
                'img3.png',
            ],
            type: ['nice', 'developer'],
            id: 1
        },
        {
            key: '2',
            name: 'John Brown',
            description: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.',
            rate: '5 Starts',
            price: '100',
            image: [
                'img.png',
                'img2.png',
                'img3.png',
            ],
            type: ['nice', 'developer'],
            id: 2
        },
        {
            key: '3',
            name: 'John Brown',
            description: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.',
            rate: '5 Starts',
            price: '100',
            image: [
                'img.png',
                'img2.png',
                'img3.png',
            ],
            type: ['nice', 'developer'],
            id: 3
        },

    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Products</Typography.Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ProductAdmin