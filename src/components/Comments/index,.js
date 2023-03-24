import { Avatar, Card, Rate } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { useSelector } from 'react-redux'

const CommentsCpn = ({ comment }) => {
    const { user } = useSelector(state => state.users)
    return (
        <div className='productDetails__comments--id' key={comment.id}>
            <Card
                style={{
                    width: '100%',
                    marginTop: '20px'
                }}
            >

                <Meta
                    avatar={<Avatar src="https://joesch.moe/api/v1/random" style={{
                        backgroundColor: 'red',
                        verticalAlign: 'right',
                    }}> {user?.fullname}</Avatar>}
                    title={comment?.nameCmt}
                    description={comment?.contentCmt}
                />
                <div style={{ marginLeft: '45px' }}>
                    <Rate disabled defaultValue={comment?.rating} />
                </div>
            </Card>
        </div>
    )
}

export default CommentsCpn