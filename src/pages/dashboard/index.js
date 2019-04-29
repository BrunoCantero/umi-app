/**
 * title: title.dashboard
 * icon: dashboard
 * menu: 1
 */

import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { Typography } from 'antd';

export default function () {
  return (
    <Typography.Text>
      <ul>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
      </ul>
    </Typography.Text>
  );
}
