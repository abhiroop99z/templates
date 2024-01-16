import React, { useState } from "react";
import Footer from "../Footer";
import styles from "./Onboard.module.css";
import axios from "axios";
import { useEffect } from "react";
import SuccessModal from "../SuccessModal/SuccessModal";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "../ViewOnboardingStatic/Loader/Loader";
import Spinner from "react-bootstrap/Spinner";

const message = (
  <h6>
    Response 200: Successfully Endorsed by Customer Department , Operations
    Department & Accounts Department. <br /> <br />
    Merchant Successfully Onboarded
  </h6>
);
const header = "Merchant Onboarding Successful";
const Onboard = (props) => {
  const IP = props.IP;
  //setting role message
  const [roleMsg, setRoleMsg] = useState(false);

  //loader state
  const [loader, setLoader] = useState(false);
  //loader message
  const [loadermessage, setLoadermessage] = useState(
    "please wait when the merchant is getting onboarded"
  );
  const [popupMessage, setPopupMessage] = useState("");
  const [popupHeading, setPopupHeading] = useState("");
  const [popupReason, setPopupReason] = useState("");

  //summary state
  const [summaryState, setSummaryState] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);

  //success Modal
  const [modal, setModal] = useState(false);

  const [failureModal, setFailureModal] = useState(false);

  const [onboardingFormData, setOnboardingFormData] = useState({
    merchantName: "",
    merchantID: "",
    merchantDescription: "",
    merchantCategoryCode: "",
    product: "",
    txcNegotiatedMDR: "",
    promoCode: "",
    txcMaxTxPerDay: "",
    txcTxCurrency: "",
    txcMaxTxAmount: "",
    txcMinTxAmount: "",
    transactionGeographiesAllowed: "",
    merchantAccountNumber: "",
    merchantBankCode: "",
    isContractSigned: "",
    kycStatus: "",
    customerID: "",
    securityDeposits: "",
    numberOfPOSTerminalsRequired: "",
    loanExpiryDate: "",
    maxLoanAmount: "",
    currentOutstandingAmount: "",
    totalDisbursedAmount: "",
    isDefaulter: "",
    customerName: "",
    POSID: "",
    roleId: props.roleId,
  });

  //reading roleId from header
  useEffect(() => {
    setOnboardingFormData((onboardingFormData) => {
      return { ...onboardingFormData, roleId: props.roleId };
    });
    console.log(props.roleId);
  }, [props.roleId]);

  const onChangeHandel = (e) => {
    setOnboardingFormData({
      ...onboardingFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickContinue = () => {
    // api call
    setSummaryState(false);
    setLoader(true);
    if (props.roleId.length !== 0) {
      onboardingFormData.customerID = "C" + onboardingFormData.merchantID;
      setRoleMsg(false);

      console.log(onboardingFormData);

      setTimeout(() => {
        setLoadermessage(`This will take a few moments... 
        The operation is being processed.`);
      }, 5000);

      axios
        .post(
          `http://${IP}:3001/api/v1/saveOBMerchantSummary`,
          onboardingFormData,
          {
            header: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          setLoadermessage("Success");
          console.log(response);
          setLoading(false);
          setLoader(false);
          props.fetchOrganizationData();
          setPopupHeading("Merchant Onboarding Successful");
          setPopupMessage(response.data.message);
          setPopupReason("");
          setModal(true);
        })

        .catch((err) => {
          setLoading(false);
          setLoader(false);
          console.log(err);
          console.log("Error while onboarding merchant", err);
          setPopupHeading("Error in Merchant Onboarding");
          setPopupMessage(err.response.data.message);
          setPopupReason(err.response.data.reason);
          setModal(true);
        });

      localStorage.submit = true;
    } else {
      setRoleMsg(true);
    }
  };
  const onClickClose = () => {
    setSummaryState(false);
  };
  const submitForm = (event) => {
    event.preventDefault();
    //enabling
    setSummaryState(true);
    //setLoading(true)
  };
  const getState = (state) => {
    console.log(state);
    setModal(state);
    setFailureModal(state);
  };

  return (
    <div className={modal ? "mainBlur" : "main"}>
      <div className="container">
        <div className="cols2">
          <h4 style={{ textAlign: "center" }} className="mt-4 mb-4">
            Merchant Onboarding
          </h4>
        </div>
        <div
          className={`row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xxl-2 ${styles.rowSpacing}`}
        >
          <div className={`col ${styles.col1}`}>
            <span className={styles.floatingA}>a. Merchant Profile:</span>
            <div className={`${styles.placeInputsNames}`}>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Payment Acceptor Name:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Payment Acceptor Name"
                    name="merchantName"
                    value={onboardingFormData.merchantName}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Payment Acceptor <br /> Identification Code:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Payment Acceptor Id Code"
                    name="merchantID"
                    value={onboardingFormData.merchantID}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Payment Acceptor Description:{" "}
                  </label>
                </div>
                <div className="col">
                  <textarea
                    rows="3"
                    cols="60"
                    className="form-control"
                    placeholder="Maximum 100 Characters"
                    name="merchantDescription"
                    value={onboardingFormData.merchantDescription}
                    onChange={onChangeHandel}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Merchant Category Code:
                  </label>
                </div>
                <div className="col">
                  <select
                    style={{ height: "40px", fontSize: "14px" }}
                    name="merchantCategoryCode"
                    className="form-select"
                    onChange={onChangeHandel}
                    value={onboardingFormData.merchantCategoryCode}
                  >
                    <option value="">Select Merchant Category Code</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Travel">Travel</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Oil and Gas">Oil and Gas</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Product:
                  </label>
                </div>
                <div className="col">
                  <select
                    style={{ height: "40px", fontSize: "14px" }}
                    name="product"
                    onChange={onChangeHandel}
                    value={onboardingFormData.product}
                    id=""
                    className="form-select"
                  >
                    <option value="">Select Product Type</option>
                    <option value="PR1">PR1</option>
                    <option value="PR2">PR2</option>
                    <option value="PR3">PR3</option>
                    <option value="PR4">PR4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={`col ${styles.col2}`}>
            <span className={styles.floatingB}>
              c.Transaction Criteria/Thresholds:
            </span>
            <div className={`${styles.placeInputsNames}`}>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Negotiated MDR :
                  </label>
                </div>
                <div className="col">
                  <select
                    style={{ height: "40px", fontSize: "14px" }}
                    name="txcNegotiatedMDR"
                    id="txcNegotiatedMDR"
                    className="form-select"
                    onChange={onChangeHandel}
                    value={onboardingFormData.txcNegotiatedMDR}
                  >
                    <option value="">Select Merchant MDR</option>
                    <option value="1.5">1.5</option>
                    <option value="2.0">2.0</option>
                    <option value="2.5">2.5</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Promo Code:
                  </label>
                </div>
                <div className={`col ${styles.placingMsgHover}`}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo Code"
                    aria-label="Last name"
                    name="promoCode"
                    onChange={onChangeHandel}
                    value={onboardingFormData.promoCode}
                  />{" "}
                  <span
                    className={styles.tool}
                    data-tip="Promo code should start with PROMO- e.g. PROMO-ONE."
                    tabIndex="1"
                  >
                    <BsInfoCircle />
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Number of Transactions allowed per day:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Max 6 digits"
                    aria-label="Last name"
                    name="txcMaxTxPerDay"
                    value={onboardingFormData.txcMaxTxPerDay}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Transaction Currency:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Transaction Currency"
                    aria-label="Last name"
                    name="txcTxCurrency"
                    value={onboardingFormData.txcTxCurrency}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Transaction Maximum Amount:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Max 6 digits"
                    aria-label="Last name"
                    name="txcMaxTxAmount"
                    value={onboardingFormData.txcMaxTxAmount}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Transaction Minimum Amount:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Max 6 digits"
                    aria-label="Last name"
                    name="txcMinTxAmount"
                    value={onboardingFormData.txcMinTxAmount}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Transaction Geographies Allowed:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location A, Location B"
                    aria-label="Last name"
                    name="transactionGeographiesAllowed"
                    value={onboardingFormData.transactionGeographiesAllowed}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`col ${styles.col3}`}>
            <span className={styles.floatingC}>B.Merchant Bank Details:</span>
            <div className={`${styles.placeInputsNames}`}>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Account Number{" "}
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account  Number"
                    aria-label="Last name"
                    name="merchantAccountNumber"
                    value={onboardingFormData.merchantAccountNumber}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Bank Identifier:
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bank Identifier"
                    aria-label="Last name"
                    name="merchantBankCode"
                    value={onboardingFormData.merchantBankCode}
                    onChange={onChangeHandel}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`col ${styles.col4}`}>
            <span className={styles.floatingD}>d. POS Terminal Details:</span>
            <div className={`${styles.placeInputsNames}`}>
              <div className="row">
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {/* Merchant's Bank Details: */}
                </span>
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Number of POS Terminals :
                  </label>
                </div>
                <div className={`col ${styles.placingMsgHover}`}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Terminals Number"
                    aria-label="Last name"
                    name="numberOfPOSTerminalsRequired"
                    onChange={onChangeHandel}
                    value={onboardingFormData.numberOfPOSTerminalsRequired}
                  />
                  <span
                    className={styles.tool}
                    data-tip=" number should be numeric e.g. 9X"
                    tabIndex="1"
                  >
                    <span className={styles.hoverMsg}>
                      {" "}
                      <BsInfoCircle />{" "}
                    </span>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Security Deposits:
                  </label>
                </div>
                <div className={`col ${styles.placingMsgHover}`}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="number of Deposits"
                    aria-label="Last name"
                    name="securityDeposits"
                    onChange={onChangeHandel}
                    value={onboardingFormData.securityDeposits}
                  />
                  <span
                    className={styles.tool}
                    data-tip="Number of deposits should start with a number e.g. 12."
                    tabIndex="1"
                  >
                    <span className={styles.hoverMsg}>
                      {" "}
                      <BsInfoCircle />{" "}
                    </span>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    Contract signed with Merchant:
                  </label>
                </div>
                <div className="col mt-2">
                  <input
                    type="radio"
                    name="isContractSigned"
                    value="YES"
                    onChange={onChangeHandel}
                  />
                  &nbsp;Yes
                  <input
                    type="radio"
                    name="isContractSigned"
                    value="NO"
                    style={{ marginLeft: "10px" }}
                    onChange={onChangeHandel}
                  />
                  &nbsp;No
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name" className="col-form-label">
                    KYC Status(Completed/Not Completed):
                  </label>
                </div>
                <div className="col mt-2">
                  <input
                    type="radio"
                    name="kycStatus"
                    value="YES"
                    onChange={onChangeHandel}
                  />
                  &nbsp;Completed
                  <input
                    type="radio"
                    name="kycStatus"
                    value="NO"
                    style={{ marginLeft: "10px" }}
                    onChange={onChangeHandel}
                  />
                  &nbsp;Not Completed
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <p>
          Note : attributes shown are examples for this POC and would be chosen
          as per business need.
        </p>
        <div className="col-md-12 mt-4 d-flex justify-content-center align-items-center">
          {props.roleId === "Agg2" ||
          props.roleId === "CAcct" ||
          props.roleId === "EDI" ||
          props.roleId === "AP" ? (
            <button
              type="button"
              className="btn btn-outline-success bt1"
              disabled
            >
              Save
            </button>
          ) : loading ? (
            <button className={styles.loaderSubmit}></button>
          ) : (
            <button
              type="button"
              className={`${styles.buttonbt2} bt2`}
              onClick={submitForm}
            >
              Save
            </button>
          )}
          <button type="button" className="btn btn-outline-danger bt2">
            Cancel
          </button>
          {roleMsg ? (
            <p style={{ color: "red", textAlign: "center" }}>
              Select the Role*
            </p>
          ) : null}
        </div>
      </div>
      {modal ? (
        <SuccessModal
          getState={getState}
          message={popupMessage}
          reason={popupReason}
          header={popupHeading}
        />
      ) : null}
      {failureModal ? (
        <SuccessModal
          getState={getState}
          message={popupMessage}
          header={popupHeading}
          reason={popupReason}
        />
      ) : null}

      {summaryState && (
        <div className="blur">
          <div className="modalDemo">
            <span
              className="cross"
              onClick={onClickClose}
              style={{ fontSize: "20px" }}
            >
              ✖
            </span>
            <div className="modalHeader">
              <h4>Confirm Details</h4>
            </div>
            <hr />
            <div className="modalBody">
              <h5>
                By confirming these details, you are about to add the merchant{" "}
                {onboardingFormData.merchantName} to the network.
              </h5>
            </div>
            <hr />
            <div className="modalFooter">
              <button onClick={onClickContinue} className="btn btn-primary">
                Confirm
              </button>

              <button
                onClick={onClickClose}
                style={{ marginRight: "10px" }}
                className="btn btn-outline-danger"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {loader && (
        <div className="blur">
          {/* <Spinner animation="border" role="status">
        </Spinner>
          <span>Loading...</span> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "40px",
            }}
          >
            <div id="wifi-loader">
              <svg className="circle-outer" viewBox="0 0 86 86">
                <circle className="back" cx="43" cy="43" r="40"></circle>
                <circle className="front" cx="43" cy="43" r="40"></circle>
                <circle className="new" cx="43" cy="43" r="40"></circle>
              </svg>
              <svg className="circle-middle" viewBox="0 0 60 60">
                <circle className="back" cx="30" cy="30" r="27"></circle>
                <circle className="front" cx="30" cy="30" r="27"></circle>
              </svg>
              <svg className="circle-inner" viewBox="0 0 34 34">
                <circle className="back" cx="17" cy="17" r="14"></circle>
                <circle className="front" cx="17" cy="17" r="14"></circle>
              </svg>
              {/* <div className="text" style={{ fontWeight:'bold', textTransform: "capitalize",position:'relative' ,top:'120px', width:'300px'}}>
      
        </div> */}
            </div>
            <p
              style={{
                fontWeight: "bold",
                textTransform: "capitalize",
                marginTop: "20px",
              }}
            >
              {" "}
              {loadermessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboard;
