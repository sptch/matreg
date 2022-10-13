// index page

import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { theme } from '../pages/_app';
import { Title } from 'components/sharedstyles';
import { SpeckleViewer } from '@speckle-viewer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// viewer vindow top right corner panel
const Panel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 480px;
  height: 244px;
  border: 3px solid #ffffff;
  color: white;
  padding: 10px;
  border-radius: 20px;
  background-color: #d3d3d3;
  z-index: 100;
`;

export default function Index() {
  return (
    <Wrapper>
      {/* <Title>Material Registry</Title> */}
      <Panel>
        <SpeckleViewer objectUrl="https://speckle.xyz/streams/da9e320dad/objects/f6d0eba212d0a90a135f000619e709d7" />
      </Panel>
      <SpeckleViewer objectUrl="https://speckle.xyz/streams/da9e320dad/objects/31d10c0cea569a1e26809658ed27e281" />
    </Wrapper>
  );
}
