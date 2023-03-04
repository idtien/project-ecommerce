import React from 'react'
import background from '../../assets/images/page_developing3.jpg'
import useGoToTop from '../../hooks/useGoToTop'

const ContactPage = () => {
  useGoToTop()
  return (
    <div style={{ textAlign: 'center', }}>
     <h1>CONTACT PAGE</h1>
      <img style={{width: '65%' }} src={background} alt='page' />
    </div>
  )
}

export default ContactPage