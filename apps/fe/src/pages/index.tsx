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
        <SpeckleViewer objectUrl="https://speckle.xyz/streams/92681d64c6/objects/9b5144415c4033c3e7930ceb64421057" />
      </Panel>
      <SpeckleViewer objectUrl="https://speckle.xyz/streams/6c18eaf66a/objects/6460234e18f90d28d3f05056991bbeb6" />
    </Wrapper>
  );
}
