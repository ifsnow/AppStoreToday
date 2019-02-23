// @flow

import {
  observer,
  inject,
} from 'mobx-react/native';

export function InjectedComponent(component: React$ComponentType<*>, ...stores: Array<Class<*>>) {
  return inject(...stores.map(store => store.NAME))(observer(component));
}
