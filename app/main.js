import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ShapeForm from "./Shape_Form"
import 'regenerator-runtime/runtime'



const style = {
  height: 500// we can control scene size by setting container dimensions
};


class App extends Component {
  constructor(props) {
    super(props)
    this.sceneSetup = this.sceneSetup.bind(this);
    this.calculateBuildingLength = this.calculateBuildingLength.bind(this)
    this.calculateBuildingWidth = this.calculateBuildingWidth.bind(this)
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
    this.scene.clear()
    this.addCustomSceneObjects();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
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

    this.scene.background = new THREE.Color('skyblue')

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref};
  }

  calculateBuildingLength(length) {
    if (length < 100) {
      return length - 35
    } else {
      return length - ((length * .2) + 15)
    }
  }

  calculateBuildingWidth(width) {
    if (width > 50) {
      return width - 10
    } else if (width < 30) {
      return width - 6
    } else {
      return width - (2 * (width * .1))
    }
  }

  addCustomSceneObjects() {
    //This is how you change the size and shape.They are inserted at the same origin

    const buildingWidth = this.calculateBuildingWidth(this.props.siteWidth)
    console.log(buildingWidth)

    const buildingLength = this.calculateBuildingLength(this.props.siteLength)
    console.log(buildingLength)

    const geometry = new THREE.BoxGeometry(buildingLength, buildingWidth, 14);
    
    const geometryTwo = new THREE.BoxGeometry( this.props.siteLength, this.props.siteWidth, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xf94144,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    const materialTwo = new THREE.MeshPhongMaterial({
      color: 0x90be6d,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cubeTwo = new THREE.Mesh(geometryTwo, materialTwo);
    this.cube.position.x = 0
    this.cube.position.y = 0
    this.cube.position.z = 7
    //this.cube.add(this.cubeTwo)

    this.scene.add(this.cube);
    this.scene.add(this.cubeTwo);
    

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
    //this.cube.rotation.x += 0.01;
    //this.cube.rotation.y += 0.01;

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
  /* var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      // use ref as a mount point of the Three.js scene instead of the document.body
      this.mount.appendChild( renderer.domElement );
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.z = 5;
      var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  } */
  render() {
    return <div style={style} ref={(ref) => (this.el = ref)} />;
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = 
    { isMounted: true,
      siteLength: 100,
      siteWidth: 50
    };
    this.onShapeChange = this.onShapeChange.bind(this)
  }

  onShapeChange(shapeState) {
    this.setState(shapeState)
  }

  render() {
    const { isMounted = true } = this.state;
    return (
      <>  
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
          }
        >
          {isMounted ? "Hide" : "Unhide"}
        </button>
        {isMounted && <App onShapeChange={this.onShapeChange} siteLength={this.state.siteLength} siteWidth={this.state.siteWidth}/>}
        {isMounted && <div>Scroll to zoom, drag to rotate</div>}
        <div>
      <ShapeForm onShapeChange={this.onShapeChange} siteLength={this.state.siteLength} siteWidth={this.state.siteWidth} />
      </div>
      <div>
        <p>MAX BUILDING LENGTH: </p>
      </div>
      </>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);




