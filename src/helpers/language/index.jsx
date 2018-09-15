import React from 'react';
import { observer, inject } from 'mobx-react';

const Language = ({ languageStore, resource }) =>
  resource.indexOf('.') !== -1 ? (
    <span>{languageStore.resource[resource.split('.')[0]][resource.split('.')[1]]}</span>
  ) : (
    <span>{languageStore.resource[resource]}</span>
  );

export default inject('languageStore')(observer(Language));
