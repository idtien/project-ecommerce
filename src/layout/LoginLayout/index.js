import React from 'react'
import FooterCpn from '../../components/Footer'
import HeaderLogin from '../../components/HeaderLogin'

const LoginLayout = ({ children }) => {
    return (
        <>
            <HeaderLogin />
            {children}
            <FooterCpn />
        </>
    )
}

export default LoginLayout