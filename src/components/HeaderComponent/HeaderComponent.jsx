import { Col } from "antd"
import React, { useEffect, useState } from "react"
import { WrapperHeader, WrapperHeaderAccount, WrapperText, WrapperTextSmall, WrapperContentPopup } from "./style"
import {
    UserOutlined,
    CaretDownOutlined,

} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import * as UserService from '../../services/UserService'
import { resetUser } from "../../redux/slides/userSlide";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from 'antd';
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";
const HeaderComponent = ({ isHiddenSearch = false }) => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [pending, setPending] = useState(false)
    const [search, setSearch] = useState('')
    const handleNavigationLogin = () => {
        navigate('/login')

    }

    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setPending(false)
    }

    useEffect(() => {
        setPending(true)
        setUserName(user?.name)
        setPending(false)
    }, [user?.name])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>

            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>

        </div>
    );

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
    return (
        <div style={{ width: '100%', background: '#ffd400', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperText>TheGioiJack</WrapperText>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton=""
                            bordered={false}
                            placeholder="Nhập thông tin"
                            onChange={onSearch}
                        />

                    </Col>
                )}

                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <Loading isPending={pending}>
                        <WrapperHeaderAccount>
                            <UserOutlined style={{ fontSize: `30px` }} />
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click" >
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>

                                </>
                            ) : (
                                <div onClick={handleNavigationLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextSmall>Đăng nhập/Đăng ký</WrapperTextSmall>
                                    <div>
                                        <WrapperTextSmall>Tài khoản</WrapperTextSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}

                        </WrapperHeaderAccount>
                    </Loading>
                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent