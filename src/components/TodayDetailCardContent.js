// @flow

import React, { PureComponent } from 'react';

import {
  View,
  Animated,
  Image,
} from 'react-native';

import {
  Text,
  StyleSheet,
  Platform,
} from '~/common';

import {
  TodayCardContent,
} from '~/components';

import {
  TODAY_DETAIL_CONTENT_TYPE,
  type TodayItemType,
} from '~/types';

type Props = {
  item: ?TodayItemType,
  contentAnimation: Animated.Value,
};

export class TodayDetailCardContent extends PureComponent<Props> {
  _getRenderVariables() {
    const { item } = this.props;
    if (!item) {
      return null;
    }

    const {
      payload: {
        detailContents,
        cardContent,
      },
    } = item;

    const fullContentsStyle = [
      styles.fullContents,
      {
        opacity: this.props.contentAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ];

    let fullContents = [];

    if (detailContents) {
      fullContents = detailContents.map((detailContent, index) => {
        const key = `detailContent-${index}`;

        if (detailContent.type === TODAY_DETAIL_CONTENT_TYPE.TEXT) {
          return (
            <Text
              key={key}
              style={styles.detailContentText}
            >
              {detailContent.value}
            </Text>
          );
        }

        if (detailContent.type === TODAY_DETAIL_CONTENT_TYPE.IMAGE) {
          return (
            <Image
              key={key}
              source={detailContent.value}
              style={[styles.detailContentImage, {
                width: detailContent.width,
                height: detailContent.height,
              }]}
            />
          );
        }

        return null;
      });
    }

    const originalCardContent = cardContent
      ? <TodayCardContent key="cardContent" cardContent={cardContent} detailMode />
      : null;

    return {
      originalCardContent,
      fullContentsStyle,
      fullContents,
    };
  }

  render() {
    const renderVariables = this._getRenderVariables();
    if (!renderVariables) {
      return null;
    }

    const {
      originalCardContent,
      fullContentsStyle,
      fullContents,
    } = renderVariables;

    return (
      <View style={styles.container}>
        {originalCardContent}
        <Animated.View style={fullContentsStyle}>
          {fullContents}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  fullContents: {
    padding: 16,
  },
  detailContentText: {
    fontSize: Platform.normalize(15),
    color: '#222',
    marginBottom: 24,
  },
  detailContentImage: {
    width: 260,
    height: 180,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 10,
  },
});
