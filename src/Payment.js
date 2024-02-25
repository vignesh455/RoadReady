import { Card } from "react-bootstrap";
import NavScrollExample from "./mainNav.js";
import card from "./Images/credit-card.png";
import wallet from "./Images/wallet.png";
import upi from "./Images/upi.png";
import "./Main.css";
import { useState } from "react";
import gpay from "./Images/Gpay.png";
import phonepe from "./Images/PhonePe.png";
import qrcode from "./Images/QRcode.jpg";
import { useNavigate,useLocation } from "react-router-dom";

function Payment() {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const location = useLocation();
  const res = location.state;
  console.log(location);
  const changeColor = (index) => {
    setSelectedDiv(index);
  };

  return (
    <>
      <NavScrollExample />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            position: "absolute",
            top: "180px",
            left: "110px",
            fontWeight: "500",
            fontSize: "large",
          }}
        >
          Select a Payment Method
        </div>
        <Card
          style={{
            width: "20rem",
            height: "18rem",
            top: "200px",
            left: "100px",
          }}
        >
          <div
            style={{
              position: "relative",
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "20px",
              fontWeight: "500"
            }}
          >
            Payment Options
          </div>
          <div
            className={selectedDiv === 1 ? "box red" : "box"}
            onClick={() => changeColor(1)}
            style={{ display: "flex" }}
          >
            <img
              style={{
                height: "40px",
                position: "relative",
                marginTop: "10px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
              src={upi}
              alt="img"
            />
            <p
              style={{
                marginTop: "12px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              UPI
            </p>
            <p
              style={{
                position: "relative",
                top: "32px",
                fontSize: "small",
                right: "25px",
                opacity: "0.7",
              }}
            >
              Google pay,PhonePe,BHIM UPI
            </p>
          </div>
          <hr
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
              bottom: "10px",
            }}
          />
          <div
            className={selectedDiv === 2 ? "box red" : "box"}
            onClick={() => changeColor(2)}
            style={{
              textAlign: "left",
              display: "flex",
              position: "relative",
              bottom: "20px",
            }}
          >
            <img
              style={{
                height: "40px",
                marginLeft: "15px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              src={card}
              alt="img"
            />
            <p
              style={{
                marginTop: "12px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              Credit / Debit / ATM Card
            </p>
            <p
              style={{
                position: "absolute",
                top: "31px",
                left: "65px",
                fontSize: "small",
                opacity: "0.7",
              }}
            >
              All major card providers are supported
            </p>
          </div>
          <hr
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
              bottom: "30px",
            }}
          />
          <div
            className={selectedDiv === 3 ? "box red" : "box"}
            onClick={() => changeColor(3)}
            style={{
              textAlign: "left",
              display: "flex",
              position: "relative",
              bottom: "40px",
            }}
          >
            <img
              style={{
                height: "40px",
                marginLeft: "15px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              src={wallet}
              alt="img"
            />
            <p
              style={{
                marginTop: "12px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              Mobile Wallet
            </p>
            <p
              style={{
                position: "absolute",
                top: "31px",
                left: "65px",
                fontSize: "small",
                opacity: "0.7",
              }}
            >
              All major wallets are supported
            </p>
          </div>
        </Card>
        <Card
          style={{
            width: "25rem",
            height: "18rem",
            top: "200px",
            left: "90px",
            borderRadius: "0"
          }}
        >
          <div style={{ marginLeft: "20px", marginTop: "20px", fontWeight: "500" }}>Select UPI App</div>
          <div style={{ marginLeft: "30px", fontSize: "small", opacity: "0.7" }}>Amount : {res.res}</div>
          <div style={{ marginLeft: "20px", marginTop: "20px", fontWeight: "500" }}>Preferred Payment Options</div>
          <div style={{ display: "flex", flexWrap: "wrap", position: "relative", top: "20px" }} className={selectedDiv === 4 ? "box red" : "box"}
            onClick={() => changeColor(4)}>
            <img style={{ height: "23px", marginTop: "9px", marginLeft: "20px" }} src={gpay} alt="img" />
            <p style={{ marginLeft: "60px", marginTop: "5px", fontSize: "medium" }}>Google pay</p>
          </div>
          <hr
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
              top: "10px"
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", position: "relative" }} className={selectedDiv === 5 ? "box red" : "box"}
            onClick={() => changeColor(5)}>
            <img style={{ height: "30px", marginTop: "9px", marginLeft: "23px" }} src={phonepe} alt="img" />
            <p style={{ marginLeft: "77px", marginTop: "10px", fontSize: "medium" }}>PhonePe</p>
          </div>
        </Card>
        <Card style={{ width: "20rem", height: "18rem", top: "200px", marginLeft: "88px", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
          <div style={{textAlign:"center"}}>
            <p style={{position:"relative",top:"15px",fontWeight:"500"}}>Scan QR to Pay</p>
            <img style={{ height: "220px", width: "240px" }} src={qrcode} alt="img" />
          </div>
        </Card>
        
      </div>
    </>
  );
}

export default Payment;
