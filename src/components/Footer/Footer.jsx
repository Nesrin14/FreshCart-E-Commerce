import React from "react";
import amazon from "../../Assets/images/amazon-logo.png";
import express from "../../Assets/images/american-express-logo.png";
import mastercard from "../../Assets/images/mastercard-logo.png";
import paypal from "../../Assets/images/paypal logo.png"; 
import appStore from "../../Assets/images/app-store.png";
import googlePlay from "../../Assets/images/google-play.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-light shadow mt-auto py-2">
      <div className="container ">
        <h3 className="h5 fw-semibold mb-2">Get the FreshCart App</h3>
        <p>We will send you a link; open it on your phone to download the app.</p>
        <div className="row g-4 justify-content-between align-items-center pb-3 border-bottom border-opacity-25 border-dark">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Your Email"
            />
          </div>
          <div className="col-md text-end">
            <button className="btn btn-success text-light w-100">
              Share App Link
            </button>
          </div>
        </div>
        <div className="row py-3 d-flex justify-content-between align-items-center">
          <div className="col-md-5 partners d-flex justify-content-center align-items-center">
            <p className="fw-semibold mb-3 ">Payment Partners {``}</p>
<div className="row">
  <div className="col-md-12">
    <img src={amazon} alt="amazon logo" className="partner-logo w-25" />
            <img src={express} alt="american express logo" className="partner-logo w-25" />
            <img src={mastercard} alt="mastercard logo" className="partner-logo w-25" />
            <img src={paypal} alt="paypal logo" className="partner-logo w-25" />
  </div>
</div>
            
          </div>
          <div className="col-md-5 store text-md-end ">
            <span className=" fw-semibold mb-3">
              Get Deliveries with FreshCart {` `}
            </span>
            <Link to="https://www.apple.com/store">
              <img src={appStore} alt="app store logo" className="app-logo w-25" />
            </Link>
            <Link to="https://play.google.com/store/games?hl=en&gl=US">
              <img src={googlePlay} alt="google play logo" className="google-logo w-25" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
