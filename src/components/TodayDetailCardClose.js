// @flow

import React, { PureComponent } from 'react';

import {
  Animated,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {
  StyleSheet,
  Platform,
} from '~/common';

type Props = {
  cardAnimation: Animated.Value,
  onPress: () => void,
};

const CLOSE_IMAGE = require('~/assets/icon/close.png');

const CLOSE_HITSLOP = {
  left: 10,
  top: 10,
  right: 10,
  bottom: 10,
};

export class TodayDetailCardClose extends PureComponent<Props> {
  _containerStyle;

  componentWillMount() {
    this._containerStyle = [
      styles.container,
      {
        opacity: this.props.cardAnimation,
      },
    ];
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} hitSlop={CLOSE_HITSLOP}>
        <Animated.View style={this._containerStyle}>
          <Image source={CLOSE_IMAGE} style={styles.closeImage} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: Platform.isOveriPhoneX ? 30 : 20,
    top: Platform.isOveriPhoneX ? 30 : 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  closeImage: {
    width: 20,
    height: 20,
  },
});
