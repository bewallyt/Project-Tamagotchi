import THREE from 'three';
import { loadTextureAsync } from 'expo-three';
import { resolveAsync } from 'expo-asset-utils';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { atob } from 'react-native-quick-base64';
import * as FileSystem from 'expo-file-system';

/*
Source: https://github.com/pmndrs/react-three-fiber/issues/2577
*/
async function loadFileAsync({ asset, funcName }) {
  if (!asset) throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
  return (await resolveAsync(asset)).localUri ?? null;
}

export default async function loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadGLTFAsync',
  });

  if (!uri) return;

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const arrayBuffer = atob(base64);
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      onAssetRequested,
      (result) => {
        resolve(result);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
