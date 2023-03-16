import * as THREE from 'three'
import * as dat from 'dat.gui'

export default class Sketch{
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private width: number;
  private height: number;
  private container: HTMLElement;
  private camera: THREE.PerspectiveCamera;
  private gui: dat.GUI;

  cameraDistance = 400
  setting = {
    progress: 0, angle: 0.25
  }
  time= 0
  paused = false
  private geometry: THREE.PlaneGeometry;
  private material: THREE.ShaderMaterial;

  constructor() {
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.sortObjects = false
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.container = document.getElementById("container") as HTMLElement
    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70, this.width / this.height, 300, 1000
    )
    this.camera.position.set(0,0, this.cameraDistance)
    this.gui = new dat.GUI()
    this.gui.add(this.setting, 'progress', 0, 1, 0.01)
    this.gui.add(this.setting, 'angle', 0, 0.32, 0.01)
    this.geometry = new THREE.PlaneGeometry(1, 1, 80, 80);
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        angle: { value: 0 },
        texture1: { value: null },
        texture2: { value: null },
        resolution: {  value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1)
        }
      },
      // wireframe: true,
      transparent: true,
      // vertexShader: vertex,
      // fragmentShader: fragment
    });
    const resize = () =>{
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.renderer.setSize(this.width, this.height)
      this.camera.fov =
        2 *
        Math.atan(this.width / this.camera.aspect / (2 * this.cameraDistance)) *
        (180 / Math.PI); // in degrees

      this.camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize)
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }

  render() {
    this.scene.children.forEach(m => {
      if (m instanceof THREE.Mesh && m.material.uniforms) {
        m.material.uniforms.angle.value = this.setting.angle;
      }
    });
    this.renderer.render(this.scene, this.camera);
  }
}
