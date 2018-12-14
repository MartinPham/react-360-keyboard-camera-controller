// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance} from 'react-360-web';
import KeyboardCameraController from '@martinpham/react-360-keyboard-camera-controller';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });


  // r360.controls.clearCameraControllers();
  r360.controls.addCameraController(new KeyboardCameraController(r360._eventLayer)); // hacky

  // Render your app content to the default cylinder surface
  // r360.renderToSurface(
  //   r360.createRoot('r360', { /* initial props */ }),
  //   r360.getDefaultSurface()
  // );

r360.renderToLocation(
  r360.createRoot('r360'),
  r360.getDefaultLocation(),
);

  // console.log(r360.controls)
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('chess-world.jpg'));
}

window.React360 = {init};
