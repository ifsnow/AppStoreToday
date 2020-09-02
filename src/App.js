// @flow

import React, { PureComponent } from 'react';

import {
  Provider,
} from 'mobx-react';

import {
  TodayScreen,
} from '~/screens';

import Stores from '~/stores/export';

export default class App extends PureComponent<{}> {
  render() {
    return (
      <Provider {...Stores}>
        <TodayScreen />
      </Provider>
    );
  }
}
