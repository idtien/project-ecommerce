import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterCpn from '../../components/Footer'
import HeaderCpn from '../../components/Header'

const HomeLayout = () => {
  return (
    <>
    <HeaderCpn/>
    <Outlet/>
    <FooterCpn/>
    </>
  )
}

export default HomeLayout