// @flow

import React, { PureComponent } from 'react';

import {
  View,
  Image,
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
  type TodayItemImageType,
  type TodayItemPayloadType,
} from '~/types';

type Props = {
  image: TodayItemImageType,
  payload: TodayItemPayloadType,
};

export class TodayCardImage extends PureComponent<Props> {
  _getRenderVariables() {
    const {
      image: {
        source,
        width,
        height,
      },
      payload,
    } = this.props;

    const imageSize = CardInfo.getImageSize(width, height);

    const containerStyle = [
      styles.container,
      {
        width: imageSize.cardWidth,
        height: imageSize.cardHeight,
      },
    ];

    const imageStyle = [
      styles.image,
      {
        width: imageSize.fullWidth,
        height: imageSize.fullHeight,
      },
    ];

    // components
    const components = [(
      <Image
        key="image"
        source={source}
        style={imageStyle}
        resizeMode="stretch"
      />
    )];

    if (payload.imageHeaderText) {
      components.push((
        <TodayCardImageText
          key="headerText"
          text={payload.imageHeaderText}
          textStyle={styles.headerText}
        />
      ));
    }

    if (payload.imageBottom) {
      const {
        text: bottomText,
        type: bottomTextType,
      } = payload.imageBottom;

      components.push((
        <TodayCardImageText
          key="bottomText"
          bottom
          text={bottomText}
          textStyle={bottomTextType === 'BOLD' && styles.bottomTextIsBold}
        />
      ));
    }

    return {
      containerStyle,
      components,
    };
  }

  render() {
    const {
      containerStyle,
      components,
    } = this._getRenderVariables();

    return (
      <View style={containerStyle}>
        {components}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    marginLeft: -1 * CardInfo.IMAGE_PADDING,
    marginTop: -1 * CardInfo.IMAGE_PADDING,
  },
  headerText: {
    fontSize: Platform.normalize(26),
    fontWeight: 'bold',
  },
  bottomTextIsBold: {
    fontSize: Platform.normalize(32),
    fontWeight: 'bold',
  },
});
