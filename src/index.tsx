// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.scss';

/** 把 App 挂载到 #root 应用入口 */
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found');
}
const root = createRoot(container);
root.render(<App />);
