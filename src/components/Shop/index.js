import React, { useEffect, useState } from 'react'
import { Col, Row, message, Collapse, Slider, Button, Pagination, Space, Typography, Menu } from 'antd'
import './Shop.scss'
import Product from '../Product';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import useGoToTop from '../../hooks/useGoToTop'
import { fetchAllBrandProducts } from "../../apis/productAPI"
import { actSetChangePage, fetchAllProduct } from '../../redux/features/Product/productSlice';
import { useSearchParams } from 'react-router-dom';
import { AppstoreOutlined, CrownOutlined, LaptopOutlined, MailOutlined, SettingOutlined, TagsOutlined } from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';
import Icon from '@ant-design/icons/lib/components/Icon';

const { Panel } = Collapse;

const Shop = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const { allProduct, isLoading, currentPage, pageSize, totalProduct } = useSelector(state => state.products)

    const [brandProduct, setBrandProduct] = useState({})
    const [filterResult, setFilterResult] = useState([])
    const [totalRecord, setTotalRecord] = useState(0)
    const [filterPrice, setFilterPrice] = useState([0, 9999999])
    const [filterValue, setFilterValue] = useState({
        brand: '',
        price: [filterPrice[0], filterPrice[1]]
    })

    const renderListProduct = (listProduct) => {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
    }

    const handleChangeBrand = (brand) => {
        setFilterValue({
            ...filterValue,
            brand: brand
        })
    }

    useEffect(() => {
        if (filterValue.brand === '') {
            dispatch(fetchAllProduct({ _page: currentPage, _limit: pageSize, price_gte: filterValue.price[0], price_lte: filterValue.price[1] }))
        } else {
            dispatch(fetchAllProduct({ _page: 1, _limit: pageSize, brand: filterValue.brand, price_gte: filterValue.price[0], price_lte: filterValue.price[1] }))
        }

    }, [filterValue])

    useEffect(() => {
        async function fetchDataBrand() {
            const dataBrand = await fetchAllBrandProducts()
            setBrandProduct(dataBrand.data)
        }
        fetchDataBrand()
    }, [])


    const handleClickSlider = () => {
        window.scrollTo(0, 0)
        setFilterValue({
            ...filterValue,
            price: filterPrice
        })
    }

    // const techNological = []
    // const clothes = []
    // const jewelry = []
    
    // brandProduct?.technological?.map((brand) => {
    //     return techNological?.push(getItem(brand, brand))
    // })
    // brandProduct?.clothes?.map((brand) => {
    //     return clothes?.push(getItem(brand, brand))
    // })
    // brandProduct?.jewelry?.map((brand) => {
    //     return jewelry?.push(getItem(brand, brand))
    // })

  
    // function getItem(label, key, icon, children, type) {
    //     return {
    //       key,
    //       icon,
    //       children,
    //       label,
    //       type,
    //     };
    //   }
    //   const items = [
    //     getItem('Technological', 'sub1', <MailOutlined />, techNological),
    //     getItem('Clothes', 'sub2', <MailOutlined />, clothes),
    //     getItem('Jewelry', 'sub3', <MailOutlined />, jewelry)
    //   ];
      
    //   const [openKeys, setOpenKeys] = useState([]);
    //   const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    //   const onOpenChange = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //       setOpenKeys(keys);
    //       console.log(keys, 'hihi');
    //     } else {
    //       setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    //   };
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
                                        
                                        onClick={()=>handleChangeBrand(brand)}
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
                                        
                                        onClick={()=>handleChangeBrand(brand)}
                                    >
                                        {brand}
                                    </Menu.Item>
                                })}

                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><CrownOutlined />
                                    <span>Personal jewelry</span></span>}>
                                {brandProduct?.jewelry?.map((brand) => {
                                    return <Menu.Item
                                        key={brand}
                                        style={{ textTransform: 'capitalize' }}
                                        
                                        onClick={()=>handleChangeBrand(brand)}
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
                                    max={8000}
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
                                    <Button>
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

                                {allProduct.length <= 0 && isLoading == false && (
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
                                    onChange={(page) => {
                                        dispatch(actSetChangePage(page))
                                        window.scroll(0, 0)
                                    }}
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