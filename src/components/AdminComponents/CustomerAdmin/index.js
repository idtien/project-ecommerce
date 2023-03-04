import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Space, Table, Tag, Tooltip, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { actDeleteUserByID, fetchAllUser } from '../../../redux/features/User/userSlice'

const CustomerAdmin = () => {

    const dispatch = useDispatch()
    const [dataUser, setDataUser] = useState([])
    const { allUser, user } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchAllUser())
    }, [])

    useEffect(() => {
        setDataUser(allUser?.map((userMap, index) => {
            return (
                {

                    key: index,
                    name: userMap?.fullname,
                    username: userMap?.username,
                    password: userMap.password,
                    email: userMap.email,
                    phone: userMap.phone,
                    address: userMap.address,
                    id: userMap.id,
                    isAdmin: userMap.isAdmin
                }
            )
        }))
    }, [allUser])

    const handleDeleteUser = (id) => {
        if (user.id === id && user.isAdmin) {
            alert('You cannot delete this account')
        } else {
            dispatch(actDeleteUserByID(id))
        }
    }

    const columns = [
        {
            width: 200,
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            width: 100,
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {

            width: 120,
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            width: 150,
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            width: 120,
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            width: 150,
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

        {
            width: 100,
            title: 'Role',
            key: 'isAdmin',
            dataIndex: 'isAdmin',
            render: (isAdmin) => {
                let color
                if (isAdmin) {
                    color = '#4096ff'
                }
                else {
                    color = '#f5222d'
                }

                return (
                    <Tag color={color} key={isAdmin}>
                        {isAdmin ? 'ADMIN' : 'USER'}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (user) => {
                return (
                    <Space size="middle">
                        <Tooltip title="Edit" >
                            <Button>
                                <EditOutlined style={{ color: '#4096ff' }} />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete" >
                            <Button>
                                <DeleteOutlined
                                    style={{ color: '#f5222d' }}
                                    onClick={() => handleDeleteUser(user.id)}
                                />
                            </Button>
                        </Tooltip>
                    </Space>
                )
            }
        },
    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Customer</Typography.Title>
                        <Table columns={columns} dataSource={dataUser} size='middle' scroll={{x: 500, y: 2000}} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CustomerAdmin