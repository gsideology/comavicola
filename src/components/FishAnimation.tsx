import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FishAnimationProps {
  isActive: boolean;
}

const FishAnimation: React.FC<FishAnimationProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const fishRef = useRef<THREE.Mesh | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001f3f);
    sceneRef.current = scene;

    // Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 5;
    camera.lookAt(scene.position);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Fish setup
    const geometry = new THREE.BoxGeometry(1, 0.2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xffa500 });
    const fish = new THREE.Mesh(geometry, material);
    scene.add(fish);
    fishRef.current = fish;

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (fishRef.current) {
        const targetX = mouseX * 0.005;
        const targetY = mouseY * 0.005;

        fishRef.current.position.x += (targetX - fishRef.current.position.x) * 0.05;
        fishRef.current.position.z += (-targetY - fishRef.current.position.z) * 0.05;

        const angle = Math.atan2(targetX - fishRef.current.position.x, -targetY - fishRef.current.position.z);
        fishRef.current.rotation.y += (angle - fishRef.current.rotation.y) * 0.1;
      }

      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scene.remove(fish);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      const aspect = window.innerWidth / window.innerHeight;
      const frustumSize = 10;
      cameraRef.current.left = frustumSize * aspect / -2;
      cameraRef.current.right = frustumSize * aspect / 2;
      cameraRef.current.top = frustumSize / 2;
      cameraRef.current.bottom = frustumSize / -2;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
      }}
    />
  );
};

export default FishAnimation; 