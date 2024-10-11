"use client";
import { generateTotpSecret } from "@/actions/generateTotp";
import { useState, useEffect } from "react";
import VerifyTotp from "./OtpVerification";

export default function TotpSetup() {
  const [qrCodeURL, setQrCodeURL] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      const data = await generateTotpSecret();
      setSecret(data.secret);
      setQrCodeURL(data.qrCodeDataURL);
    };
    fetchQRCode();
  }, []);

  return (
    <div>
      <h1>Scan the QR Code with your Authenticator App</h1>
      {qrCodeURL && <img src={qrCodeURL} alt="QR Code" />}

      <p>Or manually enter this code in your app:</p>
      <code>{secret}</code>

      {/* Pass the secret to the VerifyTotp component */}
      <VerifyTotp secret={secret} />
    </div>
  );
}
