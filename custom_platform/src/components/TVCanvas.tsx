import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function useGlitchMaterial(texture?: THREE.Texture) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        uMap: { value: texture ?? null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
      uniform sampler2D uMap;
      uniform float iTime;
      varying vec2 vUv;

      float rand(vec2 co){
          return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
          vec2 uv = vUv;
          
          vec2 blockUv = floor(uv * 30.0) / 30.0;
          float blockVal = rand(blockUv + floor(iTime * 2.0));
          
          float r = texture2D(uMap, uv + vec2(0.005 * blockVal, 0.0)).r;
          float g = texture2D(uMap, uv).g;
          float b = texture2D(uMap, uv - vec2(0.005 * blockVal, 0.0)).b;
          vec3 col = vec3(r, g, b);

          float flicker = step(0.93, rand(uv + iTime));
          col += flicker * 0.1;

          gl_FragColor = vec4(col, 1.0);
      }
      `,
    });
  }, [texture]);

  return material;
}

function TVMesh() {
  const { nodes } = useGLTF('/tv2-compressed-transformed.glb');
  const logoTexture = useTexture('/logo.jpg');
  logoTexture.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef<THREE.Group | null>(null);
  
  const tvMesh = nodes.tv_low as THREE.Mesh;
  const tvMaterial = tvMesh.material as THREE.MeshStandardMaterial;
  const glitchMat = useGlitchMaterial(logoTexture);

  useFrame((_, delta) => {
    if (glitchMat.uniforms.iTime) {
      glitchMat.uniforms.iTime.value += 3 * delta;
    }
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(_.clock.getElapsedTime() * 1.5) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0.05, -Math.PI * 0.35, 0]}>
      {/* Outer Backing Red Glow Mesh */}
      <mesh
        geometry={tvMesh.geometry}
        scale={1.62}
        rotation={[-0.3, Math.PI * 0.75, -Math.PI / 2]}
      >
        <meshBasicMaterial color="#ff3b30" side={THREE.BackSide} />
      </mesh>

      {/* Main 3D TV Body Mesh */}
      <mesh
        castShadow
        receiveShadow
        geometry={tvMesh.geometry}
        material={tvMaterial}
        scale={1.58}
        rotation={[-0.3, Math.PI * 0.75, -Math.PI / 2]}
      />

      {/* Front Screen Display Mesh (Scaled & Positioned Perfectly Flush) */}
      <mesh position={[-0.64, 0.10, 0.31]} rotation={[0.02, -Math.PI * 0.37, 0]}>
        <planeGeometry args={[1.75, 1.3]} />
        <primitive object={glitchMat} attach="material" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/tv2-compressed-transformed.glb');
useTexture.preload('/logo.jpg');

export const TVCanvas: React.FC = () => {
  return (
    <div className="w-full h-[240px] sm:h-[300px] relative">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} />
        <pointLight position={[-5, -5, 5]} intensity={1.2} color="#00f0ff" />
        
        <TVMesh />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 3} 
        />
      </Canvas>
    </div>
  );
};
