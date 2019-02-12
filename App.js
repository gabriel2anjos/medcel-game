/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"A96217A2-0EA6-4173-803C-ACCF333CB9F6",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.


export default class ViroSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sharedProps : sharedProps,
      visible1: true,
      visible2:false,
    }
    this._getARNavigator = this._getARNavigator.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
      return this._getARNavigator();
  }

  // Presents the user with a choice of an AR or VR experience

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    console.log(this.state.visible1)
    return (
      <View style={{ flex: 1 }}>
            <ViroARSceneNavigator {...this.state.sharedProps}
            style ={{flex:1}}
            initialScene={{scene: InitialARScene}} />
        <View style={localStyles.crosshair}/>
        <View style={localStyles.buttonsColumn}>
        { this.state.visible1 ? (
        <Image
        style= {{flex:1 , width: undefined, height: undefined, resizeMode: 'contain',}}
        source={require('./js/res/stethos.png')}
        />): null
        }
        { this.state.visible2 ? (
        <Image 
        style={{flex:1 , width: undefined, height: undefined, resizeMode: 'contain',}}
        source={require('./js/res/dialogue.png')}
        />
        ): null
        }
          </View>
      </View>

    );
  }
  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
  },
  inner: {
    flexDirection: 'column',
    alignItems:'center',
  },
  buttonsColumn: {position:'absolute', 
                  flexDirection:'column',
                  justifyContent: 'space-around',
                  right:10,
                  bottom:120,
                  width:50,
                  height:140,
                  flex:1
                },
  crosshair: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2),
    left: (Dimensions.get('window').width / 2),
    width: 5,
    height: 5,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
});

module.exports = ViroSample
