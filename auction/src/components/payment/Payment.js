import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51M8jIFCRKiTr81AEwQ9Uwa2VTyvep9sHhbne0P978NBiDUImftN0oVCx4etDWsh2ebV3OfCD9lWbh2zuGYO0dtS400XUCYc8uc"
);

const Payment = ({ id, name, email, ammount }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Hi {name}</h1>
      <p>Please pay {ammount} Taka !</p>
      <div className="w-1/2 mt-10 mx-auto bg-orange-200 p-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm data={(id, name, email, ammount)} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
