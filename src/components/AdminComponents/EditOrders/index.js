import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actUpdateStatusOrder } from '../../../redux/features/Order/orderSlice';

const EditOrders = ({ open, onClick, id }) => {
    const dispatch = useDispatch()

    const { allOrders } = useSelector(state => state.orders)
    const [dataEdit, setDataEdit] = useState({})
    const [confirmEdit, setConfirmEdit] = useState(false)


    useEffect(() => {
        if (onClick) {
            const existOrder = allOrders.findIndex(order => order.id === id)
            setDataEdit(allOrders[existOrder])
        }
    }, [onClick])

    const handleConfirmEdit =(dataEditOrder) => {
        dispatch(actUpdateStatusOrder(dataEditOrder))
        setConfirmEdit(false)
        onClick()
    }

    return (
        (
            <Modal
                centered
                open={open}
                width={1000}
                footer={null}
                onCancel={onClick}

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
                        maxWidth: 1000,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    // onFinish={handleCheckFillInfo}
                    fields={[
                        {
                            name: ["receiverOfName"],
                            value: dataEdit?.receiverOfName,
                        },
                        {
                            name: ["orderAt"],
                            value: dataEdit?.orderAt,
                        },
                        {
                            name: ["phone"],
                            value: dataEdit?.phone,
                        },
                        {
                            name: ["address"],
                            value: dataEdit?.address,
                        },
                        {
                            name: ["description"],
                            value: dataEdit?.description,
                        },
                        {
                            name: ["status"],
                            value: dataEdit?.status,
                        }
                    ]}

                >
                    <h2 style={{ textAlign: 'center' }}>Edit Product</h2>
                    <Form.Item
                        label="Name"
                        name="receiverOfName"
                    >
                        <Input
                            name='name'
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Order At"
                        name="orderAt"
                    >
                        <Input
                            name='name'
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input
                            name='name'
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input
                            name='name'
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea
                            name='description'
                            style={{
                                height: 100
                            }}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Stat!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'waiting',
                                    label: 'waiting',
                                },
                                {
                                    value: 'preparing',
                                    label: 'preparing',
                                },
                                {
                                    value: 'delivering',
                                    label: 'delivering',
                                },
                                {
                                    value: 'success',
                                    label: 'success',
                                },
                                {
                                    value: 'failed',
                                    label: 'failed',
                                },
                            ]}

                            onChange={value => {
                                setDataEdit({
                                    ...dataEdit,
                                    status: value
                                })
                            }}
                        />
                    </Form.Item>


                    <Space>
                        <Button type='primary' htmlType='submit' onClick={() => setConfirmEdit(true)} >Edit</Button>
                        <Button type='dashed' onClick={onClick} >Cancel</Button>
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
                        <Button type='primary' htmlType='submit' onClick={() => handleConfirmEdit(dataEdit)}>Edit</Button>
                        <Button type='dashed' onClick={() => setConfirmEdit(false)}>Cancel</Button>
                    </Space>
                </Modal>
            )}
            </Modal>
        )
    )
}

export default EditOrders