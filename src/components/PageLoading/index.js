import React from 'react';
import { Spin } from 'antd';

import styles from './styles.less';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div className={styles.container}>
    <Spin size="large" />
  </div>
);
