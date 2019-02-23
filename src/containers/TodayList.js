// @flow

import React, { Component } from 'react';

import {
  FlatList,
} from 'react-native';

import {
  StyleSheet,
  InjectedComponent,
} from '~/common';

import {
  TodayListHeader,
} from '~/components';

import {
  TodayListCard,
} from '~/templates';

import {
  CardInfo,
} from '~/utils';

import {
  TodayStore,
} from '~/stores';

type Props = {
  TodayStore: TodayStore,
};

class TodayListComponent extends Component<Props> {
  _keyExtractor = item => `TodayCard-${item.id}`;

  _renderItem = ({ item }) => <TodayListCard item={item} />

  render() {
    if (!this.props.TodayStore.hasItems) {
      return null;
    }

    return (
      <FlatList
        data={this.props.TodayStore.items}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pinchGestureEnabled={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<TodayListHeader />}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContent: {
    padding: CardInfo.IMAGE_PADDING,
  },
});

export const TodayList = InjectedComponent(TodayListComponent, TodayStore);
