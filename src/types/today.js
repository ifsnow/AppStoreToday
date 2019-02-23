// @flow

export const TODAY_DETAIL_CONTENT_TYPE = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
};

export type TodayItemPayloadDetailContentType = {
  type: $Keys<typeof TODAY_DETAIL_CONTENT_TYPE>,
  value: any,
  width?: number,
  height?: number,
};

export const TODAY_CARD_CONTENT_TYPE = {
  TEXT: 'TEXT',
  DOWNLOAD: 'DOWNLOAD',
};

export type TodayItemPayloadCardContentTextType = {
  type: 'TEXT',
  categoryText: string,
  mainText: string,
  subText: string,
};

export type TodayItemPayloadCardContentDownloadType = {
  type: 'DOWNLOAD',
  appName: string,
  category: string,
  appImage: any,
  backgroundColor: string,
  color: string,
  buttonBackgroundColor: string,
  buttonColor: string,
};

export type TodayItemPayloadCardContentType = TodayItemPayloadCardContentTextType & TodayItemPayloadCardContentDownloadType;

export type TodayItemPayloadType = {
  imageHeaderText?: string,
  imageBottom?: {
    text: string,
    type: 'NORMAL' | 'BOLD',
  },
  detailContents?: Array<TodayItemPayloadDetailContentType>,
  cardContent?: TodayItemPayloadCardContentType,
};

export type TodayItemImageType = {
  source: any,
  width: number,
  height: number,
};

export type TodayItemType = {
  id: number,
  image: TodayItemImageType,
  payload: TodayItemPayloadType,
};

export type TodayCardPositionType = {
  pageX: number,
  pageY: number,
  width: number,
  height: number,
  scale: number,
};

export type TodayDetailCardInfoType = {
  ...TodayCardPositionType,
  imageWidth: number,
  imageHeight: number,
  imageMarginLeft: number,
  imageMarginTop: number,
  windowWidth: number,
  windowHeight: number,
  duration: number,
};
