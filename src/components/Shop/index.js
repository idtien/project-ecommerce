import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Row, Space, message, Collapse } from 'antd'
import  './Shop.scss'
import Product from '../Product';
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

    return (
        <>
            <Row>

            </Row>
            <Row  >
                <Col span={4} offset={1}>
                    {/* <div className='menu__bar'>
                        <MenuOutlined />
                    </div> */}
                    <div className='menu__collapse'>
                        <Collapse
                            // defaultActiveKey={['1']}
                            // onChange={onChange}
                            // ghost
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
                    </div>
                    <br />
                    <Col span={20} offset={0} >
                        <div className='filter'>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick,
                                }}
                            >
                                <a href='/' onClick={(e) => e.preventDefault()}>
                                    <Space style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                        Filter by:
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Col>
                </Col>

                <Col span={18}>
                    <Product />
                </Col>
            </Row>
        </>
    )
}

export default Shop