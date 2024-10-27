import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable } from "./Style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from '../../services/UserService'
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as message from '../../components/Message/message'
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const { data, isPending, isSuccess, isError } = mutation
    const dispatch = useDispatch()

    console.log('data', data)
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)

    }, [user])


    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])


    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }



    const handleOnchangeEmail = (value) => {
        setEmail(value)

    }

    const handleOnchangeName = (value) => {
        setName(value)

    }
    const handleOnchangePhone = (value) => {
        setPhone(value)

    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)

    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, name, email, phone, address, access_token: user?.access_token })
    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isPending={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLable htmlFor="name">Name</WrapperLable>
                        <InputFormComponent style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40} styleButton={{ height: '30px', width: 'fit-content', padding: '6px', borderRadius: '4px' }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLable htmlFor="email">Email</WrapperLable>
                        <InputFormComponent style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40} styleButton={{ height: '30px', width: 'fit-content', padding: '6px', borderRadius: '4px' }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLable htmlFor="phone">Phone</WrapperLable>
                        <InputFormComponent style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40} styleButton={{ height: '30px', width: 'fit-content', padding: '6px', borderRadius: '4px' }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLable htmlFor="address">Address</WrapperLable>
                        <InputFormComponent style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40} styleButton={{ height: '30px', width: 'fit-content', padding: '6px', borderRadius: '4px' }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: '#efefef', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>

        </div>
    )
}
export default ProfilePage