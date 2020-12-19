import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ShapeForm from "./Shape_Form";

const style = {
  height: 500, // we can control scene size by setting container dimensions
};

class App extends Component {
  constructor(props) {
    super(props);
    this.sceneSetup = this.sceneSetup.bind(this);
    this.addCustomSceneObjects = this.addCustomSceneObjects.bind(this);
    this.startAnimationLoop = this.startAnimationLoop.bind(this);
  }
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate() {
    this.scene.clear();
    this.addCustomSceneObjects();
  }

  sceneSetup() {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.controls = new OrbitControls(this.camera, this.el);
    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 50;

    this.scene.background = new THREE.Color(0x0077b6);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref};
  }

  addCustomSceneObjects() {
    const geometry = new THREE.BoxGeometry(
      this.props.shapeLength,
      this.props.shapeWidth,
      this.props.shapeHeight
    );
    const material = new THREE.MeshPhongMaterial({
      color: 0xf95738,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });

    this.cube = new THREE.Mesh(geometry, material);

    this.cube.position.x = 0;
    this.cube.position.y = 0;
    this.cube.position.z = 0;

    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }

  startAnimationLoop() {
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  }

  handleWindowResize() {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    return <div style={style} ref={(ref) => (this.el = ref)} />;
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeLength: 25, //the starting length for the shape
      shapeWidth: 25, //the starting width for the shape
      shapeHeight: 25, //the starting height for the shape
    };
    this.onShapeChange = this.onShapeChange.bind(this);
  }

  onShapeChange(shapeState) {
    this.setState(shapeState);
  }

  render() {
    return (
      <>
        <App
          onShapeChange={this.onShapeChange}
          shapeLength={this.state.shapeLength}
          shapeWidth={this.state.shapeWidth}
          shapeHeight={this.state.shapeHeight}
        />
        <p></p>
        <div>Scroll to zoom, drag to rotate</div>
        <p></p>
        <div>
          <ShapeForm
            onShapeChange={this.onShapeChange}
            shapeLength={this.state.shapeLength}
            shapeWidth={this.state.shapeWidth}
            shapeHeight={this.state.shapeHeight}
          />
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);
