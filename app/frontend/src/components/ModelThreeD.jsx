import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const LoadingIndicator = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex items-center space-x-1">
        <span className="text-lg md:text-xl lg:text-2xl">Loading {Math.round(progress)}%</span>
        <motion.span className="dot-animation text-xl md:text-2xl lg:text-4xl" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
        <motion.span className="dot-animation text-xl md:text-2xl lg:text-4xl" animate={{ opacity: [0.3, 1, 0.3], delay: 0.2 }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
        <motion.span className="dot-animation text-xl md:text-2xl lg:text-4xl" animate={{ opacity: [0.3, 1, 0.3], delay: 0.4 }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
      </div>
    </Html>
  );
};

// Model Component
function ModelRetrieve({ mouse = [25, 5, 0] }) {
  const modelRef = useRef();
  const { scene } = useGLTF('/models/gaming_desktop_pc/scene.gltf');

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(-10, -6, -2);
    }
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, mouse.x * 3, 0.05);
      modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, -mouse.y * 3, 0.05);
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

const Model = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvasRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!canvasRef.current) return;
      const { left, top, width, height } = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - left) / width) * 2 - 1;
      const y = -((event.clientY - top) / height) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas ref={canvasRef} camera={{ position: [25, 5, 0], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 10, 5]} intensity={1.5} />

      {/* Show Loading Indicator */}
      <Suspense fallback={<LoadingIndicator />}>
        <ModelRetrieve mouse={mouse} />
        <OrbitControls target={[0, 5, 0]} enablePan={false} />
      </Suspense>
    </Canvas>
  );
};

Model.propTypes = {
  initialCameraPosition: PropTypes.arrayOf(PropTypes.number),
};

export default Model;
