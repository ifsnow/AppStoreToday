// @flow

import {
  PixelRatio,
  Animated,
} from 'react-native';

import {
  observable,
  action,
  computed,
} from 'mobx';

import {
  TODAY_CARD_CONTENT_TYPE,
  type TodayItemType,
  type TodayCardPositionType,
  type TodayDetailCardInfoType,
} from '~/types';

import {
  Platform,
} from '~/common';

import {
  CardInfo,
} from '~/utils';

export class TodayDetailCardStore {
  static NAME = 'TodayDetailCardStore';

  @observable
  hasDimmedLayer = false;

  @observable
  item: ?TodayItemType = null;

  @observable
  info: ?TodayDetailCardInfoType;

  @observable
  isImageLoaded = false;

  @observable.ref
  cardAnimation = new Animated.Value(0);

  @observable.ref
  contentAnimation = new Animated.Value(0);

  @action
  show(item: TodayItemType, position: TodayCardPositionType) {
    this.item = item;
    this.isImageLoaded = false;

    const {
      width: imageWidth,
    } = position;

    const imageSize = CardInfo.getImageSize(item.image.width, item.image.height);

    const duration = 180 + (position.pageY / Platform.windowHeight) * 140;

    const imageHeight = PixelRatio.roundToNearestPixel((imageSize.cardHeight * imageWidth) / imageSize.cardWidth);
    const imageMarginLeft = -1 * (CardInfo.IMAGE_PADDING + ((imageSize.cardWidth - imageWidth) / 2));
    const imageMarginTop = -1 * (CardInfo.IMAGE_PADDING + ((imageSize.cardHeight - imageHeight) / 2));

    this.info = {
      ...position,
      imageWidth,
      imageHeight,
      imageMarginLeft,
      imageMarginTop,
      windowWidth: Platform.windowWidth,
      windowHeight: Platform.windowHeight + (Platform.isAndroid ? Platform.statusBarHeight : 0),
      duration,
    };
  }

  @action
  hide() {
    this.item = null;
    this.hasDimmedLayer = false;
  }

  @computed
  get isVisible() {
    return this.item !== null;
  }

  @computed
  get hasFloatingDownload() {
    return this.item?.payload?.cardContent?.type === TODAY_CARD_CONTENT_TYPE.DOWNLOAD;
  }
}
