import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { CarOutlined, HeartOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Carousel, Col, Divider, Form, Image, InputNumber, Rate, Row, Space, Tag, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import TextArea from 'antd/es/input/TextArea'

import useGoToTop from '../../hooks/useGoToTop'

import './ProductDetail.scss'
import { actGetProductById } from '../../redux/features/Product/productSlice'
import { actMoreListCart } from '../../redux/features/Cart/cartSlice'
import { toast, ToastContainer } from 'react-toastify'
import { actAddWishList } from '../../redux/features/WishList/wishListSlice'


const ProductDetails = () => {
  useGoToTop()
  const ref = useRef()
  const params = useParams()
  const dispatch = useDispatch()
  
  const [cart, setCart] = useState({})
  const [quantity, setQuantity] = useState(1)

  const { product } = useSelector(state => state.products)
  const { listCart } = useSelector(state => state.carts)
  const { isLogged, user } = useSelector(state => state.users)

  useEffect(() => {
    setCart({
      ...product,
      quantity: quantity
    })
  }, [product, quantity])

  const handleAddToCart = () => {
    dispatch(actMoreListCart(cart))
  }

  const handleAddToWishList = () => {
    if (!isLogged) {
      toast.warn('Please Login To Add Wish List!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

      });
    } else {
      dispatch(actAddWishList(cart))
    }
  }

  useEffect(() => {
    dispatch(actGetProductById(params.id))
  }, [params.id])


  const contentStyle = {
    margin: 0,
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
  };
  let color = ''

  if (product?.category === 'technological') {
    color = '#f5222d'
  } else if (product?.category === 'clothes') {
    color = '#52c41a'
  } else if (product?.category === 'jewelry') {
    color = '#69b1ff'
  }

  return (
    <>
      <ToastContainer />
      <Row className='productDetails'>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 2 }}>
          <div className='productDetails__img'>
            <Carousel
              draggable
              autoplay
              dots={false}
              ref={ref}
            >
              {product?.images?.map((img, index) => {
                return <div key={index}>
                  <Image
                    style={contentStyle}
                    width={'100%'}
                    src={img}
                  />
                </div>
              })}

            </Carousel>
            <div style={{ textAlign: 'center' }}>
              <Space>
                {product?.images?.map((img, index) => {
                  return (
                    <div
                      className='productDetails__img--select'
                      key={index}
                      onClick={() => {
                        ref.current.goTo(index)
                      }}>
                      <Image
                        preview={false}
                        width={'100%'}
                        src={img}
                      />
                    </div>
                  )
                })}
              </Space>
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <div className='productDetails__details'>
            <div className='productDetails__details--title'>
              {product?.name}
            </div>
            <div className='productDetails__details--rate'>
              <div className='productDetails__details--star'>
                <span>Rates: </span>
                <Rate disabled defaultValue={product?.rating} />
              </div>
              <Divider type="vertical" style={{ height: '20px', border: '1px solid #000' }} />
              <div className='productDetails__details--sold'>
                <span>Sold: </span>
                ...
              </div>
            </div>
            <Divider />
            <div className='productDetails__details--info'>
              <div>
                <strong>
                  Price:
                </strong>
                <span className='productDetails__details--infoPrice'>
                  ${product?.priceSale}
                </span>
                <span className='productDetails__details--infoPriceSale'>
                  ${product?.price}
                </span>
              </div>
              {/* <div>
                <strong>
                  Size:
                </strong>
                <span className='productDetails__details--infoSize'>
                  <Space>
                    <Avatar
                      style={{
                        backgroundColor: '#69b1ff',
                        verticalAlign: 'middle',
                      }}
                      size="large"
                      shape='square'
                    // gap={gap}
                    >
                      S
                    </Avatar>
                  </Space>
                </span>
              </div> */}
              {/* <div>
                <strong>
                  Color:
                </strong>
                <span className='productDetails__details--infoColor'>
                  <Avatar shape="square" size='large' style={{ backgroundColor: 'red' }} />
                </span>
              </div> */}
              <div>
                <strong>
                  Type:
                </strong>
                <span className='productDetails__details--infoType'>
                  <Tag color={color} key={product?.id}>
                    {product?.category}
                  </Tag>
                </span>
              </div>
              <div>
                <strong>
                  Quantity:
                </strong>
                <span className='productDetails__details--infoQuantity'>
                  <InputNumber size="large" style={{ width: '150px' }} min={1} max={100000} defaultValue={quantity}
                    onChange={(value) => {
                      setQuantity(value)
                    }} />
                </span>
              </div>
            </div>
            <div className='productDetails__details--btn'>
              <Space>
                <Button
                  type="primary"
                  shape="round"
                  style={{ backgroundColor: '#ff7875' }}
                  icon={<HeartOutlined />}
                  size='large'
                  onClick={handleAddToWishList}
                >
                  WISH LIST
                </Button>
                {/* <Button type="primary" shape="round" style={{ backgroundColor: '#ff4d4f' }} icon={<ShoppingCartOutlined />} size='large'>
                  BUY IT NOW
                </Button> */}
                <Button
                  type='primary'
                  shape="round"
                  style={{ backgroundColor: '#69b1ff' }}
                  icon={<CarOutlined />}
                  size='large'
                  onClick={handleAddToCart}
                >
                  ADD TO CARD
                </Button>
              </Space>
            </div>
            <br />
            <div className='productDetails__details--des'>
              <Card
                title="Description"
                bordered
              >
                <p>
                  {product?.description}
                </p>
              </Card>
            </div>
          </div>
        </Col>
        <Divider />
        <Col span={20} offset={2}>
          <div className='productDetails__comments'>
            <Typography.Title level={3}>Send Reviews</Typography.Title>
            <Form
              name="formComment"
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                // span: 16,
              }}
              style={{
                maxWidth: '100%',
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item
                label="Rate"
                name="rate"
                rules={[
                  {
                    required: true,
                    message: 'Please!',
                  },
                ]}
              >
                <Rate />
              </Form.Item>
              <Form.Item
                label="Comment"
                name="comment"
                rules={[
                  {
                    required: true,
                    message: 'Plese enter something',
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={255}
                  style={{ height: 100, resize: 'none' }}
                  // onChange={onChange}
                  placeholder="Type something!"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Divider />
        <Col span={20} offset={2}>
          <div className='productDetails__comments'>
            <Typography.Title level={3}>Reviews</Typography.Title>
            <div className='productDetails__comments--id' >
              <Card
                style={{
                  width: '100%',
                  marginTop: '20px'
                }}
              >

                <Meta
                  avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                  title="Pham Hoang Thanh Tien"
                  description="This is the best product I have ever bought"
                />
                <div style={{ marginLeft: '45px' }}>
                  <Rate disabled defaultValue={5} />
                </div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProductDetails