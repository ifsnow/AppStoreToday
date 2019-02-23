// @flow

import React, { Component } from 'react';

import {
  View,
} from 'react-native';

import {
  StyleSheet,
  Platform,
  StatusBar,
  InjectedComponent,
} from '~/common';

import {
  TodayList,
  TodayDimmedLayer,
  TodayDetailCard,
} from '~/containers';

import {
  TodayStore,
} from '~/stores';

import FakeData from '~/FakeData';

type Props = {
  TodayStore: TodayStore,
};

export class TodayScreenComponent extends Component<Props> {
  componentDidMount() {
    StatusBar.show(false);
    this.props.TodayStore.set(FakeData);
  }

  render() {
    return (
      <View style={styles.container}>
        <TodayList />
        <TodayDimmedLayer />
        <TodayDetailCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    ios: {
      paddingTop: Platform.statusBarHeight,
    },
  },
});

export const TodayScreen = InjectedComponent(TodayScreenComponent, TodayStore);
