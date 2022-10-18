// index page

import React, { useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import Viewer from 'containers/Viewer';
import ViewerPreview from 'containers/ViewerPreview';
import { useRecoilState } from 'recoil';
import { atoms } from 'common/recoli';

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
  const [selected, setSelected] = useRecoilState(atoms.selectedObjectId);
  return (
    <Wrapper>
      {selected && (
        <Panel>
          <ViewerPreview />
        </Panel>
      )}
      <Viewer />
    </Wrapper>
  );
}
