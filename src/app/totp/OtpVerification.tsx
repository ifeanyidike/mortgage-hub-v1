import { verifyTotpToken } from "@/actions/generateTotp";
import { useState } from "react";

export default function VerifyTotp({ secret }: { secret: string }) {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await verifyTotpToken(token, secret);

      setMessage(success ? "2FA Verified!" : "Invalid code.");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Verify Two-Factor Authentication (TOTP)</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="token">Enter your TOTP code:</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="123456"
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
