// @flow

import React, { PureComponent } from 'react';

import {
  Animated,
} from 'react-native';

import {
  TodayCardImageText,
} from '~/components';

import {
  StyleSheet,
  Platform,
} from '~/common';

import {
  CardInfo,
} from '~/utils';

import {
  type TodayItemType,
  type TodayDetailCardInfoType,
} from '~/types';

type Props = {
  item: ?TodayItemType,
  info: ?TodayDetailCardInfoType,
  cardAnimation: Animated.Value,
  onLoad: () => void,
};

export class TodayDetailCardImage extends PureComponent<Props> {
  _getRenderVariables() {
    const {
      info,
      cardAnimation,
      item,
      onLoad,
    } = this.props;

    if (!info || !item) {
      return null;
    }

    const {
      image: {
        source,
        width,
        height,
      },
      payload: {
        imageHeaderText,
        imageBottom,
      },
    } = item;

    const imageSize = CardInfo.getImageSize(width, height);

    const containerStyle = {
      width: cardAnimation.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [info.imageWidth, imageSize.fullWidth + 40, imageSize.fullWidth],
      }),
      height: cardAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [info.imageHeight, imageSize.fullHeight],
      }),
    };

    const imageStyle = {
      width: cardAnimation.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [imageSize.fullWidth, imageSize.fullWidth + 40, imageSize.fullWidth],
      }),
      height: cardAnimation.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [imageSize.fullHeight, imageSize.fullHeight + 40, imageSize.fullHeight],
      }),
      marginLeft: cardAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [info.imageMarginLeft, 0],
      }),
      marginTop: cardAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [info.imageMarginTop, 0],
      }),
      transform: [{
        scale: cardAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [info.scale, 1],
        }),
      }],
    };

    // components
    const components = [(
      <Animated.Image
        key="image"
        source={source}
        onLoad={onLoad}
        style={imageStyle}
        resizeMode="stretch"
      />
    )];

    if (imageHeaderText) {
      components.push((
        <TodayCardImageText
          key="headerText"
          text={imageHeaderText}
          textStyle={styles.headerText}
          info={info}
          cardAnimation={cardAnimation}
        />
      ));
    }

    if (imageBottom) {
      const {
        text: bottomText,
        type: bottomTextType,
      } = imageBottom;

      components.push((
        <TodayCardImageText
          key="bottomText"
          bottom
          text={bottomText}
          textStyle={bottomTextType === 'BOLD' && styles.bottomTextIsBold}
          info={info}
          cardAnimation={cardAnimation}
        />
      ));
    }

    return {
      containerStyle,
      components,
    };
  }

  render() {
    const renderVariables = this._getRenderVariables();
    if (!renderVariables) {
      return null;
    }

    const {
      containerStyle,
      components,
    } = renderVariables;

    return (
      <Animated.View style={containerStyle}>
        {components}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: Platform.normalize(26),
    fontWeight: 'bold',
  },
  bottomTextIsBold: {
    fontSize: Platform.normalize(32),
    fontWeight: 'bold',
  },
});
