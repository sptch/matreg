import ViewerControl from '../ViewerControl';
import styled from 'styled-components';

const SpeckleViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

type ViewerProps = {
  objectUrl: string;
};

export function SpeckleViewer(props: ViewerProps) {
  return (
    <SpeckleViewerContainer>
      <ViewerControl objectUrl={props.objectUrl} />
    </SpeckleViewerContainer>
  );
}

export default SpeckleViewer;
