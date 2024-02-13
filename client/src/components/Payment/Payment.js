import React from "react";
import yapeQRCode from "../../images/yapeQRCode.JPG";
import yapeLogo from "../../images/yape-logotipo.png";
import "./payment.css";

function Payment() {
  return (
    <div className="payment-container">
      <h3>
        Paga con <img src={yapeLogo} alt="Yape" className="payment-logo" />
      </h3>
      <img
        src={yapeQRCode}
        alt="Código QR de Yape"
        className="payment-qr-code"
      />
    </div>
  );
}

export default Payment;
