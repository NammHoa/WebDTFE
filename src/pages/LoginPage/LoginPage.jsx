import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperStyleTextLight, WrapperTextLogo } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogin from "../../assets/images/logoLoginn.png"
import { Image, message } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/slides/userSlide";
const LoginPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const mutation = useMutationHook(
        data => UserService.loginUser(data)
    )

    const { data, isPending, isSuccess } = mutation
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'OKE') {
                message.success('Đăng nhập thành công!')
                navigate('/');
                localStorage.setItem('access_token', JSON.stringify(data?.access_token));
                localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
                if (data?.access_token) {
                    const decoded = jwtDecode(data?.access_token);
                    if (decoded?.id) {
                        handleGetDetailsUser(decoded?.id, data?.access_token);
                    }
                }
            } else if (data?.status === 'ERR') {
                setErrorMessage(data?.errorMessage);
                clearTimeout();
            }
        }
    }, [isSuccess, data]);
    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate('/')
    //         localStorage.setItem('access_token', JSON.stringify(data?.access_token))
    //         if (data?.access_token) {
    //             const decoded = jwtDecode(data?.access_token)
    //             console.log('decode', decoded)
    //             if (decoded?.id) {
    //                 handleGetDetailsUser(decoded?.id, data?.access_token)
    //             }
    //         }
    //     }
    // }, [isSuccess])

    // useEffect(() => {
    //     if (isSuccess) {
    //         if (data?.status === 'OKE') {
    //             navigate('/');
    //             localStorage.setItem('access_token', JSON.stringify(data?.access_token));
    //             if (data?.access_token) {
    //                 const decoded = jwtDecode(data?.access_token);
    //                 if (decoded?.id) {
    //                     handleGetDetailsUser(decoded?.id, data?.access_token);
    //                 }
    //             }
    //         } else if (data?.status === 'ERR') {
    //             message.error(data?.message);
    //             clearTimeout()
    //         }
    //     }
    // }, [isSuccess, data]);



    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))

    }
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleLogin = () => {
        mutation.mutate({
            email,
            password
        })
    }



    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgb(0,0,0,0.53)' }}>
            <div style={{ width: ' 800px', height: '450px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft style={{ borderRight: '1px solid gray' }}>
                    <h1 style={{ fontSize: '24px' }}>Xin chào</h1>
                    <p style={{ fontSize: '18px' }}>Đăng nhập hoặc Tạo tài khoản</p>

                    <InputFormComponent style={{ marginBottom: '10px' }}
                        placeholder="Nhập email"
                        value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>

                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}>
                            {isShowPassword ? (<EyeFilled style={{ fontSize: '20px' }} />) : (<EyeInvisibleFilled style={{ fontSize: '20px' }} />)}
                        </span>
                        <InputFormComponent placeholde="Nhập mật khẩu" type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword} />
                    </div>

                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleLogin}
                            size={40} styleButton={{ background: '#dc3545', height: '48px', width: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px' }}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}></ButtonComponent>
                    </Loading>
                    <p><WrapperStyleTextLight> Quên mật khẩu?</WrapperStyleTextLight></p>
                    <p style={{ fontSize: '16px' }}>Chưa có tài khoản? <WrapperStyleTextLight onClick={handleNavigateSignUp} >Tạo tài khoản</WrapperStyleTextLight></p>
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