import { Input } from "antd";
import React from "react";
import { SearchOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, bordered, backgroundColorInput = '#fff', backgroundColorButton = '#fff', coclorButton = 'black' } = props
    return (
        <div style={{ display: 'flex', backgroundColor: 'white' }}>
            <Input
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, border: !bordered && 'none' }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined style={{ color: coclorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: coclorButton }}
            />
        </div>
    )
}

export default ButtonInputSearch