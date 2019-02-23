// @flow

import {
  StatusBar as StatusBarNative,
} from 'react-native';

export const StatusBar = {
  show: (animation: boolean = true) => StatusBarNative.setHidden(false, animation ? 'slide' : 'none'),
  hide: (animation: boolean = true) => StatusBarNative.setHidden(true, animation ? 'slide' : 'none'),
};
