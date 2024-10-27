import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDisountText, WrapperPriceText, WrapperReportText, WrapperStyleTextPriceProduct } from "./style";
import logo from '../../assets/images/logogiam.png'
import {
    StarFilled
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, selled, discount, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/detail-product/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            headStyle={{ width: '200px', height: '200px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
        >
            <img src={logo} style={{ width: '50px', height: '50px', position: 'absolute', top: -1, left: -1, borderTopLeftRadius: '3px' }} />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54' }} />
                </span>
                <WrapperStyleTextPriceProduct> | Đã bán {selled || 100}+</WrapperStyleTextPriceProduct>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{price?.toLocaleString()}</span>
                <WrapperDisountText>
                    - {discount || 5}%
                </WrapperDisountText>
            </WrapperPriceText>
        </WrapperCardStyle >
    )
}
export default CardComponent