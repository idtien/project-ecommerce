import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { CarOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Carousel, Col, Divider, Form, Image, InputNumber, Rate, Row, Space, Tag, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import useGoToTop from '../../hooks/useGoToTop'

import './ProductDetail.scss'
import { actGetProductById } from '../../redux/features/Product/productSlice'
import { actMoreListCart } from '../../redux/features/Cart/cartSlice'
import { toast, ToastContainer } from 'react-toastify'
import { actAddWishList } from '../../redux/features/WishList/wishListSlice'
import { actAddNewComment, fetchAllComment } from '../../redux/features/Comment/commentSlice'
import CommentsCpn from '../Comments/index,'


const ProductDetails = () => {
  useGoToTop()
  const ref = useRef()
  const params = useParams()
  const dispatch = useDispatch()

  const [cart, setCart] = useState({})
  const [quantity, setQuantity] = useState(1)

  const { product } = useSelector(state => state.products)
  const { allComment } = useSelector(state => state.comments)
  const { isLogged, user } = useSelector(state => state.users)

  console.log(isLogged, 'isLogged');
  const [dataRating, setDataRating] = useState({
    idUser: user?.id,
    idProduct: product?.id,
    nameCmt: user?.fullname,
    rating: 0,
    contentCmt: '',
    avatar: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
  })

  const ratingOfProduct = []

  useEffect(() => {
    dispatch(fetchAllComment())
  }, [])

  useEffect(() => {
    setCart({
      ...product,
      quantity: quantity
    })
  }, [product, quantity])

  useEffect(() => {
    setDataRating({
      idUser: user?.id,
      idProduct: product?.id,
      nameCmt: user?.fullname,
      rating: null,
      contentCmt: '',
      avatar: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    })
  }, [user, product])


  useEffect(() => {
    dispatch(actGetProductById(params.id))
  }, [params.id])

  useEffect(() => {
    document.title = `${product?.name} - ${product?.brand}`;
  }, [product]);

  const handleRenderRating = (allComment) => {
    for (let i = 0; i < allComment.length; i++) {
      if (allComment[i]?.idProduct === Number(params.id)) {
        ratingOfProduct.push(allComment[i])
      }
    }
    return ratingOfProduct?.map(rating => {
      return <CommentsCpn key={rating.id} comment={rating} />
    })
  }



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


  const handleRating = (e) => {
    const { name, value } = e.target
    setDataRating({
      ...dataRating,
      [name]: value
    })

  }

  const handleSendRating = (data) => {
    if (data?.rating === 0) {
      toast.warn('Please choose the number of stars!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!isLogged) {
      toast.error('Please Login to Rating!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      dispatch(actAddNewComment(data))
      setDataRating({
        ...dataRating,
        contentCmt: '',
        rating: null
      })
    }

  }

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
                  Brand:
                </strong>
                <span className='productDetails__details--infoType'>
                  <Tag color={'#fa8c16'} key={product?.id}>
                    {product?.brand}
                  </Tag>
                </span>
              </div>
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
                  Tags:
                </strong>
                <span className='productDetails__details--infoType'>
                  {product?.tag?.map((tag, index) => {
                    let color2 = ''
                    if (tag === 'hot') {
                      color2 = '#f5222d'
                    } else if (tag === 'new') {
                      color2 = '#4096ff'
                    } else {
                      color2 = '#d4b106'
                    }
                    return <Tag color={color2} key={index}>
                      {tag}
                    </Tag>
                  })}
                </span>
              </div>
              <div>
                <strong>
                  Quantity:
                </strong>
                <span className='productDetails__details--infoQuantity' style={{ margin: '0px' }}>
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
              onFinish={() => handleSendRating(dataRating)}
            >
              <Form.Item
                label="Rate"
                name="rate"
                rules={[
                  {
                    required: true,
                    message: 'Please select start!',
                  },
                ]}
              >
                <Rate
                  name='rating'
                  allowClear={false}
                  value={dataRating.rating}
                  onChange={(value) => setDataRating({
                    ...dataRating,
                    rating: value
                  })} />
              </Form.Item>
              <Form.Item
                label="Comment"
                name="comment"
                rules={[
                  {
                    required: true,
                    message: 'Please enter something',
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={255}
                  style={{ height: 100, resize: 'none' }}
                  onChange={handleRating}
                  name='contentCmt'
                  value={dataRating.contentCmt}
                  placeholder="Type something!"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit"
                >
                  Submit
                </Button>
                {/* <Button onClick={() => setDataRating({ ...dataRating, contentCmt: '' })}>
                  reset
                </Button> */}
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Divider />
        <Col span={20} offset={2}>
          <div className='productDetails__comments'>
            <Typography.Title level={3}>Reviews</Typography.Title>
            {product && handleRenderRating(allComment)}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProductDetails