import { Card, Col, Input, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BE_URL } from '../../constants/config'
import useDebounce from '../../hooks/useDebounce'
import ProductItem from '../ProductItem'

const SearchCpn = () => {
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const wrapperSearchRef = useRef(null)

    const debounce = useDebounce(searchValue, 500)

    const inputRef = useRef();

    useEffect(() => {
        setLoading(true)
        try {
            if (!debounce.trim()) {
                setSearchResult([])
                return
            }
            async function fetchDataProduct() {
                const dataSearch = await axios.get(`${BE_URL}products?q=${debounce}`)
                setSearchResult(dataSearch.data)
            }

            fetchDataProduct();

        } catch (error) {
            setLoading(true)
        } finally {
            setLoading(false)
        }
    }, [debounce])


    useEffect(() => {
        // Alert if clicked on outside of element
        function handleClickOutside(event) {
          if (wrapperSearchRef.current && !wrapperSearchRef.current.contains(event.target)) {
            setShowResult(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperSearchRef]);

    const handleChangeInputSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const handleFoCusSearch = () => {
        setShowResult(true)
        
    }

    return (
        <div className='header__main--search' style={{ display: 'block', position: 'fixed', top: '20px', left: '25%' }}>
            <Row>
                <Col span={24}>
                    <Input.Search
                        size="large"
                        allowClear
                        placeholder='Type to search'
                        onChange={handleChangeInputSearch}
                        value={searchValue}
                        ref={inputRef}
                        onFocus={handleFoCusSearch}
                        loading={loading}
                    />
                </Col>
                <Col span={24}>
                    {showResult && searchResult.length > 0 && (
                        <Card
                            style={{
                                width: '100%',
                                marginTop: 16,
                                maxHeight: 300,
                                overflowY: "auto"
                            }}
                            ref={wrapperSearchRef}
                        >
                            {searchResult.map((data) => {
                                return <ProductItem key={data.id} data={data} />
                            })}
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default SearchCpn