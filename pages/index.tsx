import React from 'react';
import { Button } from 'antd';

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={require('../assets/umi.jpg')} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <hr />
      <Button type='primary'>按钮</Button>
    </div>
  );
}
