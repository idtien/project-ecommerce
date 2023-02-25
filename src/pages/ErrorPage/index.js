import React from 'react'
import HeaderCpn from '../../components/Header'
import FooterCpn from '../../components/Footer'
import error404 from '../../assets/images/error404.jpg'

const ErrorPage = () => {
  return (
    <>
      <HeaderCpn />
      <img src={error404} alt='Page Not Found' style={{ width: '100%', marginBottom: '-10px' }} />
      <FooterCpn />
    </>
  )
}

export default ErrorPage