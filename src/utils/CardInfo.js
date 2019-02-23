// @flow

import {
  PixelRatio,
} from 'react-native';

import {
  Platform,
} from '~/common';

const IMAGE_PADDING = 24;

const IMAGE_BASE_FULL_WIDTH = 414;

function getImageSize(width: number, height: number) {
  const fullWidth = Platform.windowWidth;
  const fullHeight = PixelRatio.roundToNearestPixel((height * fullWidth) / IMAGE_BASE_FULL_WIDTH);

  const padding = (IMAGE_PADDING * 2);
  const cardWidth = fullWidth - padding;
  const cardHeight = fullHeight - padding;

  return {
    fullWidth,
    fullHeight,
    cardWidth,
    cardHeight,
  };
}

export const CardInfo = {
  IMAGE_PADDING,
  getImageSize,
};
