// @flow

import {
  observable,
  action,
  computed,
} from 'mobx';

import {
  type TodayItemType,
} from '~/types';

export class TodayStore {
  static NAME = 'TodayStore';

  @observable
  items: Array<TodayItemType> = [];

  @action
  set(items: Array<TodayItemType>) {
    this.items = items;
  }

  @computed
  get hasItems() {
    return this.items.length > 0;
  }
}
