import { Card } from "antd";
import styled from "styled-components";


export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
    height: 200px;
    weight: 200px;
    },
    position: relative;
`



export const StyleNameProduct = styled.div `
    font weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: black;
`
export const WrapperReportText = styled.div `
    display: flex;
    font-size: 11px;
    align-items: center;
    color: rgb(128, 128, 137);
    margin: 6px 0 0;

`
export const WrapperPriceText = styled.div `
    font-size: 16px;
    font-weight: 500;
    color: rgb(255, 66, 78);
`
export const WrapperDisountText = styled.span `
    font-size: 16px;
    font-weight: 500;
    color: rgb(255, 66, 78);
`
export const WrapperStyleTextPriceProduct = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120);
`