# @martinpham/react-360-keyboard-camera-controller

Provide Keyboard Camera Controller for your React 360 project. Now you can navigate inside 3D world using your arrow keys.

## Installing

```sh
yarn add @martinpham/react-360-keyboard-camera-controller
```

## Integrating

```sh
import KeyboardCameraController from '@martinpham/react-360-keyboard-camera-controller';

...

r360.controls.addCameraController(new KeyboardCameraController(r360._eventLayer));
```

