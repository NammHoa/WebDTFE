import { Col } from "antd"
import React from "react"
import { WrapperHeader, WrapperHeaderAccount, WrapperText, WrapperTextSmall } from "./style"
import {
    UserOutlined,
    CaretDownOutlined,

} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
const HeaderComponent = () => {
    return (
        <div style={{ width: '100%', background: '#ffd400', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader gutter={12}>
                <Col span={5}>
                    <WrapperText>TheGioiJack</WrapperText>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        textButton=""
                        bordered={false}
                        placeholder="Nhập thông tin"

                    //onSearch={onSearch} 
                    />

                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: `30px` }} />
                        <div>
                            <WrapperTextSmall>Đăng nhập/Đăng ký</WrapperTextSmall>

                            <div>
                                <WrapperTextSmall>Tài khoản</WrapperTextSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent