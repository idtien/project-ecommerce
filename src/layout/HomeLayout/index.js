import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import FooterCpn from '../../components/Footer'
import HeaderCpn from '../../components/Header'

const HomeLayout = () => {

  const isLogged = useSelector(state => state.users.isLogged)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <HeaderCpn />
      <Outlet />
      <FooterCpn />
    </>
  )
}

export default HomeLayout