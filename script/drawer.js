const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  ConeGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
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

  shapes.forEach((shape) => {
    shape.rotateX(0.01);
  });
};

animate();

// CREATE SHAPE

const createShape = (x, y) => {
  const geometry = new ConeGeometry(10, 15, 32);
  const emissiveColor = new Color("hsl(" + hue + ", 88%, 35%)");

  const material = new MeshLambertMaterial({
    color: 0x87a1f7,
    emissive: emissiveColor,
  });
  const shape = new Mesh(geometry, material);

  shape.position.set(
    window.innerWidth / 2 - x,
    window.innerHeight / 2 - y,
    550
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
