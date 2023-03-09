import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Typography } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actAddNewProduct } from '../../../redux/features/Product/productSlice';

const AddNewProduct = ({ open, onClick }) => {
    const dispatch = useDispatch()
    const [confirmAddNew, setConfirmAddNew] = useState(false)
    const [formAddNewProduct, setFormAddNewProduct] = useState({
        images: '',
        name: '',
        description: '',
        price: '',
        priceSale: '',
        tag: '',
        category: '',
        brand: '',
        rating: 0
    })


    const handleConfirmAddNew = (data) => {
        dispatch(actAddNewProduct(data))
        setConfirmAddNew(false)
        onClick()
    }

    const handleCheckFillInfo = () => {
        setConfirmAddNew(true)
    }

    const handleChangeFormAddNewProduct = (e) => {
        const { name, value } = e.target
        setFormAddNewProduct({
            ...formAddNewProduct,
            [name]: value
        })
    }

    console.log(formAddNewProduct, 'formAddNewProduct');
    return (
        <>
            <Modal
                centered
                open={open}
                width='1000px'
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
                    onFinish={handleCheckFillInfo}

                >
                    <h2 style={{ textAlign: 'center' }}>Add New Product</h2>
                    <Form.Item
                        label="Images"
                        name="images"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter url images!',
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            onChange={value => {
                                setFormAddNewProduct({
                                    ...formAddNewProduct,
                                    images: value
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter name product!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Name"
                            allowClear
                            name='name'
                            value={formAddNewProduct?.name}
                            onChange={handleChangeFormAddNewProduct}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter description!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Description"
                            allowClear
                            name='description'
                            style={{
                                height: 100
                            }}
                            value={formAddNewProduct?.description}
                            onChange={handleChangeFormAddNewProduct}
                        />
                    </Form.Item>

                    <div>
                        <Space>
                            <Form.Item
                                className='productAdmin__input'
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Price!',
                                    },
                                ]}

                            >
                                <Input
                                    placeholder="Price"
                                    allowClear
                                    name='price'
                                    type='number'
                                    value={formAddNewProduct?.price}
                                    onChange={handleChangeFormAddNewProduct}
                                />
                            </Form.Item>
                            <Form.Item
                                className='productAdmin__input'
                                label="Price Sale"
                                name="priceSale"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Price Sale!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Price Sale"
                                    allowClear
                                    name='priceSale'
                                    type='number'
                                    value={formAddNewProduct?.priceSale}
                                    onChange={handleChangeFormAddNewProduct}
                                />
                            </Form.Item>
                        </Space>
                    </div>
                    <div>
                        <Space>
                            <Form.Item
                                className='productAdmin__input2'
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Category!',
                                    },
                                ]}
                            >
                                <Select
                                    options={[
                                        {
                                            value: 'technological',
                                            label: 'Technological',
                                        },
                                        {
                                            value: 'clothes',
                                            label: 'Clothes',
                                        },
                                        {
                                            value: 'jewelry',
                                            label: 'Jewelry',
                                        },
                                    ]}
                                    onChange={value => {
                                        setFormAddNewProduct({
                                            ...formAddNewProduct,
                                            category: value
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                className='productAdmin__input2'
                                label="Brand"
                                name="brand"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Brand!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Brand"
                                    allowClear
                                    name='brand'
                                    value={formAddNewProduct?.brand}
                                    onChange={handleChangeFormAddNewProduct}
                                />
                            </Form.Item>
                            <Form.Item
                                className='productAdmin__input2'
                                label="Tag"
                                name="tag"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter tags!',
                                    },
                                ]}
                            >
                                <Select
                                    mode="tags"
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Tags Mode"
                                    options={[
                                        {
                                            value: 'hot',
                                            label: 'Hot',
                                        },
                                        {
                                            value: 'new',
                                            label: 'New',
                                        },
                                        {
                                            value: 'sale',
                                            label: 'Sale',
                                        },
                                    ]}
                                    onChange={value => {
                                        setFormAddNewProduct({
                                            ...formAddNewProduct,
                                            tag: value
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Space>
                    </div>

                    <Space>
                        <Button type='primary' htmlType='submit' >Add </Button>
                        <Button type='dashed' onClick={onClick} >Cancel</Button>
                    </Space>
                </Form>

                {confirmAddNew && (
                    <Modal title="Notification" open={confirmAddNew}
                        footer={null}>
                        <div className='cart__confirm'>
                            <Space>
                                <ExclamationCircleTwoTone style={{ fontSize: '30px' }} />
                                <Typography.Title level={4}>Are you sure to Add New Product?</Typography.Title>
                            </Space>
                        </div>

                        <Space>
                            <Button type='primary' htmlType='submit' onClick={() => handleConfirmAddNew(formAddNewProduct)}>Add</Button>
                            <Button type='dashed' onClick={() => setConfirmAddNew(false)}>Cancel</Button>
                        </Space>
                    </Modal>
                )}
            </Modal>
        </>
    )
}

export default AddNewProduct