// @flow

import React, { PureComponent } from 'react';

import {
  Text as NativeText,
  Platform,
} from 'react-native';

export class Text extends PureComponent<any, {}> {
  static defaultStyle = Platform.select({
    ios: {
      fontFamily: 'AppleSDGothicNeo-Regular',
    },
    android: {
      fontFamily: 'sans-serif',
      includeFontPadding: false,
    },
  });

  render() {
    const {
      children,
      style,
      ...props
    } = this.props;
    return (
      <NativeText
        allowFontScaling={false}
        style={[Text.defaultStyle, style]}
        {...props}
      >
        {children}
      </NativeText>
    );
  }
}
