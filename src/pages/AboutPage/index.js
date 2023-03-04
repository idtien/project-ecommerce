import React from 'react'

import './About.scss'
import background from '../../assets/images/page_developing.jpg'
import useGoToTop from '../../hooks/useGoToTop'


const About = () => {
  useGoToTop()
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 className='about__title'>ABOUT PAGE is under construction</h1>
        <img style={{ width: '50%'}} src={background} alt='page' />
      </div>
    </>
  )
}

export default About