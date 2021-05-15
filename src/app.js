import React from 'react';
import styled from 'styled-components';
import VGMPlayer from './player';

import bg from './img/icons/windows95_logo.png';


function App() {

  return (
      <div class="desktop" style={{ backgroundImage: `url${bg}` }}>
        <VGMPlayer />
      </div>
  );
}

export default App;
