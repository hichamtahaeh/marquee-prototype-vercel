'use client';
import React, { useState } from 'react';

export default function Loader({ loading }) {
  return loading ? (
    <div className='marquee-loader__wrap'>
      <div className='marquee-loader'>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
}
