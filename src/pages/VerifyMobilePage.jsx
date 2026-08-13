import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { sendMobileOTP, verifyMobileOTP } from "../api/auth";

function VerifyMobilePage() {
  const navigate = useNavigate();

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [phoneNumber, setPhoneNumber] = useState(
    storedUser?.phone_number || ""
  );
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  async function handleSendOTP() {
    const normalizedPhone = phoneNumber.trim().replace(/\s+/g, "");

    if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone)) {
      toast.error("Use international format, for example +233XXXXXXXXX.");
      return;
    }

    setIsSending(true);

    try {
      const data = await sendMobileOTP(normalizedPhone);
      setPhoneNumber(data.phone_number);
      setOtpSent(true);
      toast.success("Verification code sent.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSending(false);
    }
  }

  async function handleVerifyOTP(event) {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp.trim())) {
      toast.error("Enter the 6-digit verification code.");
      return;
    }

    setIsVerifying(true);

    try {
      const data = await verifyMobileOTP(
        phoneNumber.trim().replace(/\s+/g, ""),
        otp.trim()
      );

      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          phone_number: data.phone_number,
          mobile_verified: true,
        })
      );

      toast.success("Mobile number verified successfully.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <main className="verify-mobile-page">
      <section className="verify-mobile-card">
        <div className="verify-mobile-heading">
          <span>Security check</span>
          <h1>Verify your mobile number</h1>
          <p>
            We use a one-time code to confirm that this mobile
            number belongs to you.
          </p>
        </div>

        <div className="verify-mobile-field">
          <label htmlFor="verifyPhone">Mobile number</label>
          <input
            id="verifyPhone"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="+233XXXXXXXXX"
          />
        </div>

        <button
          type="button"
          className="verify-mobile-secondary"
          onClick={handleSendOTP}
          disabled={isSending}
        >
          {isSending
            ? "Sending code..."
            : otpSent
              ? "Resend code"
              : "Send verification code"}
        </button>

        {otpSent && (
          <form className="verify-mobile-form" onSubmit={handleVerifyOTP}>
            <div className="verify-mobile-field">
              <label htmlFor="mobileOtp">6-digit verification code</label>
              <input
                id="mobileOtp"
                type="text"
                inputMode="numeric"
                maxLength="6"
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              className="verify-mobile-primary"
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify mobile number"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default VerifyMobilePage;
