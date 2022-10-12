import ViewerControl from '../ViewerControl';
import styled from 'styled-components';

const SpeckleViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export function SpeckleViewer() {
  return (
    <SpeckleViewerContainer>
      <ViewerControl />
    </SpeckleViewerContainer>
  );
}

export default SpeckleViewer;
