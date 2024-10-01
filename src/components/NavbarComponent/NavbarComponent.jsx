import React from "react";
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (

                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.value}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )

            case 'star':
                return options.map((option) => {
                    console.log('check', option)
                    return (
                        <div>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{` tu ${option} sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }
    return (
        <div>
            <WrapperLableText>Label</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Iphone', 'Laptop', 'Ipad'])}
            </WrapperContent>

        </div>
    )
}

export default NavbarComponent 