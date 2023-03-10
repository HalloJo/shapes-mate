const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  ConeGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
  DodecahedronGeometry,
  BoxGeometry,
  TorusGeometry,
  SphereGeometry,
} = THREE;
const DOMRENDERER = document.querySelector("section");

// WEBGL RENDERER

const renderer = new WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x222222, 1);

DOMRENDERER.appendChild(renderer.domElement);

// SCENE

const scene = new Scene();

// CAMERA

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

camera.position.z = -50;
camera.lookAt(scene.position);

// LIGHTING

const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(0, 0, -1);

scene.add(light);

// HUE COLOR SETUP
let hue = 0;

// SHAPE DATA

const shapes = [];

// ANIMATION

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  camera.position.setZ(camera.position.z + 1);

  shapes.forEach((shape) => {
    shape.rotateX(0.01);
  });
};

animate();

// CREATE SHAPE

const createShape = (x, y) => {
  const geometries = [
    new ConeGeometry(10, 30, 32),
    new BoxGeometry(15, 15, 15),
    new TorusGeometry(5, 3, 16, 100),
    new SphereGeometry(5, 32, 32),
  ];

  const randomNumber = Math.floor(Math.random() * geometries.length);

  const geometry = geometries[randomNumber];
  const emissiveColor = new Color("hsl(" + hue + ", 88%, 35%)");

  const material = new MeshLambertMaterial({
    color: 0x87a1f7,
    emissive: emissiveColor,
  });
  const shape = new Mesh(geometry, material);

  shape.position.set(
    window.innerWidth / 2 - x,
    window.innerHeight / 2 - y,
    camera.position.z + 500
  );
  shape.rotateX(0.5);
  shape.rotateZ(0.5);

  shapes.push(shape);
  scene.add(shape);

  hue = hue + 1;
};

// EVENT LISTENERS DESKTOP

let isMouseDown = false;

document.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY);
  }
});

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

document.addEventListener("touchmove", (event) => {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY);
  }
});

document.addEventListener("touchstart", () => {
  isMouseDown = true;
});

document.addEventListener("touchend", () => {
  isMouseDown = false;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
