// @flow

import React, { PureComponent } from 'react';

import TodayCardContentText from './TodayCardContentText';
import TodayCardContentDownload from './TodayCardContentDownload';

import {
  TODAY_CARD_CONTENT_TYPE,
  type TodayItemPayloadCardContentType,
} from '~/types';

type Props = {
  cardContent: TodayItemPayloadCardContentType,
  detailMode?: boolean,
};

export class TodayCardContent extends PureComponent<Props> {
  static defaultProps = {
    detailMode: false,
  };

  render() {
    const {
      cardContent,
      detailMode = false,
    } = this.props;

    if (cardContent.type === TODAY_CARD_CONTENT_TYPE.TEXT) {
      return <TodayCardContentText item={cardContent} detailMode={detailMode} />;
    }

    if (cardContent.type === TODAY_CARD_CONTENT_TYPE.DOWNLOAD) {
      return <TodayCardContentDownload item={cardContent} />;
    }

    return null;
  }
}
