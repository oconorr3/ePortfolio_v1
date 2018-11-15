import React from 'react';
import * as THREE from 'three';
import { EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import '../styles/Scene.css';



export default class Scene extends React.Component {
  constructor(props) {
    super(props);

    //this.state = { width: 0, height: 0 };
    this.viewSize = 40;
    this.originalAspect = null;
    this.image = 'background.jpg';
    this.loader = null;

    //declare three js stuff for the scene
    this.scene = null;//new THREE.Scene();
    this.camera = null;//new THREE.PerspectiveCamera(75, this.state.sceneWidth / this.state.sceneWidth, 0.1, 1000);
    this.renderer = null;//new THREE.WebGLRenderer({ antialias: true });

    //testing stuff
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouse = null;
    this.mouseFocus = false;
    this.spotLight = null;

    this.shadersTime = 0;
    //set up in shader
    this.wallGeometry = null;
    this.wallMaterial = null;
    this.wallMesh = null;
    this.wallUniforms = null;

    this.shaderResolution = null;
    this.composer = null;
    this.group = null;


    this.geometry = null;//new THREE.BoxGeometry(1, 1, 1);
    this.material = null;//new THREE.MeshBasicMaterial({ color: '#433F81' });
    this.cube = null;//new THREE.Mesh(this.geometry, this.material);


    //set up bindings
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.updateSceneDimensions = this.updateSceneDimensions.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

  }

  componentDidMount() {

    //setUpScene
    this.mouse = new THREE.Vector2(this.mouseX, this.mouseY);
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();

    this.setUpRenderer();

    this.setUpCamera();
    this.group.add(this.camera);



    this.setUpShaderWall();
    this.group.add(this.wallMesh);

    this.setUpSpotLight(this.scene);
    this.group.add(this.spotLight);

    this.setUpComposer();
    this.updateSceneDimensions();
    this.scene.add(this.group);

    let texture = new THREE.TextureLoader().load( this.image );

    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.material = new THREE.MeshBasicMaterial({ map: texture });
    this.cube = new THREE.Mesh(this.geometry, this.material);

    this.cube.position.z = -10;
    this.scene.add(this.cube);

    window.addEventListener('mousemove', this.onDocumentMouseMove);
    window.addEventListener('resize', this.updateSceneDimensions);
    window.addEventListener('mouseout', this.mouseOut);
    this.sceneContainer.appendChild(this.renderer.domElement);
    console.log("111w " + this.renderer.domElement.width + " h " + this.renderer.domElement.height);

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.sceneContainer.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.updateSceneDimensions);
    window.removeEventListener('mousemove', this.onDocumentMouseMove);
    window.removeEventListener('mouseout', this.mouseOut);
  }

  mouseOut(e) {
    e= e ? e: window.event;
    let from = e.relatedTarget || e.toElement;
    if(!from || from.nodeName === "HTML") {
      this.mouseFocus =  !1;
    }
  }

  onDocumentMouseMove(event) {
    this.mouseX =- ((event.clientX - (window.innerWidth / 2))) / (window.innerWidth / 2);
    this.mouseY =- ((event.clientY - (window.innerHeight / 2))) / (window.innerHeight / 2);
    if(!this.mouseFocus)
      this.mouseFocus = true;
  }

  updateSceneDimensions() {
    if (this.camera != null) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }

    this.shaderResolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    if (this.wallMesh != null) {
      this.wallMesh.material.uniforms.resolution.value= this.shaderResolution;
      this.wallUniforms.resolution.value = this.shaderResolution;
      this.wallMesh.material.needsUpdate = !0;
    }

    if (this.renderer != null) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth , window.innerHeight);

    }

    if (this.composer != null) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  //set up the camera for the sceneWidth
  setUpCamera() {

    this.updateSceneDimensions();
    this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000);
    this.camera.position.set(0, 0, 1);
  }

  setUpShaderWall() {
    this.shaderResolution = new THREE.Vector2(window.width, window.height);
    this.wallUniforms = {
      time:{value:1.0},
      resolution:{value:this.shaderResolution},
      mouse:{value:this.mouse},
      alpha:{value:1.0},
      sndUpperAvg:{value:0.0}
    };

    this.wallGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 32);
    this.wallMaterial = new THREE.ShaderMaterial({
      uniforms: this.wallUniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragment_shader').textContent
    });

    this.wallMaterial.side = THREE.DoubleSide;
    this.wallMaterial.transparent = true;
    this.wallMesh = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
    this.wallMesh.rotation.y = 0;
    this.wallMesh.position.z = -100;
  }

  //Set up the spotlight for the scene
  setUpSpotLight(target) {
    this.spotLight = new THREE.SpotLight(0xAACCFF);
    this.spotLight.intensity = 1.0;
    this.spotLight.angle = 1;
    this.spotLight.position.set(0, 0, 5);
    this.spotLight.penumbra = 1;
    this.spotLight.lookAt(target);
    this.spotLight.castShadow = !1;
  }

  //Set up the renderer for the scene
  setUpRenderer() {
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.autoClear = false;
  }

  setUpComposer() {
    this.composer = new EffectComposer(this.renderer);
    let renderPass = new RenderPass(this.scene, this.camera);
    //let effectCopy = new ShaderPass(THREE.CopyShader);
    //let rgbShiftShader = new ShaderPass(THREE.RGBShiftShader);
    //rgbShiftShader.uniforms.amount.value = 0.0;
    //rgbShiftShader.renderToScreen = true;
    //effectCopy.renderToScreen = true;
    this.composer.addPass(renderPass);
    //this.composer.addPass(rgbShiftShader);
    //this.composer.addPass(effectCopy);
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

    //onsole.log("CUBE POS = " + this.cube.position.z + "\nWALL POS " + this.wallMesh.position.z);
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.02;

    this.shadersTime += 0.02;
    this.updateMouse();
    this.updateUniforms();
    //this.composer.render();

    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  updateUniforms() {
    let sndUpperAvg = 1 * 0.0068965517241379;
    this.wallUniforms.alpha.value = 1.0;
    this.wallUniforms.time.value = this.shadersTime;
    this.wallUniforms.resolution.value = this.shaderResolution;
    this.wallUniforms.mouse.value = this.mouse;

    this.wallUniforms.sndUpperAvg.value = sndUpperAvg;

  }

  updateMouse(){
    if(this.mouseFocus){
      this.mouse.x += (this.mouseX - this.mouse.x) * 0.02;
      this.mouse.y += (this.mouseY - this.mouse.y) * 0.02;
    }
    else {
      this.mouse.x += (0.0 - this.mouse.x) * 0.02;
      this.mouse.y += (0.0 - this.mouse.y) * 0.02;
    }
  }


  render() {
    return (
      <div
        ref={(sceneContainer) => { this.sceneContainer = sceneContainer }}
      />
    )
  }
}
