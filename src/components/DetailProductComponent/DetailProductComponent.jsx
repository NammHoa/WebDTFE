import { Col, Image, Rate, Row } from "antd";
import React, { useEffect } from "react";
import imageProduct from '../../assets/images/a.webp';
import imageProductSmall from '../../assets/images/a2.webp';
import { WrapperAddressProduct, WrapperPriceProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleTextPriceProduct, WrapperStyteNameProduct, WrapperTextPriceProduct } from "./style";
import {
    StarFilled
} from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService"
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
import { initFacebookSDK } from "../../utils";

const DetailProductComponent = ({ idProduct }) => {
    const onChange = () => { }
    const user = useSelector((state) => state.user)

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log('id', id)
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    useEffect(() => {
        initFacebookSDK()
    }, [])
    const { isPending, data: productDetail } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
    })


    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetail?.image} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <div style={{ marginInlineStart: '10px' }}>
                        <WrapperStyteNameProduct>{productDetail?.name}</WrapperStyteNameProduct>
                        <div>
                            <Rate allowHalf defaultValue={productDetail?.rating} value={productDetail?.rating} />
                            <WrapperStyleTextPriceProduct> | Đã bán 100+</WrapperStyleTextPriceProduct>
                        </div>
                        <WrapperPriceProduct>
                            <WrapperTextPriceProduct>{productDetail?.price} VND</WrapperTextPriceProduct>
                        </WrapperPriceProduct>

                        <WrapperAddressProduct>
                            <span>Giao đến </span>
                            <span className='address'>{user?.address} </span> -
                            <span className="changeaddress"> Đổi địa chỉ</span>
                        </WrapperAddressProduct>
                        <LikeButtonComponent dataHref={"https://developers.facebook.com/docs/plugins/"} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                            <ButtonComponent size={40} styleButton={{ background: '#288ad6', height: '48px', width: '220px', border: 'none', borderRadius: '4px' }} textButton={'Chọn mua'} styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}></ButtonComponent>
                            <ButtonComponent size={40} styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13,92,182)', borderRadius: '4px' }} textButton={'Mua trả góp 0%'} styleTextButton={{ color: 'rgb(13,92,182)', fontSize: '15px' }}></ButtonComponent>

                        </div>


                    </div>
                </Col>
                <CommentComponent dataHref={"http://developers.facebook.com/docs/plugins/comments#configurator"} width="1270px" />
            </Row>
        </Loading>
    )
}

export default DetailProductComponent