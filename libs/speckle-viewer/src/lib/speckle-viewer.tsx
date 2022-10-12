import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SpeckleViewerProps {}

const StyledSpeckleViewer = styled.div`
  color: pink;
`;

export function SpeckleViewer(props: SpeckleViewerProps) {
  return (
    <StyledSpeckleViewer>
      <h1>Welcome to SpeckleViewer!</h1>
    </StyledSpeckleViewer>
  );
}

export default SpeckleViewer;
