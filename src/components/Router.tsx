import { FC, memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// components
import About from './About';
import Calculator from './Calculator';
import Navbar from './ui/Navbar';
import { css } from '@emotion/react';

export const Root: FC = memo(() => {
  return (
    <div css={rootCss}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Calculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});

const rootCss = css({
  height: '100%',
});

export default Root;
