import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  asset,
  VrButton,
  AmbientLight,
  PointLight
} from 'react-360';
import Entity from 'Entity';

export default class r360 extends React.Component {
  render() {
    return (
      <View>
        <VrButton
          onClick={() => {
              console.log(window)
            }}>
          <Text
            style={{
              fontSize: 100,
              color: '#000000'
            }}>Click</Text>
        </VrButton>

        <AmbientLight intensity={5} />
        <PointLight
          style={{
            color: 'white',
            transform: [
              {translate: [0, 0, 0]}
            ]
          }}
        />
        <Text
          style={{
            fontSize: 100,
            color: '#000000'
            }}>
          hey hey hey
        </Text>


        <Entity
          style={{
            transform: [
              {translate: [0, -15, -70]},
              {scale: 0.1},
              {rotateY: 0},
              {rotateX: -90},
            ],
          }}
          source={{
            obj: asset('creature.obj'),
            mtl: asset('creature.mtl'),
          }}
          lit={true}
        />

        </View>
    );
  }
};

AppRegistry.registerComponent('r360', () => r360);

