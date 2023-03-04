import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handleDebounce = setTimeout(()=> setDebounceValue(value), delay)

        return () => clearTimeout(handleDebounce)
    }, [value])

    return debounceValue
}

export default useDebounce