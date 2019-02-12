'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroFlexView,
  ViroImage,
  ViroUtils,
  ViroARCamera,
  ViroAmbientLight,
  ViroBox,
  ViroText,
  ViroARPlane,
  ViroQuad,
  ViroNode
} from 'react-viro';
let polarToCartesian = ViroUtils.polarToCartesian;

export default class HelloWorldSceneAR extends Component {
  
  constructor(props) {
    super(props);
    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      clicks : 0,
      rotation: [0,45,0],
      stetosVisible:true,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onClickBox = this._onClickBox.bind(this);
    this._onHover = this._onHover.bind(this);
  }

  render() {

    return (

      <ViroARScene onTrackingUpdated={this._onInitialized} onClick={this._onClick} ref={(component)=>{this.sceneRef = component}} physicsWorld={{gravity:[0, -9.81, 0],drawBounds:true}}>
        <ViroAmbientLight color="#ffffff" />
        <ViroARImageMarker target={"logo"} onAnchorFound={this._anchorFound} >
        <ViroImage
            height={.4}
            width={.4}
            source={require("./res/floor.jpg")}
            position={[0,0.01,0]}
            rotation={[270,0,0]}
          />

        <ViroAmbientLight color="#ffffff" />

        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _loadedObject(){
    console.log("Carregou")
  }

  _loadingObject(){
    console.log("Carregando")
  }


  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : ""
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  _onFuse(source){
    console.log("Fuse: ", source);
  }
  _onHover (isHovering, pos,source){
    console.log("gabriel")
    if(isHovering){
      this.setState({
        stetosVisible:true,
      });
    }
    else{
      this.setState({
        stetosVisible:false,
      });
    }
  }
  _onClick(state, reason) {
    console.log("click");
    this.sceneRef.getCameraOrientationAsync().then((orientation)=>{
        const from = orientation.position;
        console.log(orientation.position)
        const to = [orientation.forward[0] * 100, orientation.forward[1] * 100, orientation.forward[2] * 100]
        console.log(to)
        this.sceneRef.findCollisionsWithRayAsync(from, to, false, 'shoot').then((hasHit) =>
          console.log('hit?', hasHit)).catch(
            console.log("nope")
          );
    });
  }

  _anchorFound(){
    console.log("achou")
  }
  _anchorRemoved(){
    console.log("tirou")
  }
  _onClickBox(state, reason) {
    this.setState({
      
    });
    }
  }


var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroARTrackingTargets.createTargets({
  logo : {
    source : require('./res/qr-code.png'),
    orientation : "Up",
    physicalWidth : 0.165 // real world width in meters
  }
});

ViroMaterials.createMaterials({
  box: {
      cullMode: "None",
      shininess: 2.0,
      diffuseTexture: require('./res/rocket.png'),
    },
    // sophia: {
    //   shininess: 2.0,
    //   diffuseTexture:require('./res/girl/rp_sophia_animated_003_dif.jpg'),
    //   blendMode: "Multiply"
    // },
    heart: {
      lightingModel: "Blinn",
      diffuseTexture: require('./res/heart/Heart_D3.jpg'),
      specularTexture: require('./res/heart/Heart_S2.jpg'),
      writesToDepthBuffer: true,
      readsFromDepthBuffer: true,
    },
  })

ViroAnimations.registerAnimations({
  loopRotate:{properties:{rotateY:"+=45"}, duration:1000},
  scaleSphereUp:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 1500, easing: "bounce"},
});
  
module.exports = HelloWorldSceneAR;
