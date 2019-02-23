// @flow

import {
  StyleSheet as NativeStyleSheet,
  Platform,
} from 'react-native';

import type {
  ____TextStyle_Internal,
  ColorValue,
} from 'StyleSheetTypes';

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

type ____DangerouslyImpreciseStyle_Internal = {
  ...$Exact<____TextStyle_Internal>,
  +resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat',
  +tintColor?: ColorValue,
  +overlayColor?: string,
  +ios?: Object,
  +android?: Object,
};

type ____Styles_Internal = {
  +[key: string]: $Shape<____DangerouslyImpreciseStyle_Internal>,
};

export const StyleSheet = {
  absoluteFillObject: NativeStyleSheet.absoluteFillObject,
  create<+S: ____Styles_Internal>(styles: S): $ObjMap<S, (Object) => any> {
    const platformStyles = {};

    Object.keys(styles).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        const {
          ios, android, ...style
        } = styles[key];

        if (IS_IOS && ios) {
          Object.assign(style, ios);
        } else if (IS_ANDROID && android) {
          Object.assign(style, android);
        }

        platformStyles[key] = style;
      }
    });

    return NativeStyleSheet.create(platformStyles);
  },
};
