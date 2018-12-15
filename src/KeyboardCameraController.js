/**
 * Martin <i@martinpham.com>
 */

import {Vector3, Quaternion} from 'three';


const MOVING_SPEED = 3;

class ObjectNotation {
  position = null;
  quaternion = null;

  constructor(position, quaternion) {
    this.position = position;
    this.quaternion = quaternion;
  }

  translateOnAxis = (axis, distance) => {
    const v1 = new Vector3();

    v1.copy(axis).applyQuaternion(this.quaternion);

    this.position.add(v1.multiplyScalar(distance));

  };

  translateX = (distance) => {
    this.translateOnAxis(new Vector3(1, 0, 0), distance);
  };
  translateY = (distance) => {
    this.translateOnAxis(new Vector3(0, 1, 0), distance);
  };
  translateZ = (distance) => {
    this.translateOnAxis(new Vector3(0, 0, 1), distance);
  };
}


export default class KeyboardCameraController {
  _movingZ = 0;
  _movingX = 0;

  constructor(frame) {
    this.frame = frame;


    document.addEventListener('keydown', (event) => this.onKeyDown(event));

    this.frame.addEventListener('keydown', (event) => this.onKeyDown(event));

    window.addEventListener("message", (event) => {
      if(event.data.type ==='KEYBOARD_MESSAGE')
      {
        if(event.data.direction ==='UP')
        {
          this._moveForward();
        }else if(event.data.direction ==='DOWN')
        {
          this._moveBackward();
        }else if(event.data.direction ==='LEFT')
        {
          this._moveLeft();
        }else if(event.data.direction ==='RIGHT')
        {
          this._moveRight();
        }
      }
    }, false);
  }

  _moveForward = () => {
    this._movingZ = -MOVING_SPEED;
  }

  _moveBackward = () => {
    this._movingZ = MOVING_SPEED;
  }

  _moveLeft = () => {
    this._movingX = -MOVING_SPEED;
  }

  _moveRight = () => {
    this._movingX = MOVING_SPEED;
  }


  onKeyDown = (event) => {
    if (event.keyCode === 38) {
      this._moveForward();
    }
    else if (event.keyCode === 40) {
      this._moveBackward();
    }
    else if (event.keyCode === 37) {
      this._moveLeft();
    }
    else if (event.keyCode === 39) {
      this._moveRight();
    }
  }

  fillCameraProperties(positionArray, rotationArray) {
    if (this._movingZ === 0 && this._movingX === 0) {
      return false;
    }


    const quaternion = new Quaternion(rotationArray[0], rotationArray[1], rotationArray[2], rotationArray[3]);
    const position = new Vector3(positionArray[0], positionArray[1], positionArray[2]);

    const cameraObjectNotation = new ObjectNotation(position, quaternion);

    if(this._movingZ !== 0)
    {
      cameraObjectNotation.translateZ(this._movingZ);
    }

    if(this._movingX !== 0)
    {
      cameraObjectNotation.translateX(this._movingX);
    }


    positionArray[0] = cameraObjectNotation.position.x;
    positionArray[1] = cameraObjectNotation.position.y;
    positionArray[2] = cameraObjectNotation.position.z;


    this._movingZ = 0;
    this._movingX = 0;


    return true;
  }
}
