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

type Props = {
};

const PROFILE_IMAGE = require('~/assets/icon/profile.png');

const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta'];

export class TodayListHeader extends PureComponent<Props> {
  _getDate() {
    const today = new Date();

    return `${today.getMonth() + 1}.${today.getDate()} (${DAY_OF_WEEK[today.getDay()]})`;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.dateText}>{this._getDate()}</Text>
          <Text style={styles.todayText}>Today</Text>
        </View>
        <View style={styles.profileSection}>
          <Image source={PROFILE_IMAGE} style={styles.profileImage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleSection: {
    marginLeft: 2,
  },
  dateText: {
    fontSize: Platform.normalize(14),
    color: '#222',
  },
  todayText: {
    fontSize: Platform.normalize(24),
    fontWeight: 'bold',
    color: '#222',
  },
  profileSection: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3498db',
    marginRight: 2,
  },
  profileImage: {
    width: 30,
    height: 30,
    marginTop: 1,
  },
});
