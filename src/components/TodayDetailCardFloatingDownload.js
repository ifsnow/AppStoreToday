// @flow

import React, { PureComponent } from 'react';

import {
  Animated,
  Image,
  View,
} from 'react-native';

import {
  StyleSheet,
  Text,
  Platform,
} from '~/common';

import {
  type TodayItemType,
} from '~/types';

type Props = {
  item: ?TodayItemType,
};

class TodayDetailCardFloatingDownloadComponent extends PureComponent<Props> {
  _isVisible = false;

  _showAnimation = new Animated.Value(0);

  _containerStyle;

  constructor(props: Props) {
    super(props);

    this._containerStyle = [
      styles.container,
      {
        transform: [
          {
            translateY: this._showAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          },
        ],
      },
    ];
  }

  show() {
    if (this._isVisible) {
      return;
    }

    this._isVisible = true;

    Animated.spring(this._showAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  hide(animated: boolean = true) {
    if (!this._isVisible) {
      return;
    }

    this._isVisible = false;

    if (!animated) {
      this._showAnimation.setValue(0);
      return;
    }

    Animated.spring(this._showAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { item } = this.props;
    if (!item) return null;

    const { cardContent } = item.payload;
    if (!cardContent) return null;

    const {
      appName,
      category,
      appImage,
    } = cardContent;

    return (
      <Animated.View style={this._containerStyle}>
        <Image source={appImage} style={styles.appImage} />
        <View style={styles.content}>
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.appNameText}>{appName}</Text>
        </View>
        <View>
          <View style={styles.downloadButton}>
            <Text style={styles.downloadText}>Download</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.isOveriPhoneX ? 30 : 12,
    backgroundColor: '#efefef',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  categoryText: {
    fontSize: Platform.normalize(13),
    color: '#777',
  },
  appNameText: {
    fontSize: Platform.normalize(18),
    color: '#222',
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
    backgroundColor: '#888',
  },
  downloadText: {
    fontSize: Platform.normalize(12),
    fontWeight: 'bold',
    color: '#fff',
  },
});

// $FlowFixMe
export const TodayDetailCardFloatingDownload = React.forwardRef((props, ref) => (
  <TodayDetailCardFloatingDownloadComponent ref={ref} {...props} />
));
