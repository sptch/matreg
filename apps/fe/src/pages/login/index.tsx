// index page

import React from 'react';
import Login from 'containers/Login';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #374151;
  height: 100vh;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  padding: 20px;
`;

// Material register title
const Title = styled.h1`
  font-size: 62px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: 'IBM Plex Sans', sans-serif;
  padding-bottom: 80px;
`;
// whitespan style
const WhiteSpan = styled.span`
  color: #ffffff;
  font-family: 'IBM Plex Sans', sans-serif;
`;
//greyspan style
const GreySpan = styled.span`
  color: #6b7280;
  font-family: 'IBM Plex Sans', sans-serif;
`;

export default function LoginPage() {
  return (
    <Wrapper>
      <Title>
        Mat<GreySpan>erial</GreySpan>Reg<GreySpan>istry</GreySpan>
      </Title>
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    </Wrapper>
  );
}
