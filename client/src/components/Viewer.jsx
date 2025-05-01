import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Viewer = ({ modelUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!modelUrl || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.innerHTML = ''; // Clear previous
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // Load OBJ model from URL
    const loader = new OBJLoader();
    loader.load(
      modelUrl,
      (object) => {
        object.position.set(0, 0, 0);
        scene.add(object);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [modelUrl]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '70vh', border: '1px solid #ddd', borderRadius: '4px' }}
    />
  );
};

export default Viewer;
