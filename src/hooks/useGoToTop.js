import { useLayoutEffect } from 'react'

const useGoToTop = () => {
  useLayoutEffect(()=> {
    window.scrollTo(0,0)
  }, [])
}

export default useGoToTop

