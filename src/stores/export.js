// @flow

import * as Stores from '.';

const storeExports: {
  [string]: any,
} = {};

/* eslint guard-for-in: "off" */
/* eslint no-restricted-syntax: "off" */
for (const storeName in Stores) {
  const StoreClass = Stores[storeName];
  if (__DEV__ && StoreClass.NAME !== StoreClass.name) {
    throw new Error(`Store name is wrong: ${StoreClass.NAME} !== ${StoreClass.name}`);
  }
  storeExports[StoreClass.NAME] = new StoreClass();
}

export default storeExports;
