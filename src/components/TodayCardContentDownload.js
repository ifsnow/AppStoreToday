// @flow

import React, { PureComponent } from 'react';

import {
  View,
  Image,
} from 'react-native';

import {
  StyleSheet,
  Text,
  Platform,
} from '~/common';

import {
  type TodayItemPayloadCardContentDownloadType,
} from '~/types';

type Props = {
  item: TodayItemPayloadCardContentDownloadType,
};

export default class TodayCardContentDownload extends PureComponent<Props> {
  render() {
    const {
      item: {
        appName,
        category,
        appImage,
        backgroundColor,
        color,
        buttonBackgroundColor,
        buttonColor,
      },
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Image source={appImage} style={styles.appImage} />
        <View style={styles.content}>
          <Text style={[styles.categoryText, { color }]}>{category}</Text>
          <Text style={[styles.appNameText, { color }]}>{appName}</Text>
        </View>
        <View>
          <View style={[styles.downloadButton, { backgroundColor: buttonBackgroundColor }]}>
            <Text style={[styles.downloadText, { color: buttonColor }]}>Download</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  categoryText: {
    fontSize: Platform.normalize(14),
    marginBottom: 2,
  },
  appNameText: {
    fontSize: Platform.normalize(20),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: Platform.normalize(14),
    color: '#999',
  },
  appImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  downloadButton: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  downloadText: {
    fontSize: Platform.normalize(14),
  },
});
