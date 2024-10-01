import { Col, Image, Row } from "antd";
import React from "react";
import imageProduct from '../../assets/images/a.webp';
import imageProductSmall from '../../assets/images/a2.webp';
import { WrapperAddressProduct, WrapperPriceProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleTextPriceProduct, WrapperStyteNameProduct, WrapperTextPriceProduct } from "./style";
import {
    StarFilled
} from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const DetailProductComponent = () => {
    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={imageProduct} alt="image product" preview={false} />
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
                    <WrapperStyteNameProduct>Điện thoại iPhone 15 Pro 128GB</WrapperStyteNameProduct>
                    <div>
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54' }} />
                        <WrapperStyleTextPriceProduct> | Đã bán 100+</WrapperStyleTextPriceProduct>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperTextPriceProduct>28.990.000 đ</WrapperTextPriceProduct>
                    </WrapperPriceProduct>

                    <WrapperAddressProduct>
                        <span>Giao đến</span>
                        <span className='address'> 14/12a Văn Chung, P.13, Q.Tân Bình</span> -
                        <span className="changeaddress"> Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                        <ButtonComponent size={40} styleButton={{ background: '#288ad6', height: '48px', width: '220px', border: 'none', borderRadius: '4px' }} textButton={'Chọn mua'} styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}></ButtonComponent>
                        <ButtonComponent size={40} styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13,92,182)', borderRadius: '4px' }} textButton={'Mua trả góp 0%'} styleTextButton={{ color: 'rgb(13,92,182)', fontSize: '15px' }}></ButtonComponent>

                    </div>


                </div>
            </Col>
        </Row>
    )
}

export default DetailProductComponent