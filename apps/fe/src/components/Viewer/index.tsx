import {
  DefaultViewerParams,
  SelectionEvent,
  ViewerEvent,
  DebugViewer,
  Viewer,
} from '@speckle/viewer';

// const container = document.querySelector<HTMLElement>('#renderer');
// if (!container) {
//   throw new Error("Couldn't find #app container!");
// }

// const params = DefaultViewerParams;
// params.showStats = true;

// const viewer = new DebugViewer(container, params);

export default function ViewerComponent() {
  return <div id="renderer" />;
}
