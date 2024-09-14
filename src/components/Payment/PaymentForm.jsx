import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./payment.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !month || !year || !phoneNumber) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    const monthmyear = `${month} ${year}`;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/initiate-payment",
        {
          amount,
          monthmyear,
          phoneNumber,
        }
      );

      const { orderId, amount: paymentAmount, currency } = response.data;

      if (orderId) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const options = {
            key: "rzp_test_8G15JO7rGWgx2b",
            amount: paymentAmount,
            currency: currency,
            name: "Your Company Name",
            description: "Payment for Society Maintenance",
            order_id: orderId,
            handler: function (response) {
              Swal.fire({
                icon: "success",
                title: "Payment successful",
                text: "Thank you for your payment!",
              });
            },
            prefill: {
              name: "",
              email: "",
              contact: phoneNumber,
            },
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        };
        document.body.appendChild(script);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error initiating payment",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Month:</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Select a month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            min="2000"
            max="2100"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <div className="phone-input-container">
            <PhoneInput
              international
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="phone-input"
              countrySelectProps={{ unicodeFlags: true }}
            />
          </div>
        </div>
        <button type="submit" className="form-button">
          Initiate Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
