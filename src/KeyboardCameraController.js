/**
 * Martin <i@martinpham.com>
 * 
 * @flow
 */

import {type Quaternion, type Vec3} from 'react-360-web/js/Controls/Types';
import {type CameraController} from 'react-360-web/js/Controls/CameraControllers/Types';



const MOVING_SPEED = 10;

export default class KeyboardCameraController implements CameraController {
  _movingZ: number;
  _movingX: number;

  constructor(frame: HTMLElement) {
    this._frame = frame;
    this._movingZ = 0;
    this._movingX = 0;


    (this: any)._onKeyDown = this._onKeyDown.bind(this);
    (this: any)._onKeyUp = this._onKeyUp.bind(this);
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    this._frame.addEventListener('keydown', this._onKeyDown);
    this._frame.addEventListener('keyup', this._onKeyUp);

    window.addEventListener("message", (event) => {
      console.log(event)
      if(event.data.type ==='KEYBOARD_MESSAGE')
      {
        if(event.data.direction ==='UP')
        {
          this._movingZ = -MOVING_SPEED;
        }else if(event.data.direction ==='DOWN')
        {
          this._movingZ = MOVING_SPEED;
        }else if(event.data.direction ==='LEFT')
        {
          this._movingX = -MOVING_SPEED;
        }else if(event.data.direction ==='RIGHT')
        {
          this._movingX = MOVING_SPEED;
        }
      }
    }, false);

  }

  _onKeyUp(e: KeyboardEvent) {
    // this._enabled = false;
  }

  _onKeyDown(e: KeyboardEvent) {
    // this._enabled = true;

    if (e.keyCode == '38') {
        // up arrow
        this._movingZ = -MOVING_SPEED;
        // console.log('move forward')
    }
    else if (e.keyCode == '40') {
        // down arrow
        this._movingZ = MOVING_SPEED;
        // console.log('move back')
    }
    else if (e.keyCode == '37') {
       // left arrow
        // console.log('move left')
        this._movingX = -MOVING_SPEED;
    }
    else if (e.keyCode == '39') {
       // right arrow
        // console.log('move right')
        this._movingX = MOVING_SPEED;
    }
  }

  fillCameraProperties(position: Vec3, rotation: Quaternion): boolean {


    if (this._movingZ === 0 && this._movingX === 0) {
      return false;
    }


    const a = rotation[3];
    const b = rotation[0];
    const c = rotation[1];
    const d = rotation[2];

    // const rotateYZ = Math.atan((2 * (a * b + c * d)) / (a * a - b * b - c * c + d * d));
    const rotateZX = -Math.asin(2 * (b * d - a * c));
    // const rotateXY = Math.atan((2 * (a * d + b * c)) / (a * a + b * b - c * c - d * d))
    // console.log(rotateZX, rotateYZ, rotateXY);
    
    if(this._movingZ !== 0)
    {

      position[2] = position[2] + this._movingZ * Math.cos(rotateZX);
      position[0] = position[0] + this._movingZ * Math.sin(rotateZX);

    // console.log(rotateZX, position);

    }
    if(this._movingX !== 0)
    {

      position[2] = position[2] - this._movingX * Math.sin(rotateZX);
      position[0] = position[0] + this._movingX * Math.cos(rotateZX);

    // console.log(rotateZX, position);

    }



    this._movingZ = 0;
    this._movingX = 0;


    return true;
  }
}
