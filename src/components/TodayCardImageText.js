// @flow

import React, { PureComponent } from 'react';

import {
  Animated,
  View,
} from 'react-native';

import {
  StyleSheet,
  Text,
  Platform,
} from '~/common';

import {
  type TodayDetailCardInfoType,
} from '~/types';

type Props = {
  info?: TodayDetailCardInfoType,
  cardAnimation?: Animated.Value,
  bottom?: boolean,
  text?: string,
  textStyle?: any,
};

export class TodayCardImageText extends PureComponent<Props> {
  static defaultProps = {
    bottom: false,
  };

  _getRenderVariables() {
    const {
      info,
      cardAnimation,
      bottom,
      text,
      textStyle: textStyleProp,
    } = this.props;

    const containerAnimationStyle = [
      styles.container,
      bottom && styles.containerIsBottom,
      info && cardAnimation && {
        transform: [{
          scale: cardAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [info?.scale, 1],
          }),
        }],
      },
      Platform.isOveriPhoneX && info && cardAnimation && {
        top: cardAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 20],
        }),
      },
    ];

    const containerStyle = [
      styles.container,
      bottom && styles.containerIsBottom,
    ];

    const textStyle = [styles.title, textStyleProp];

    return {
      containerAnimationStyle,
      containerStyle,
      textStyle,
      text,
    };
  }

  render() {
    const {
      containerAnimationStyle,
      containerStyle,
      textStyle,
      text,
    } = this._getRenderVariables();

    return (
      <Animated.View style={containerAnimationStyle}>
        <View style={containerStyle}>
          {text && <Text style={textStyle}>{text}</Text>}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: 24,
    paddingTop: 24,
  },
  containerIsBottom: {
    top: undefined,
    bottom: 0,
    paddingTop: 0,
    paddingBottom: 24,
  },
  title: {
    fontSize: Platform.normalize(18),
    color: '#fff',
  },
});
