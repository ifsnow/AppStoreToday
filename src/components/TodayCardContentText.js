// @flow

import React, { PureComponent } from 'react';

import {
  View,
} from 'react-native';

import {
  StyleSheet,
  Text,
  Platform,
} from '~/common';

import {
  type TodayItemPayloadCardContentTextType,
} from '~/types';

type Props = {
  item: TodayItemPayloadCardContentTextType,
  detailMode: boolean,
};

export default class TodayCardContentText extends PureComponent<Props> {
  render() {
    const {
      item: {
        categoryText,
        mainText,
        subText,
      },
      detailMode,
    } = this.props;

    return (
      <View style={[styles.container, detailMode && styles.containerIsDetailMode]}>
        <Text style={styles.categoryText}>{categoryText}</Text>
        <Text style={styles.mainText}>{mainText}</Text>
        {!detailMode && <Text style={styles.subText}>{subText}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  containerIsDetailMode: {
    paddingBottom: 0,
  },
  categoryText: {
    fontSize: Platform.normalize(14),
    color: '#999',
  },
  mainText: {
    fontSize: Platform.normalize(20),
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 4,
  },
  subText: {
    fontSize: Platform.normalize(14),
    color: '#999',
  },
});
