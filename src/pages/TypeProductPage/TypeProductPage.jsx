import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as ProductService from "../../services/ProductService"
import { useLocation } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import { isPending } from "@reduxjs/toolkit";

const TypeProductPage = () => {
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [pending, setPending] = useState([])
    const fetchProductType = async (type) => {
        setPending(true)
        const res = await ProductService.getProductType(type)
        if (res?.status === 'OK') {
            setPending(false)
            setProducts(res?.data)
        } else {
            setPending(false)
        }
    }
    useEffect(() => {
        if (state) {
            fetchProductType(state)
        }
    }, [state])

    const onChange = () => { }
    return (
        <Loading isPending={pending}>
            <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
                <div style={{ width: '1270px', margin: ' 0 auto' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                        <WrapperNavbar span={4}>
                            <NavbarComponent />
                        </WrapperNavbar>

                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts >
                                {products?.map((product) => {
                                    return (
                                        <CardComponent
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            selled={product.selled}
                                            discount={product.discount}
                                            id={product._id}
                                        />
                                    )
                                })}

                            </WrapperProducts>
                            <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ display: 'flex', marginTop: '10px', justifyContent: 'center' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}

export default TypeProductPage