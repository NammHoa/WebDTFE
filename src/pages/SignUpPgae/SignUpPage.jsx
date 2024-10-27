import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperStyleTextLight, WrapperTextLogo } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogin from "../../assets/images/logoLoginn.png"
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/message'

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()


    const mutation = useMutationHook(
        data => UserService.signupUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation



    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleNavigateLogin()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])


    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleNavigateLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {

        mutation.mutate({ email, password, confirmPassword })
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgba(0,0,0,0.53)' }}>
            <div style={{ width: '800px', height: '450px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft style={{ borderRight: '1px solid gray' }}>
                    <h1 style={{ fontSize: '24px' }}>Xin chào</h1>
                    <p style={{ fontSize: '18px' }}>Đăng nhập hoặc Tạo tài khoản</p>

                    <InputFormComponent style={{ marginBottom: '10px' }} placeholder="Nhập email"
                        value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}>
                            {isShowPassword ? (<EyeFilled style={{ fontSize: '20px' }} />) : (<EyeInvisibleFilled style={{ fontSize: '20px' }} />)}
                        </span>
                        <InputFormComponent placeholder="Nhập mật khẩu" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}>
                            {isShowConfirmPassword ? (<EyeFilled style={{ fontSize: '20px' }} />) : (<EyeInvisibleFilled style={{ fontSize: '20px' }} />)}
                        </span>
                        <InputFormComponent placeholder="Nhập lại mật khẩu" style={{ marginBottom: '10px' }} type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                    </div>

                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40} styleButton={{ background: '#dc3545', height: '48px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }}
                            textButton={'Đăng ký'} styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}></ButtonComponent>
                    </Loading>
                    <p style={{ fontSize: '16px' }}>Bạn đã có tài khoản? <WrapperStyleTextLight onClick={handleNavigateLogin}>Đăng nhập</WrapperStyleTextLight></p>
                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image src={imageLogin} preview={false} alt="image-login" height="125px" width="125px" />
                    <WrapperTextLogo >Đăng nhập vào thế giới Jack</WrapperTextLogo>
                </WrapperContainerRight>
            </div>
        </div>
    )
}
export default SignUpPage