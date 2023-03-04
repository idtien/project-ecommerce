import { Avatar, Divider, Tag } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { Link } from 'react-router-dom';

const ProductItem = ({ data }) => {
    return (
        <Link to={`/products/${data.id}`}>
            <Meta
                avatar={<Avatar src={data.images[0]} shape="square" size='large' />}
                title={data.name}
            />
            <Divider style={{ margin: '10px 0' }} />
        </Link>
    )
}

export default ProductItem
