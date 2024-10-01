import React, { useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperStyleTextLight, WrapperTextLogo } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogin from "../../assets/images/logoLoginn.png"
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
const LoginPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgba(0,0,0,0.53)' }}>
            <div style={{ width: ' 800px', height: '450px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft style={{ borderRight: '1px solid gray' }}>
                    <h1 style={{ fontSize: '24px' }}>Xin chào</h1>
                    <p style={{ fontSize: '18px' }}>Đăng nhập hoặc Tạo tài khoản</p>

                    <InputFormComponent style={{ marginBottom: '10px' }} placeholder="Nhập email" />
                    <div style={{ position: 'relative' }}>
                        <span style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}>
                            {isShowPassword ? (<EyeFilled style={{ fontSize: '20px' }} />) : (<EyeInvisibleFilled style={{ fontSize: '20px' }} />)}
                        </span>
                        <InputFormComponent placeholde="Nhập mật khẩu" type={isShowPassword ? "text" : "Nhập mật khẩu"}></InputFormComponent>
                    </div>
                    <ButtonComponent size={40} styleButton={{ background: '#dc3545', height: '48px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }} textButton={'Đăng nhập'} styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}></ButtonComponent>
                    <p><WrapperStyleTextLight> Quên mật khẩu?</WrapperStyleTextLight></p>
                    <p style={{ fontSize: '16px' }}>Chưa có tài khoản? <WrapperStyleTextLight>Tạo tài khoản</WrapperStyleTextLight></p>
                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image src={imageLogin} preview={false} alt="image-login" height="125px" width="125px" />
                    <WrapperTextLogo >Đăng nhập vào thế giới Jack</WrapperTextLogo>
                </WrapperContainerRight>
            </div>
        </div>
    )
}
export default LoginPage