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


class ButtonComponent extends Component {


    constructor(props) {
        super(props);
        this.scaleValue = new Animated.Value(0);
        this.fadeInValue = new Animated.Value(0);
        // Bindings
        this.scale = this.scale.bind(this);
        this._onPress = this._onPress.bind(this);
        this.crossFade = this.crossFade.bind(this);
  
      var imgSource = this.props.stateImageArray[1];
      var imgClickSource = this.props.stateImageArray[0];
  
      this.buttonScale = this.scaleValue.interpolate({
        inputRange: [0, 0.5, 0.8, 1],
        outputRange: [1, 0.8, 1.1, 1]
      });
  
      this.opacity = this.fadeInValue.interpolate({
        inputRange: [0,1],
        outputRange: [0,1]
      });
    }
  
    componentDidMount() {
      if (this.props.selected) {
          this.fadeInValue.setValue(1);
      }
    }

    render() {
    return (
      <TouchableHighlight underlayColor="#00000000" onPress={this._onPress} style={this.props.style}>
        <View 
        >
          {/* <Image source={this.props.stateImageArray[0]}
          
          />
            <Animated.Image 
                source={this.props.stateImageArray[1]}
                style={[this.props.style,
                          {
                            transform:[
                              {scale: this.buttonScale}
                            ]
                          }
                      ]} />
            <Animated.Image 
              source={this.props.stateImageArray[0]}
              style={[this.props.style, {opacity: this.opacity}]} /> */}
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
      this.props.onPress();   
      requestAnimationFrame(() => {
 
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
