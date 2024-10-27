import React from 'react';
import {
  FooterWrapper,
  FooterContent,
  FooterColumn,
  FooterTitle,
  FooterItem,
  FooterLink,
  SocialMediaWrapper,
  SocialMediaIcon
} from './FooterStyle';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        {/* Support Section */}
        <FooterColumn>
          <FooterTitle>Tổng đài hỗ trợ</FooterTitle>
          <FooterItem>Gọi mua: <FooterLink href="tel:1900232460">1900 232 460</FooterLink> (8:00 - 21:30)</FooterItem>
          <FooterItem>Gọi khiếu nại: <FooterLink href="tel:18001062">1800 1062</FooterLink> (8:00 - 21:30)</FooterItem>
          <FooterItem>Bảo hành: <FooterLink href="tel:1900232464">1900 232 464</FooterLink> (8:00 - 20:00)</FooterItem>
        </FooterColumn>

        {/* Company Information Section */}
        <FooterColumn>
          <FooterTitle>Về công ty</FooterTitle>
          <FooterItem><FooterLink href="#">Giới thiệu công ty</FooterLink></FooterItem>
          <FooterItem><FooterLink href="#">Tuyển dụng</FooterLink></FooterItem>
          <FooterItem><FooterLink href="#">Gửi góp ý, khiếu nại</FooterLink></FooterItem>
        </FooterColumn>

        {/* Social Media Section */}
        <FooterColumn>
          <FooterTitle>Kết nối với chúng tôi</FooterTitle>
          <SocialMediaWrapper>
            <SocialMediaIcon src="path-to-your-facebook-icon" alt="Facebook" />
            <SocialMediaIcon src="path-to-your-youtube-icon" alt="YouTube" />
            <SocialMediaIcon src="path-to-your-zalo-icon" alt="Zalo" />
          </SocialMediaWrapper>
        </FooterColumn>
      </FooterContent>

      {/* Bottom Copyright Section */}
      <FooterContent>
        <FooterItem>© 2018. Công ty cổ phần Thế Giới Di Động.</FooterItem>
        <FooterItem>Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP.Hồ Chí Minh.</FooterItem>
        <FooterItem>Điện thoại: 028 38125960</FooterItem>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
