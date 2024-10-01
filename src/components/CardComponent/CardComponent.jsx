import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDisountText, WrapperPriceText, WrapperReportText, WrapperStyleTextPriceProduct } from "./style";
import logo from '../../assets/images/logogiam.png'
import {
    StarFilled
} from '@ant-design/icons';
const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            headStyle={{ width: '200px', height: '200px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://techdabali.com/uploads/test/10471-iphone-14-pro-max-deep-purple.jpg" />}
        >
            <img src={logo} style={{ width: '50px', height: '50px', position: 'absolute', top: -1, left: -1, borderTopLeftRadius: '3px' }} />
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96 </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54' }} />
                </span>
                <WrapperStyleTextPriceProduct> | Đã bán 100+</WrapperStyleTextPriceProduct>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>28.900.000</span>
                <WrapperDisountText>
                    -5%
                </WrapperDisountText>
            </WrapperPriceText>
        </WrapperCardStyle >
    )
}
export default CardComponent