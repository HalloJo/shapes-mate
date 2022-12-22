const { Scene, PerspectiveCamera, WebGLRenderer } = THREE;
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
  const geometry = new THREE.ConeGeometry(10, 15, 32);
  const material = new THREE.MeshLambertMaterial({
    color: 0x87a1f7,
    emissive: 0x0b2fa8,
  });
  const shape = new THREE.Mesh(geometry, material);

  shape.position.set(
    window.innerWidth / 2 - x,
    window.innerHeight / 2 - y,
    400
  );
  shape.rotateX(0.5);
  shape.rotateZ(0.5);

  shapes.push(shape);
  scene.add(shape);
};

document.addEventListener("mousemove", (event) => {
  createShape(event.pageX, event.pageY);
});
