import { CarOutlined, HeartOutlined, LeftOutlined, RightOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Carousel, Col, Divider, Form, Image, Input, InputNumber, Rate, Row, Space, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import TextArea from 'antd/es/input/TextArea'
import React, { useRef } from 'react'
import './ProductDetail.scss'

const ProductDetails = () => {
  const ref = useRef()
  const contentStyle = {
    margin: 0,
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
  };


  return (
    <>
      <Row className='productDetails'>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 2 }}>
          <div className='productDetails__img'>
            <Carousel
              dots={false}
              ref={ref}
            >
              <div >
                <Image
                  style={contentStyle}
                  width={'100%'}
                  src="https://img.vn/uploads/thuvien/singa-png-20220719150401Tdj1WAJFQr.png"
                />
              </div>
              <div >
                <Image
                  style={contentStyle}
                  width={'100%'}
                  src="https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </div>
              <div >
                <Image
                  style={contentStyle}
                  width={'100%'}
                  src="https://onlinejpgtools.com/images/examples-onlinejpgtools/orange-flower.jpg"
                />
              </div>
              <div >
                <Image
                  style={contentStyle}
                  width={'100%'}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
            </Carousel>
            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button onClick={() => {
                  ref.current.prev()
                }}>
                  <LeftOutlined />
                  Prev Photo
                </Button>

                <Button onClick={() => {
                  ref.current.next()
                }}>
                  Next Photo
                  <RightOutlined />
                </Button>
              </Space>
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <div className='productDetails__details'>
            <div className='productDetails__details--title'>
              Tổng hợp Khẩu trang KF94 dễ thở, không gây bí, không gây mụn, ngăn ngừa khói bụi, bảo vệ đường hô hấp bạn.
            </div>
            <div className='productDetails__details--rate'>
              <div className='productDetails__details--star'>
                <span>Rates: </span>
                <Rate disabled defaultValue={2} />
              </div>
              <Divider type="vertical" style={{ height: '20px', border: '1px solid #000' }} />
              <div className='productDetails__details--sold'>
                <span>Sold: </span>
                12k
              </div>
            </div>
            <Divider />
            <div className='productDetails__details--info'>
              <div>
                <strong>
                  Price:
                </strong>
                <span className='productDetails__details--infoPrice'>
                  $100
                </span>
              </div>
              <div>
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
              </div>
              <div>
                <strong>
                  Color:
                </strong>
                <span className='productDetails__details--infoColor'>
                  <Avatar shape="square" size='large' style={{ backgroundColor: 'red' }} />
                </span>
              </div>
              <div>
                <strong>
                  Type:
                </strong>
                <span className='productDetails__details--infoType'>
                  Computer
                </span>
              </div>
              <div>
                <strong>
                  Quantity:
                </strong>
                <span className='productDetails__details--infoQuantity'>
                  <InputNumber size="large" style={{ width: '150px' }} min={1} max={100000} defaultValue={1} />
                </span>
              </div>
            </div>
            <div className='productDetails__details--btn'>
              <Space>
                <Button type="primary" shape="round" style={{ backgroundColor: '#ff7875' }} icon={<HeartOutlined />} size='large'>
                  {/* ADD TO WISHLIST */}
                </Button>
                <Button type="primary" shape="round" style={{ backgroundColor: '#ff4d4f' }} icon={<ShoppingCartOutlined />} size='large'>
                  BUY IT NOW
                </Button>
                <Button type='primary' shape="round" style={{ backgroundColor: '#69b1ff' }} icon={<CarOutlined />} size='large'>
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
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
                  est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius
                  modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
                  veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                  ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
                  voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem
                  eum fugiat quo voluptas nulla pariatur
                </p>
              </Card>
            </div>
          </div>
        </Col>
        <Divider />
        <Col span={20} offset={2}>
          <div className='productDetails__comments'>
            <Typography.Title level={3}>Send Reviews</Typography.Title>
            {/* <Typography.Text level={3}>Send Reviews</Typography.Text> */}

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