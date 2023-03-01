import React from 'react'
import { Col, Row, message, Collapse, Slider } from 'antd'
import './Shop.scss'
import Product from '../Product';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
const { Panel } = Collapse;

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const items = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const Shop = () => {

    const { allProduct, isLoading } = useSelector(state => state.products)


    const renderListProduct = (listProduct) => {
        return listProduct.map((product) => {
            return <Product key={product.id} products={product} />
        })
    }
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
                            <Panel header="Technological" key="1">
                                <ul>
                                    <li>123</li>
                                </ul>
                            </Panel>
                            <Panel header="Clothes" key="2">
                                <ul>
                                    <li>123</li>
                                </ul>
                            </Panel>
                            <Panel header="Personal jewelry" key="3">
                                <ul>
                                    <li>123</li>
                                </ul>
                            </Panel>
                        </Collapse>
                        <br />
                        <Col span={20} offset={0} >
                            <div className='filter'>
                                Around Price: USD
                                <Slider
                                    range
                                    max={10000}
                                    step={10}
                                    defaultValue={[0, 400]}
                                // onChange={onChange}
                                // onAfterChange={onAfterChange}
                                />
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
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Shop