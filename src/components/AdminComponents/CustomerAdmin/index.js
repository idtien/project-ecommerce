import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleTwoTone } from '@ant-design/icons'
import { actDeleteUserByID, actUpdateUserEdit, fetchAllUser } from '../../../redux/features/User/userSlice'
import { toast, ToastContainer } from 'react-toastify'

const CustomerAdmin = () => {

    const dispatch = useDispatch()
    const [dataUser, setDataUser] = useState([])
    const [editUser, setEditUser] = useState(false)
    const [confirmEdit, setConfirmEdit] = useState(false)
    const [infoUserEdit, setInfoUserEdit] = useState({})
    const [idUser, setIdUser] = useState()
    const [confirmDeleteUser, setConfirmDeleteUser] = useState(false)
    const [search, setSearch] = useState("")


    const { allUser, user } = useSelector(state => state.users)

    const [formEditUser, setFormEditUser] = useState({
        fullname: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        role: '',
    })

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

    const handleConfirmDeleteUser = (id) => {
        setConfirmDeleteUser(true)
        setIdUser(id)
    }

    const handleDeleteUser = () => {
        if (user.id === idUser && user.isAdmin) {
            toast.info('You cannot Delete yourself!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        } else {
            dispatch(actDeleteUserByID(idUser))
            setConfirmDeleteUser(false)
        }
    }

    const handleEditUser = (id) => {
        const existUser = allUser.findIndex(user => user.id === id)
        setInfoUserEdit(allUser[existUser])
        setEditUser(true)
    }


    const handleCheckFillInfo = (formOrders) => {
        setConfirmEdit(true)
    }

    const handleChangeRole = (value) => {
        setInfoUserEdit({
            ...infoUserEdit,
            isAdmin: value
        })
    }

    const handleConfirmEdit = (id) => {
        if (id === infoUserEdit.id) {
            toast.info('You cannot change Role of yourself!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            dispatch(actUpdateUserEdit(infoUserEdit))
            setEditUser(false)
            setConfirmEdit(false)
        }
    }
    const columns = [
        {
            width: 250,
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (record1, record2) => {
                return record1.name < record2.name
            },
            filteredValue: [search],
            onFilter: (value, record) => {
                return String(record.name).toLowerCase().includes(value.toLowerCase()) || 
                String(record.username).toLowerCase().includes(value.toLowerCase()) ||
                String(record.email).toLowerCase().includes(value.toLowerCase()) ||
                String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
                String(record.role).toLowerCase().includes(value.toLowerCase())
            }

        },
        {
            width: 100,
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            sorter: (record1, record2) => {
                return record1.username < record2.username
            }
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
            width: 200,
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
            filters: [
                { text: 'Admin', value: true },
                { text: 'User', value: false },
            ],
            onFilter: (value, record) => {
                return record.isAdmin === value
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (user) => {
                return (
                    <Space size="middle">
                        <Tooltip title="Edit" >
                            <Button>
                                <EditOutlined style={{ color: '#4096ff' }}
                                    onClick={() => handleEditUser(user.id)}
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete" >
                            <Button>
                                <DeleteOutlined
                                    style={{ color: '#f5222d' }}
                                    onClick={() => handleConfirmDeleteUser(user.id)}
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
                        <Input.Search
                            placeholder='Search...'
                            size='large'
                            onSearch={(value) => {
                                setSearch(value)
                            }}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            allowClear

                        />
                        <Table columns={columns} dataSource={dataUser} size='large' scroll={{ x: 500, y: 2000 }} />
                    </div>
                </Col>
                {editUser && (
                    <Modal
                        centered
                        open={editUser}
                        width={600}
                        footer={null}
                        onCancel={() => setEditUser(false)}
                    >
                        <Form className='form__register--input2'
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
                            autoComplete="off"
                            onFinish={handleCheckFillInfo}
                            fields={[
                                {
                                    name: ["fullname"],
                                    value: infoUserEdit?.fullname,
                                },
                                {
                                    name: ["username"],
                                    value: infoUserEdit?.username,
                                },
                                {
                                    name: ["phone"],
                                    value: infoUserEdit?.phone,
                                },
                                {
                                    name: ["email"],
                                    value: infoUserEdit?.email,
                                },
                                {
                                    name: ["address"],
                                    value: infoUserEdit?.address,
                                },
                                {
                                    name: ["role"],
                                    value: infoUserEdit?.isAdmin,
                                },
                            ]}

                        >
                            <h2 style={{ textAlign: 'center' }}>Edit User</h2>
                            <Form.Item
                                label="Name"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter full name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Name"
                                    allowClear
                                    name='fullname'
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter full name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Username"
                                    allowClear
                                    name='username'
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter full name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    allowClear
                                    name='email'
                                    disabled
                                />
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
                                <Input
                                    placeholder="Phone Number"
                                    allowClear
                                    name='phone'
                                    disabled
                                />
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
                                <Input
                                    placeholder="Your Address"
                                    allowClear
                                    name='address'
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your address!',
                                    },
                                ]}
                            >
                                <Select
                                    onChange={handleChangeRole}
                                    options={[
                                        {
                                            value: true,
                                            label: 'Admin',
                                        },
                                        {
                                            value: false,
                                            label: 'User',
                                        }
                                    ]}
                                />
                            </Form.Item>

                            <Space>
                                <Button type='primary' htmlType='submit' >Edit</Button>
                                <Button type='dashed' onClick={() => setEditUser(false)} >Cancel</Button>
                            </Space>
                        </Form>

                        {confirmEdit && (
                            <Modal title="Notification" open={confirmEdit}
                                footer={null}>
                                <div className='cart__confirm'>
                                    <Space>
                                        <ExclamationCircleTwoTone style={{ fontSize: '30px' }} />
                                        <Typography.Title level={4}>Are you sure to Edit?</Typography.Title>
                                    </Space>
                                </div>

                                <Space>
                                    <Button type='primary' htmlType='submit' onClick={() => handleConfirmEdit(user.id)}>Edit</Button>
                                    <Button type='dashed' onClick={() => setConfirmEdit(false)}>Cancel</Button>
                                </Space>
                            </Modal>
                        )}
                    </Modal>
                )}
                {confirmDeleteUser && (
                    <Modal title="Notification" open={confirmDeleteUser}
                        footer={null}>
                        <div className='cart__confirm'>
                            <Space>
                                <ExclamationCircleTwoTone style={{ fontSize: '30px' }} />
                                <Typography.Title level={4}>Are you sure to Delete User?</Typography.Title>
                            </Space>
                        </div>

                        <Space>
                            <Button type='primary' htmlType='submit' onClick={handleDeleteUser}>Delete</Button>
                            <Button type='dashed' onClick={() => setConfirmDeleteUser(false)}>Cancel</Button>
                        </Space>
                    </Modal>
                )}

            </Row>
        </>
    )
}

export default CustomerAdmin