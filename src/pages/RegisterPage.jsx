import { useState } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../api/auth";
import GoogleAuthButton from "../components/GoogleAuthButton";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    accountType: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({
    type: "",
    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setServerMessage({
      type: "",
      text: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Mobile number is required.";
    } else if (
      !/^\+[1-9]\d{7,14}$/.test(
        formData.phoneNumber.trim().replace(/\s+/g, "")
      )
    ) {
      newErrors.phoneNumber =
        "Use international format, for example +233XXXXXXXXX.";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Select an account type.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        "You must accept the terms and privacy policy.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setServerMessage({
      type: "",
      text: "",
    });

    try {
      await registerUser({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone_number: formData.phoneNumber.trim().replace(/\s+/g, ""),
        account_type: formData.accountType,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      setServerMessage({
        type: "success",
        text: "Account created successfully. You can now log in.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        accountType: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });

      setErrors({});
    } catch (error) {
      setServerMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <Link to="/" className="register-logo">
          MeetGate
        </Link>

        <div className="register-heading">
          <span>Get started</span>

          <h1>Create your account</h1>

          <p>
            Register to create meetings, manage invitations and access your
            MeetGate dashboard.
          </p>
        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="register-name-row">
            <div className="register-field">
              <label htmlFor="firstName">First name</label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
              />

              {errors.firstName && (
                <small className="form-error">
                  {errors.firstName}
                </small>
              )}
            </div>

            <div className="register-field">
              <label htmlFor="lastName">Last name</label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />

              {errors.lastName && (
                <small className="form-error">
                  {errors.lastName}
                </small>
              )}
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="registerEmail">Email address</label>

            <input
              type="email"
              id="registerEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />

            {errors.email && (
              <small className="form-error">{errors.email}</small>
            )}
          </div>

          <div className="register-field">
            <label htmlFor="phoneNumber">Mobile number</label>

            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+233XXXXXXXXX"
            />

            {errors.phoneNumber && (
              <small className="form-error">
                {errors.phoneNumber}
              </small>
            )}
          </div>

          <div className="register-field">
            <label htmlFor="accountType">Account type</label>

            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="">Select account type</option>
              <option value="participant">Participant</option>
              <option value="host">Meeting host</option>
              <option value="organisation">Organisation</option>
            </select>

            {errors.accountType && (
              <small className="form-error">
                {errors.accountType}
              </small>
            )}
          </div>

          <div className="register-field">
            <label htmlFor="registerPassword">Password</label>

            <input
              type="password"
              id="registerPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />

            {errors.password && (
              <small className="form-error">
                {errors.password}
              </small>
            )}
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirm password</label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter the password again"
            />

            {errors.confirmPassword && (
              <small className="form-error">
                {errors.confirmPassword}
              </small>
            )}
          </div>

          <label className="register-terms">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />

            <span>
              I agree to the MeetGate terms of service and privacy policy.
            </span>
          </label>

          {errors.acceptTerms && (
            <small className="form-error">
              {errors.acceptTerms}
            </small>
          )}

          {serverMessage.text && (
            <p
              className={
                serverMessage.type === "success"
                  ? "form-success"
                  : "form-server-error"
              }
            >
              {serverMessage.text}
            </p>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <GoogleAuthButton
          mode="signup"
          accountType={formData.accountType}
        />

        <p className="register-login">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;