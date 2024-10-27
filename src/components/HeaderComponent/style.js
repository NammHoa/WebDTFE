import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 0;
    background-color: #ffd400;
    align-items: center;
    width: 1270px;
    flex-wrap: nowrap;
    gap: 16px;
    

`

export const WrapperText = styled.span`
    font-size: 20px;
    color: black;
    font-weight: bold;
    text-align:left;
`

export const WrapperHeaderAccount = styled.div` 
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
`   

export const WrapperTextSmall = styled.span`
    font-size:12px
    color: black
    `

export const WrapperHeaderCart = styled.span` 
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    `

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26,148,255);
    }
`