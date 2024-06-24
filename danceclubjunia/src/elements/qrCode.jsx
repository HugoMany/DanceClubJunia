import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeComponent = ({ link }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      {/* <h1>Votre QR Code</h1> */}
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <QRCode size={isFullScreen ? window.innerWidth - 20 : '200px'} value={link} />
        </div>
    </div>
  );
};

export default QRCodeComponent;