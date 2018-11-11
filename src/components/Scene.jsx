import React from 'react';
import * as THREE from 'three'

import '../styles/Scene.css';

export default class Scene extends React.Component {
  constructor(props) {
    super(props);

    //this.state = { width: 0, height: 0 };

    //declare three js stuff for the scene
    this.scene = null;//new THREE.Scene();
    this.camera = null;//new THREE.PerspectiveCamera(75, this.state.sceneWidth / this.state.sceneWidth, 0.1, 1000);
    this.renderer = null;//new THREE.WebGLRenderer({ antialias: true });
    this.geometry = null;//new THREE.BoxGeometry(1, 1, 1);
    this.material = null;//new THREE.MeshBasicMaterial({ color: '#433F81' });
    this.cube = null;//new THREE.Mesh(this.geometry, this.material);

    //set up bindings
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.updateSceneDimensions = this.updateSceneDimensions.bind(this);

  }

  componentDidMount() {

    //Init three js stuff for the scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: '#433F81' });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.cube.position.y = 2;
    this.cube.position.x = 2;
    this.updateSceneDimensions();
    window.addEventListener('resize', this.updateSceneDimensions);



    //do inital config for three js sceneWidth
    this.camera.position.z = 4;
    this.scene.add(this.cube);
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    this.sceneContainer.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.sceneContainer.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.updateSceneDimensions);
  }

  updateSceneDimensions() {
    //update the state and renderer size which is the size of the three js scene
    //this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        className="scene-container"
        ref={(sceneContainer) => { this.sceneContainer = sceneContainer }}
      />
    )
  }
}
