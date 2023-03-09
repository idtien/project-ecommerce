
import { DeleteOutlined, EditOutlined, ExclamationCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useGoToTop from '../../../hooks/useGoToTop';
import { actDeleteProductByID, actUpdateProductEdit, fetchAllProduct } from '../../../redux/features/Product/productSlice';
import AddNewProduct from '../AddNewProduct';

import './ProductAdmin.scss'

const ProductAdmin = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const { allProduct, product } = useSelector(state => state.products)
    const [idProduct, setIdProduct] = useState()
    const [dataProduct, setDataProduct] = useState([])
    const [confirmDeleteProduct, setConfirmDeleteProduct] = useState(false)
    const [confirmEdit, setConfirmEdit] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const [infoProductEdit, setInfoProductEdit] = useState({})
    const [showFormAddNew, setShowFormAddNew] = useState(false)
    


    const { currentPage, pageSize } = useSelector(state => state.products)


    useEffect(() => {
        setDataProduct(allProduct?.map((productMap, index) => {
            return (
                {
                    key: index,
                    id: productMap?.id,
                    name: productMap?.name,
                    category: productMap?.category,
                    price: productMap?.price,
                    priceSale: productMap?.priceSale,
                    rating: productMap?.rating,
                    images: productMap?.images,
                    tag: productMap?.tag,
                    brand: productMap?.brand,
                    description: productMap?.description
                }
            )
        }))
    }, [allProduct])

    useEffect(() => {
        dispatch(fetchAllProduct())
    }, [])


    const handleCheckFillInfo = () => {
        setConfirmEdit(true)
    }

    const handleEditProduct = (id) => {
        const existProduct = allProduct.findIndex(product => product.id === id)
        setInfoProductEdit(allProduct[existProduct])
        setEditProduct(true)
        setIdProduct(id)

    }

    const handleConfirmEdit = () => {
        dispatch(actUpdateProductEdit(infoProductEdit))
        setEditProduct(false)
        setConfirmEdit(false)
    }

    const handleConfirmDeleteProduct = (id) => {
        setConfirmDeleteProduct(true)
        setIdProduct(id)

    }

    const handleDeleteProduct = () => {
        dispatch(actDeleteProductByID(idProduct))
        setConfirmDeleteProduct(false)
    }

    const handleChangeFormEditProduct = (e) => {
        console.log(e.target.value, 'e');
        const { name, value } = e.target
        setInfoProductEdit({
            ...infoProductEdit,
            [name]: value
        })

    }

    const columns = [
        {
            width: 200,
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images) => {
                return <img src={images[0]} style={{ width: '100%' }} />
            }
        },
        {
            width: 200,
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            width: 250,
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (des) => {
                return (
                    <p className='productAdmin__description'>
                        {des}
                    </p>
                )
            }
        },
        {
            width: 100,
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (price1, price2) => {
                return price1.price < price2.price
            }
        },
        {
            width: 100,
            title: 'Price Sale',
            dataIndex: 'priceSale',
            key: 'priceSale',
        },
        {
            width: 100,
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (brand) => {
                // color={'#91caff'}
                return (
                    <Tag key={brand}>
                        {brand.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            width: 130,
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => {
                let color
                if (category === 'technological') {
                    color = '#f5222d'
                } else if (category === 'clothes') {
                    color = '#52c41a'
                } else if (category === 'jewelry') {
                    color = '#ffadd2'
                }
                return (
                    <Tag color={color} key={category}>
                        {category.toUpperCase()}
                    </Tag>
                );
            },
            filters: [
                { text: 'Technological', value: 'technological' },
                { text: 'Clothes', value: 'clothes' },
                { text: 'Jewelry', value: 'jewelry' },
            ],
            onFilter: (value, record) => {
                return record.category === value
            }
        },
        {
            width: 150,
            title: 'Tags',
            dataIndex: 'tag',
            key: 'tag',
            render: (tag) => {
                return (
                    <>
                        {tag?.map((tag) => {
                            let color
                            if (tag === 'hot') {
                                color = '#f5222d';
                            } else if (tag === 'sale') {
                                color = '#faad14'
                            } else {
                                color = '#1677ff'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                )
            },
            filters: [
                { text: 'New', value: 'new' },
                { text: 'Sale', value: 'sale' },
                { text: 'Hot', value: 'hot' },
            ],
            onFilter: (value, record) =>
                record['tag']
                    ? record['tag']
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    : false,
        },
        {
            width: 80,
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: (rating1, rating2) => {
                return rating1.rating > rating2.rating
            }
        },
        {
            width: 150,
            title: 'Action',
            key: 'action',
            render: (product) => (
                <Space size="middle">
                    <Tooltip title="Edit" >
                        <Button>
                            <EditOutlined style={{ color: '#4096ff' }}
                                onClick={() => handleEditProduct(product.id)}
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete" >
                        <Button>
                            <DeleteOutlined
                                style={{ color: '#f5222d' }}
                                onClick={() => handleConfirmDeleteProduct(product.id)}
                            />
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className='dashboard__parameters'>
                        <Typography.Title level={4}>Products</Typography.Title>
                        <Tooltip placement="right" title='Add New Product'>
                            <Button
                             type="primary" 
                             danger 
                             ghost 
                             size='large' 
                             icon={<PlusOutlined />}
                             onClick={()=> setShowFormAddNew(true)}
                             >
                                Add new product
                            </Button>
                        </Tooltip>
                        <Table columns={columns} dataSource={dataProduct} size='small' scroll={{ x: 600 }} />
                    </div>
                </Col>

                {editProduct && (
                    <Modal
                        centered
                        open={editProduct}
                        width={1000}
                        footer={null}
                        onCancel={() => setEditProduct(false)}

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
                            fields={[
                                {
                                    name: ["images"],
                                    value: infoProductEdit?.images,
                                },
                                {
                                    name: ["name"],
                                    value: infoProductEdit?.name,
                                },
                                {
                                    name: ["description"],
                                    value: infoProductEdit?.description,
                                },
                                {
                                    name: ["price"],
                                    value: infoProductEdit?.price,
                                },
                                {
                                    name: ["priceSale"],
                                    value: infoProductEdit?.priceSale,
                                },
                                {
                                    name: ["brand"],
                                    value: infoProductEdit?.brand,
                                },
                                {
                                    name: ["category"],
                                    value: infoProductEdit?.category,
                                },
                                {
                                    name: ["tag"],
                                    value: infoProductEdit?.tag,
                                },
                            ]}

                        >
                            <h2 style={{ textAlign: 'center' }}>Edit Product</h2>
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
                                    options={[
                                        {
                                            value: infoProductEdit?.images,
                                            label: infoProductEdit?.images,
                                        }
                                    ]}
                                    onChange={value => {
                                        setInfoProductEdit({
                                            ...infoProductEdit,
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
                                    value={infoProductEdit?.name}
                                    onChange={handleChangeFormEditProduct}
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
                                    value={infoProductEdit?.description}
                                    onChange={handleChangeFormEditProduct}
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
                                            value={infoProductEdit?.price}
                                            onChange={handleChangeFormEditProduct}
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
                                            value={infoProductEdit?.priceSale}
                                            onChange={handleChangeFormEditProduct}
                                        />
                                    </Form.Item>
                                </Space>
                            </div>
                            <div>
                                <Space>
                                    <Form.Item
                                        className='productAdmin__input'
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
                                                setInfoProductEdit({
                                                    ...infoProductEdit,
                                                    category: value
                                                });
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className='productAdmin__input'
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
                                                setInfoProductEdit({
                                                    ...infoProductEdit,
                                                    tag: value
                                                });
                                            }}
                                        />
                                    </Form.Item>
                                </Space>
                            </div>

                            <Space>
                                <Button type='primary' htmlType='submit' >Edit</Button>
                                <Button type='dashed' onClick={() => setEditProduct(false)} >Cancel</Button>
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
                                    <Button type='primary' htmlType='submit' onClick={() => handleConfirmEdit(
                                        console.log('hihi')
                                    )}>Edit</Button>
                                    <Button type='dashed' onClick={() => setConfirmEdit(false)}>Cancel</Button>
                                </Space>
                            </Modal>
                        )}
                    </Modal>
                )}

                {confirmDeleteProduct && (
                    <Modal title="Notification" open={confirmDeleteProduct}
                        footer={null}>
                        <div className='cart__confirm'>
                            <Space>
                                <ExclamationCircleTwoTone style={{ fontSize: '30px' }} />
                                <Typography.Title level={4}>Are you sure to delete?</Typography.Title>
                            </Space>
                        </div>

                        <Space>
                            <Button type='primary' htmlType='submit' onClick={handleDeleteProduct}>Delete</Button>
                            <Button type='dashed' onClick={() => setConfirmDeleteProduct(false)}>Cancel</Button>
                        </Space>
                    </Modal>
                )}

                {/* ============================================================================================================================================= */}

                {showFormAddNew && <AddNewProduct 
                open={showFormAddNew}
                onClick={() => setShowFormAddNew(false)}
                />}

            </Row>
        </>
    )
}

export default ProductAdmin