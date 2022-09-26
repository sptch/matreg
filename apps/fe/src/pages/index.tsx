// index page

import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { theme } from '../pages/_app';
import { Title } from 'components/sharedstyles';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Index() {
  return (
    <Wrapper>
      <Title>Material Registry</Title>
    </Wrapper>
  );
}
