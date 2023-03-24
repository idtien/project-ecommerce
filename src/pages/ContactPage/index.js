import React, { useEffect } from 'react'
import background from '../../assets/images/page_developing3.jpg'
import useGoToTop from '../../hooks/useGoToTop'

const ContactPage = () => {
  useGoToTop()
  useEffect(() => {
    document.title = 'SHOP MALL - Contact';
  }, []);
  return (
    <div style={{ textAlign: 'center', }}>
     <h1>CONTACT PAGE</h1>
      <img style={{width: '65%' }} src={background} alt='page' />
    </div>
  )
}

export default ContactPage