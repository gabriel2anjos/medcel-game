/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import {StyleSheet,
        TouchableHighlight,
        Animated,
        Easing,
        Image,
        View,
        } from 'react-native';
import PropTypes from 'prop-types';

import renderIf from '../helpers/renderIf';

/**
 * A 2D UI "on glass" button, standard React Native component. Class encapsulating states, animations, and other details for a Buttons in the app. 
 * Used for selecting Portals, Effects, Objects on the left of the screen above listview
 */
class ButtonComponent extends Component {
  constructor(props) {
    super(props);

    var imgSource = this.props.stateImageArray[1];
    var imgClickSource = this.props.stateImageArray[0];

  }

  render() {
    return (
      <TouchableHighlight underlayColor="#00000000" onPress={this._onPress}>
        <View >
        <Image style= {{flex:1 , width: undefined, height: undefined, resizeMode: 'contain',}}
        source={require('./js/res/dialogue.png')}
        />
        </View>
      </TouchableHighlight>
      );
  }

    componentDidUpdate() {
    if(this.props.buttonState === 'off') {
      this.fadeInValue.setValue(0);
    }    
  }
  _onPress() {
    if (this.props.buttonState === 'off') {
      this.scale();
      // from https://facebook.github.io/react-native/docs/performance.html#my-touchablex-view-isn-t-very-responsive
      requestAnimationFrame(() => {
        this.props.onPress();   
      });
    }
  }

  // Scale animation
  scale() {
    this.scaleValue.setValue(0);
    this.fadeInValue.setValue(0);
    Animated.timing(
        this.scaleValue,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.easeInOutBack,
          useNativeDriver: true,
        }
    ).start(() => {
      this.crossFade();
    });
  }

  // Crossfade animation
  crossFade() {
    this.fadeInValue.setValue(0);
    Animated.timing(
      this.fadeInValue,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true, 
      }
    ).start();
  }
}

ButtonComponent.propTypes = {
        onPress: PropTypes.func.isRequired,
        buttonState: PropTypes.oneOf(['on', 'off']).isRequired,
        stateImageArray: PropTypes.array.isRequired,
        style: PropTypes.any,
        selected: PropTypes.bool,
};

export default ButtonComponent;
