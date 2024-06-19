
import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
const API_URL = 'http://90.110.227.143/api/ . . . ';


function QrCode() {
    const [URL, setURL] = useState(null);
    const GetURL = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
          const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            
        });
          const data = await response.json();
          if (data.success && data.students.length > 0) {
            setURL(data.students[0].userID);
          } else {
            setURL(null);
          }
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
    GetURL();
  const downloadCode = () => {
    const canvas = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `your_name.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="App">
      <h1>Logo QR code download</h1>
      <br/>
      <QRCode
        value={
          `${URL}`
        } // here you should keep the link/value(string) for which you are generation promocode
        size={350} // the dimension of the QR code (number)
        fgColor={"#000000"}
        eyeColor={"#000000"}
        logoOpacity={1}
        logoHeight={50}
        logoWidth={50}
        enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
        qrStyle="dots" // type of qr code, wether you want dotted ones or the square ones
        eyeRadius={10} // radius of the promocode eye
        id={"QR"}
      />
      <p>
        Click for{" "}
        <button type="button" onClick={() => downloadCode()}>
          Download QR Code
        </button>
      </p>
    </div>
  );
}


export default QrCode;
