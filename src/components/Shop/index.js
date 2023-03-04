import React, { useEffect, useState } from 'react'
import { Col, Row, message, Collapse, Slider, Button, Pagination, Space } from 'antd'
import './Shop.scss'
import Product from '../Product';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import useGoToTop from '../../hooks/useGoToTop'
import axios from 'axios';
import { BE_URL } from '../../constants/config';
import continueShopping from '../../assets/images/continueShopping.jpg'
import { fetchAllBrandProducts } from "../../apis/productAPI"
import { fetchAllProduct } from '../../redux/features/Product/productSlice';

const { Panel } = Collapse;

const Shop = () => {
    useGoToTop()
    const dispatch = useDispatch()
    const { allProduct, isLoading } = useSelector(state => state.products)

    const [brandProduct, setBrandProduct] = useState({})
    const [filterResult, setFilterResult] = useState([])
    const [totalRecord, setTotalRecord] = useState(0)
    const [page, setPage] = useState(1)
    const [filterPrice, setFilterPrice] = useState([0, 9999999])
    const [filterValue, setFilterValue] = useState({
        _page: 1,
        _limit: 8,
        brand: '',
        category: '',
        price: [filterPrice[0], filterPrice[1]]
    })
    // const [isShowFilter, setIsShowFilter] = useState(false)

    const renderListProduct = (listProduct) => {
        // if (!isShowFilter) {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
        // }
    }

    // const renderListProductFilter = (filterResult) => {
    //     return filterResult.map((product) => {
    //         return <Product key={product.id} products={product} />
    //     })
    // }

    // const techno = ['macbook', 'dell', 'acer', 'hp', 'lenovo', 'microsoft', 'asus']
    // const clothes = ['gucci', 'louisvuitton', 'channel', 'zara']




    const handleChangeValue = (dataFilter) => {
        // setIsShowFilter(true)
        setFilterValue(dataFilter)
    }

    // useEffect(() => {
    //     async function fetchDataFilter() {
    //         const dataFilter = await axios.get(`${BE_URL}products?_page=${page}&_limit=8&brand=${filterValue.brand}&category=${filterValue.category}&price_gte=${filterValue.price[0]}&price_lte=${filterValue.price[1]}`)
    //         setFilterResult(dataFilter.data)
    //         setTotalRecord(dataFilter.headers["x-total-count"]);
    //     }
    //     fetchDataFilter()
    // }, [filterValue, page])

    const handleClickSlider = () => {
        window.scrollTo(0, 0)
        setFilterValue({
            ...filterValue,
            price: filterPrice
        })
    }

    const handleResetFilter = () => {
        // setIsShowFilter(false)
    }


    useEffect(() => {
        dispatch(fetchAllProduct())
        async function fetchDataBrand() {
            const dataBrand = await fetchAllBrandProducts()
            setBrandProduct(dataBrand.data)
        }
        fetchDataBrand()
    }, [])


    console.log(totalRecord, 'totalRecord');
    console.log(brandProduct, 'brandProduct');

    return (
        <>
            <ToastContainer />
            <Row className='shop' >
                <Col span={4} offset={0}>
                    <div className='menu__collapse'>
                        <Collapse
                            expandIconPosition={'end'}
                            size='large'
                        >
                            <Panel header="Technological" key="1" className='menu__collapse--filter'>
                                <ul>
                                    {brandProduct?.technological?.map((brand, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => handleChangeValue({
                                                    brand: brand,
                                                    category: 'technological',
                                                    price: [
                                                        filterPrice[0],
                                                        filterPrice[1]
                                                    ]
                                                })}
                                            >
                                                {brand}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Panel>
                            <Panel header="Clothes" key="2" className='menu__collapse--filter'>
                                <ul>
                                    {brandProduct?.clothes?.map((brand, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => handleChangeValue({
                                                    brand: brand,
                                                    category: 'clothes',
                                                    price: [
                                                        filterPrice[0],
                                                        filterPrice[1]
                                                    ]
                                                })}
                                            >
                                                {brand}
                                            </li>

                                        )
                                    })}
                                </ul>
                            </Panel>
                            <Panel header="Personal jewelry" key="3" className='menu__collapse--filter'>
                                <ul>
                                    {/* <li>Bracelet</li>
                                    <li>Ring</li>
                                    <li>Necklace</li> */}
                                </ul>
                            </Panel>


                        </Collapse>
                        <br />
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
                                        setFilterPrice(value)
                                    }}
                                />
                                From: {filterPrice[0]} To: {filterPrice[1]}
                                <Space style={{ marginTop: '16px' }}>
                                    <Button onClick={handleClickSlider} type='primary'>
                                        Filter
                                    </Button>
                                    <Button onClick={handleResetFilter}>
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

                                {/* {isShowFilter && renderListProductFilter(filterResult)} */}

                                {isLoading ? <Product loading={isLoading} /> :
                                    (
                                        renderListProduct(allProduct)
                                    )
                                }

                                {/* {isShowFilter && filterResult.length <= 0 && (
                                    <img src='https://img.freepik.com/free-vector/shopping-cart_1284-672.jpg?w=1060&t=st=1677918872~exp=1677919472~hmac=234c124517b413187ca099fc37768d9a02d78caf6acc3f179511bf522bb2c5e4' width='50%' alt='hihi' />
                                )} */}
                            </Row>

                            {allProduct.length > 0 && (
                                <Pagination
                                    style={{ textAlign: 'center', padding: '20px 0' }}
                                    defaultCurrent={1}
                                    total={totalRecord}
                                    onChange={(page) => {
                                        setPage(page)
                                        window.scrollTo(0, 0)
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