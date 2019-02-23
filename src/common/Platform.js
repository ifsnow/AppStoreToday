// @flow

import {
  Dimensions,
  StatusBar,
  Platform as NativePlatform,
} from 'react-native';

const {
  width: windowWidth,
  height,
} = Dimensions.get('window');

const isAndroid = NativePlatform.OS === 'android';

const isIOS = !isAndroid;

const isOveriPhoneX = isIOS && !NativePlatform.isPad && !NativePlatform.isTVOS && height >= 812;

const windowHeight = height - (isAndroid ? StatusBar.currentHeight : 0);

const iPhoneStatusBarHeight = isOveriPhoneX ? 40 : 20;
const statusBarHeight = isAndroid ? StatusBar.currentHeight : iPhoneStatusBarHeight;

const DEVICE_SCALE = Math.min(480, windowWidth) / 414;
function normalize(size: number) {
  return Math.round(DEVICE_SCALE * size);
}

export const Platform = {
  isAndroid,
  isIOS,
  isOveriPhoneX,
  windowWidth,
  windowHeight,
  statusBarHeight,
  normalize,
};
