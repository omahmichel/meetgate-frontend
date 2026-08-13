import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getGoogleAuthConfig,
  googleAuth,
} from "../api/auth";

let googleScriptPromise = null;

function loadGoogleIdentityServices() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[data-meetgate-google="true"]'
      );

      if (existingScript) {
        existingScript.addEventListener("load", resolve, {
          once: true,
        });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Google Sign-In could not be loaded.")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.dataset.meetgateGoogle = "true";
      script.onload = resolve;
      script.onerror = () =>
        reject(new Error("Google Sign-In could not be loaded."));

      document.head.appendChild(script);
    });
  }

  return googleScriptPromise;
}

function GoogleAuthButton({
  accountType = "",
  mode = "signin",
}) {
  const buttonRef = useRef(null);
  const accountTypeRef = useRef(accountType);
  const navigate = useNavigate();

  useEffect(() => {
    accountTypeRef.current = accountType;
  }, [accountType]);

  useEffect(() => {
    let cancelled = false;

    async function initializeGoogleButton() {
      try {
        const config = await getGoogleAuthConfig();
        await loadGoogleIdentityServices();

        if (
          cancelled ||
          !buttonRef.current ||
          !window.google?.accounts?.id
        ) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: config.client_id,
          callback: async (credentialResponse) => {
            try {
              const data = await googleAuth(
                credentialResponse.credential,
                accountTypeRef.current
              );

              localStorage.setItem("access", data.access);
              localStorage.setItem("refresh", data.refresh);
              localStorage.setItem(
                "user",
                JSON.stringify(data.user)
              );

              toast.success(
                data.is_new_user
                  ? "Google account created successfully."
                  : "Google sign-in successful."
              );

              navigate(
                data.user.mobile_verified
                  ? "/dashboard"
                  : "/verify-mobile"
              );
            } catch (error) {
              toast.error(error.message);
            }
          },
        });

        buttonRef.current.innerHTML = "";

        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: "outline",
            size: "large",
            shape: "rectangular",
            text:
              mode === "signup"
                ? "signup_with"
                : "signin_with",
            logo_alignment: "left",
            width: 360,
          }
        );
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message);
        }
      }
    }

    initializeGoogleButton();

    return () => {
      cancelled = true;
    };
  }, [mode, navigate]);

  return (
    <div className="google-auth-area">
      <div className="auth-divider">
        <span>or</span>
      </div>

      <div
        ref={buttonRef}
        className="google-auth-button"
      />

      {mode === "signup" && (
        <p className="google-auth-note">
          Google signup uses Participant when no account type
          is selected.
        </p>
      )}
    </div>
  );
}

export default GoogleAuthButton;
