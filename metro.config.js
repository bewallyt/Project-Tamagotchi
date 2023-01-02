/* eslint-disable no-undef */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('gltf');
config.resolver.assetExts.push('glb');

// eslint-disable-next-line no-undef
module.exports = config;
