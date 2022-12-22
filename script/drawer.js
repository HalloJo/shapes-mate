const { Scene, PerspectiveCamera, WebGLRenderer } = THREE;
const DOMRENDERER = document.querySelector("section");

// WEBGL RENDERER

const renderer = new WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x333333, 1);

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

// ANIMATION

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
