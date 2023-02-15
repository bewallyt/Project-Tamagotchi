import React, { Suspense } from 'react';

import { useFrame, Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment } from '@react-three/drei/native';

const asset = require('./../../assets/Poimandres.gltf');

import loadGLTFAsync from './utils/loadGLTFAsync';
import { usePromiseMemo } from 'utils';

function Model({ scene, ...rest }) {
  useFrame(() => (scene.rotation.y += 0.01));
  return <primitive {...rest} object={scene} />;
}

export default function PoinmandresModel() {
  const { result, loading } = usePromiseMemo(() => loadGLTFAsync({ asset }), []);
  if (loading || !result) {
    return null;
  }
  return (
    <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Environment preset="park" />
        <Model url={result} />
      </Suspense>
    </Canvas>
  );
}

// export function GeneratedModel(props) {
//   const { nodes, materials } = useGLTF(poimandresModalPath);
//   return (
//     <group {...props} dispose={null}>
//       <mesh castShadow receiveShadow geometry={nodes.Curve007_1.geometry} material={materials['Material.001']} />
//       <mesh castShadow receiveShadow geometry={nodes.Curve007_2.geometry} material={materials['Material.002']} />
//     </group>
//   );
// }

// useGLTF.preload(poimandresModalPath);
