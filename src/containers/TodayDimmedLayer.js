// @flow

import React, { Component } from 'react';

import {
  View,
} from 'react-native';

import {
  StyleSheet,
  InjectedComponent,
} from '~/common';

import {
  TodayDetailCardStore,
} from '~/stores';

type Props = {
  TodayDetailCardStore: TodayDetailCardStore,
};

class TodayDimmedLayerComponent extends Component<Props> {
  render() {
    if (!this.props.TodayDetailCardStore.hasDimmedLayer) {
      return null;
    }

    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 10,
  },
});

export const TodayDimmedLayer = InjectedComponent(TodayDimmedLayerComponent, TodayDetailCardStore);
