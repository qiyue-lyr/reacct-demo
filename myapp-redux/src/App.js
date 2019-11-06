import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import './assets/index.css'

import BaseApp from './BaseApp/Index'


function App() {
  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <BaseApp/>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
} 

export default App;
