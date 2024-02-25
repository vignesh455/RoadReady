import { Card } from "react-bootstrap";
import NavScrollExample from "./mainNav.js";
import img4 from "./Images/etios4.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [countries] = useState([
    { code: "hyderabad", title: "Hyderabad" },
    { code: "chennai", title: "Chennai" },
    { code: "banglore", title: "Banglore" },
    { code: "delhi", title: "Delhi" },
    { code: "Pune", title: "Pune" },
    { code: "Mumbai", title: "Mumbai" },
    { code: "goa", title: "Goa" },
    { code: "Kolkata", title: "Kolkata" },
    { code: "Coimbatore", title: "Coimbatore" },
    { code: "Vijayawada", title: "Vijaywada" },
  ]);
  const [toggleContents, setToggleContents] = useState("Select Location");
  const [selectedCountrystart, setSelectedCountry] = useState();

  const [toggleContent, setToggleContent] = useState("Select Location");
  const [selectedCountyend, setSelectedCounty] = useState();

  const [start, setstart] = React.useState(dayjs());
  const [end, setend] = React.useState(dayjs());

  const [selectedDiv, setSelectedDiv] = useState(null);
  const changeColor = (index) => {
    setSelectedDiv(index);
  };

  const [result, setResult] = useState();
  const [res, setRes] = useState(0);

  const Trip = () => {
    var months = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var Seater = data.Data.dailyRate;
    if (start.$M === end.$M) {
      setRes((end.$D - start.$D) * Seater);
    } else {
      var days = months[start.$M] - start.$D + end.$D;
      setRes(days * Seater);
    }
  };

  useEffect(() => {
    (async () => await GetUserDetails())();
  }, []);

  async function GetUserDetails() {
    try {
      const result = await axios.get(
        "http://localhost:5260/api/User/user/GetUser/" + data.username,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      setResult(result.data);
    } catch (err) {
      alert(err);
    }
  }

  async function AddReservation() {
    try {
      await axios.post("http://localhost:5260/api/Reservation/user/create", {
        reservationId: 0,
        pickUpDateTime: start.toISOString(),
        dropOffDateTime: end.toISOString(),
        status: "Booked",
        pickUpLocation: selectedCountrystart,
        dropOffLocation: selectedCountyend,
        totalPrice: res + 99 + 99,
        payment: null,
        paymentId: null,
        user: null,
        userId: result.userId,
        car: null,
        carId: data.Data.carId,
        appliedDiscounts: null,
      });
      alert("success");
      navigate("/payment", { state: { res: res } });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <NavScrollExample />
      <div className="reserve">
        <Card
          style={{
            position: "relative",
            marginLeft: "30px",
            width: "50rem",
            height: "42rem",
            top: "100px",
          }}
        >
          <Card.Header style={{ height: "400px" }}>
            <img
              style={{ height: "380px", marginLeft: "40px" }}
              src={data.Data.imageURL}
              alt="img"
            />
          </Card.Header>
          <div
            style={{
              marginLeft: "20px",
              fontSize: "large",
              fontWeight: "500",
              marginTop: "10px",
            }}
          >
            <ul>
              <li>{data.Data.make + " " + data.Data.model}</li>
            </ul>
          </div>
          <div style={{ marginLeft: "30px", marginTop: "10px" }}>From</div>
          <div
            style={{
              textAlign: "center",
              position: "relative",
              bottom: "20px",
              marginRight: "110px",
            }}
          >
            To
          </div>
          <div style={{ position: "relative", right: "270px", bottom: "70px" }}>
            <span className="starttime">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Start Date"
                    value={start}
                    onChange={(newValue) => setstart(newValue)}
                    format="LLL"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </span>
            <span className="endtime">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="End Date"
                    value={end}
                    onChange={(newValue) => setend(newValue)}
                    format="LLL"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </span>
            <Button
              variant="outline-primary"
              style={{ position: "relative", top: "75px", left: "950px" }}
              onClick={Trip}
            >
              Save
            </Button>
          </div>
          <Dropdown
            style={{ position: "relative", right: "883px", bottom: "60px" }}
            onSelect={(eventKey) => {
              // eslint-disable-next-line
              const { code, title } = countries.find(
                ({ code }) => eventKey === code
              );

              setSelectedCountry(eventKey);
              setToggleContents(<>{title}</>);
            }}
          >
            <Dropdown.Toggle
              variant="outline-primary"
              id="dropdown-flags"
              className="text-left"
            >
              {toggleContents}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {countries.map(({ code, title }) => (
                <Dropdown.Item key={code} eventKey={code}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            style={{ position: "relative", right: "572px", bottom: "100px" }}
            onSelect={(eventKey) => {
              // eslint-disable-next-line
              const { code, title } = countries.find(
                ({ code }) => eventKey === code
              );

              setSelectedCounty(eventKey);
              setToggleContent(<>{title}</>);
            }}
          >
            <Dropdown.Toggle
              variant="outline-primary"
              id="dropdown-flags"
              className="text-left"
            >
              {toggleContent}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {countries.map(({ code, title }) => (
                <Dropdown.Item key={code} eventKey={code}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Card>
        <div className="secondcard">
          <Card
            style={{
              width: "38rem",
              marginLeft: "40px",
              height: "500px",
              position: "relative",
              top: "100px",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "white",
                fontWeight: "500",
                borderBottom: "none",
                height: "50px",
                textAlign: "center",
              }}
            >
              Wallet & Offers
            </Card.Header>
            <div
              style={{
                cursor: "pointer",
              }}
              className={selectedDiv === 0 ? "box red" : "box"}
              onClick={() => changeColor(0)}
            >
              <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                Apply Coupon{" "}
              </p>
            </div>
            <ListGroup style={{ borderRadius: "0px" }}>
              <ListGroup.Item>
                Trip Amount
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#8377;
                {res}
              </ListGroup.Item>
              <ListGroup.Item>
                Trip Protection
                Fee&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                +&#8377;99
              </ListGroup.Item>
              <ListGroup.Item>
                Convenience
                Fee&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&nbsp;
                +&#8377;99
              </ListGroup.Item>
              <ListGroup.Item>
                Total
                Amount&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&#8377;
                {res + 99 + 99}
              </ListGroup.Item>
              <ListGroup.Item>
                Refundable
                Deposit&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&#8377;0
              </ListGroup.Item>
              <ListGroup.Item>
                Final
                Amount&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&#8377;
                {res + 99 + 99}
              </ListGroup.Item>
            </ListGroup>
            <div>
              <div style={{ position: "relative", top: "20px", left: "20px" }}>
                Please Review Final Amount
              </div>
              <Button
                variant="success"
                style={{ position: "relative", left: "200px", top: "70px" }}
                onClick={AddReservation}
              >
                Proceed to payment &#8377;{res + 99 + 99}
              </Button>
            </div>
          </Card>
        </div>
        <div className="thirdcard">
          <div
            style={{
              marginLeft: "30px",
              fontSize: "large",
              fontWeight: "500",
              position: "relative",
              top: "140px",
            }}
          >
            <ul>
              <li>
                {data.Data.make + " " + data.Data.model} Car Specifications
              </li>
            </ul>
          </div>
          <Card
            style={{
              width: "50rem",
              marginLeft: "30px",
              position: "relative",
              top: "140px",
            }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                Price&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#8377;
                {data.Data.dailyRate}/day
              </ListGroup.Item>
              <ListGroup.Item>
                Mileage&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {data.Data.specification?.slice(9, 15)}
              </ListGroup.Item>
              <ListGroup.Item>
                Engine&emsp;&emsp;&emsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                {data.Data.specification?.slice(16, 30)}
              </ListGroup.Item>
              <ListGroup.Item>
                Fuel&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                Petrol & Diesel
              </ListGroup.Item>
              <ListGroup.Item>
                Transmission&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &nbsp; {data.Data.specification?.slice(38, 45)}
              </ListGroup.Item>
              <ListGroup.Item>
                Seater&emsp;&emsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                {data.Data.specification?.slice(0, 8)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </>
  );
}
export default Reservation;
