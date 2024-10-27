import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #f8f8f8;
  padding: 20px 0;
  font-size: 14px;
  color: #333;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1270px;
  margin: 0 auto;
  padding: 0 20px;
  flex-wrap: wrap;
`;

export const FooterColumn = styled.div`
  flex: 1;
  min-width: 220px;
  margin-bottom: 20px;
`;

export const FooterTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const FooterItem = styled.p`
  margin: 5px 0;
`;

export const FooterLink = styled.a`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

export const SocialMediaWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const SocialMediaIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;
