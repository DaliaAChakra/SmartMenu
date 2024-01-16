import QRCode from "qrcode.react";
export default function App() {
  return (
    <div style={{ padding: 25 , marginTop: 200, display: "flex", flexDirection: "row" }}>
      <div>
        <QRCode value="http://172.20.10.5:3000" style={{ marginRight: 40 }} />
        <p>Google</p>
      </div>
      
    </div>
  );
}
