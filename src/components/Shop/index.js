import React, { useEffect, useState } from 'react'
import { Col, Row, Slider, Button, Pagination, Space, Typography, Menu } from 'antd'
import './Shop.scss'
import Product from '../Product';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import useGoToTop from '../../hooks/useGoToTop'
import { fetchAllBrandProducts } from "../../apis/productAPI"
import { actSetChangePage, fetchAllProduct } from '../../redux/features/Product/productSlice';
import { CrownOutlined, LaptopOutlined, TagsOutlined } from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';

const Shop = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const { allProduct, isLoading, currentPage, pageSize, totalProduct } = useSelector(state => state.products)
    const [brandProduct, setBrandProduct] = useState({})
    const [flagCheck, setFlagCheck] = useState('')
    const [filterPrice, setFilterPrice] = useState([0, 9999999])
    const [filterValue, setFilterValue] = useState({
        brand: '',
        category: '',
        price: [filterPrice[0], filterPrice[1]]
    })

    useEffect(() => {
        document.title = 'SHOP MALL - Shop';
    }, []);


    useEffect(() => {
        if (filterValue.brand === '') {
            dispatch(fetchAllProduct({ _page: currentPage, _limit: pageSize, price_gte: filterValue.price[0], price_lte: filterValue.price[1] }))
        } else {
            dispatch(fetchAllProduct({ _page: currentPage, _limit: pageSize, category: filterValue.category, brand: filterValue.brand, price_gte: filterValue.price[0], price_lte: filterValue.price[1] }))
        }

    }, [filterValue, pageSize, currentPage])

    useEffect(() => {
        async function fetchDataBrand() {
            const dataBrand = await fetchAllBrandProducts()
            setBrandProduct(dataBrand.data)
        }
        fetchDataBrand()
    }, [])


    const renderListProduct = (listProduct) => {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
    }

    const handleChangeBrand = (dataBrand) => {
        setFilterValue({
            ...filterValue,
            brand: dataBrand.brand,
            category: dataBrand.category
        })
    }

    const handleClickSlider = () => {
        window.scrollTo(0, 0)
        setFilterValue({
            ...filterValue,
            price: filterPrice
        })
    }
    const handleResetFilter = () => {
        window.scrollTo(0, 0)
        setFilterValue({
            ...filterValue,
            brand: '',
            category: '',
            price: [0, 9999999]
        })
        dispatch(actSetChangePage(1))

    }

    const handleChangePage = (page) => {
        dispatch(actSetChangePage(page))
        window.scroll(0, 0)
    }

    return (
        <>
            <ToastContainer />
            <Row className='shop' >
                <Col span={4} offset={0}>
                    <div className='menu__collapse'>


                        <Menu
                            mode="inline"
                            style={{
                                width: 256,
                            }}
                        >
                            <SubMenu
                                key="sub1"
                                title={<span><LaptopOutlined />
                                    <span>Technological</span></span>}>

                                {brandProduct?.technological?.map((brand) => {
                                    return <Menu.Item
                                        key={brand}
                                        style={{ textTransform: 'capitalize' }}

                                        onClick={() => handleChangeBrand({ brand, category: 'technological' })}
                                    >
                                        {brand}
                                    </Menu.Item>
                                })}

                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span><TagsOutlined />
                                    <span>Clothes</span></span>}>

                                {brandProduct?.clothes?.map((brand) => {
                                    return <Menu.Item
                                        key={brand}
                                        style={{ textTransform: 'capitalize' }}

                                        onClick={() => handleChangeBrand({ brand, category: 'clothes' })}
                                    >
                                        {brand}
                                    </Menu.Item>
                                })}

                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><CrownOutlined />
                                    <span>Personal jewelry</span></span>}>
                                {brandProduct?.jewelry?.map((brand, index) => {
                                    return <Menu.Item
                                        key={index}
                                        style={{ textTransform: 'capitalize' }}

                                        onClick={() => handleChangeBrand({ brand, category: 'jewelry' })}
                                    >
                                        {brand}
                                    </Menu.Item>
                                })}

                            </SubMenu>
                        </Menu>

                        <Col span={20} offset={0} >
                            <div className='filter'>
                                Around Price: USD
                                <Slider
                                    range
                                    max={9999}
                                    min={0}
                                    step={10}
                                    defaultValue={[0, 400]}
                                    onAfterChange={value => {
                                        console.log(value, 'abc');
                                        setFilterPrice(value)
                                    }}
                                />
                                From: {filterPrice[0]} To: {filterPrice[1]}
                                <Space style={{ marginTop: '16px' }}>
                                    <Button onClick={handleClickSlider} type='primary'>
                                        Filter
                                    </Button>
                                    <Button
                                        onClick={handleResetFilter}
                                    >
                                        Reset
                                    </Button>
                                </Space>
                            </div>
                        </Col>
                    </div>
                </Col>
                <Col span={20}>
                    <Row>
                        <Col span={20} offset={2}>
                            <Row gutter={[16, 16]}>
                                {isLoading ? <Product loading={isLoading} /> :
                                    (
                                        renderListProduct(allProduct)
                                    )
                                }
                                {allProduct.length <= 0 && isLoading === false && (
                                    <div style={{ display: 'block', textAlign: 'center' }}>
                                        <Typography.Title level={2}>No products match</Typography.Title>
                                        <img
                                            src='https://img.freepik.com/free-vector/shopping-cart_1284-672.jpg?w=1060&t=st=1677918872~exp=1677919472~hmac=234c124517b413187ca099fc37768d9a02d78caf6acc3f179511bf522bb2c5e4'
                                            alt='hihi'

                                            style={{
                                                width: '30%',
                                                margin: 'auto'
                                            }}
                                        />
                                    </div>
                                )}
                            </Row>

                            {allProduct.length > 0 && (
                                <Pagination
                                    style={{ textAlign: 'center', padding: '20px 0' }}
                                    defaultCurrent={currentPage}
                                    pageSize={pageSize}
                                    total={totalProduct}
                                    onChange={(page) => handleChangePage(page)}
                                />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Shop