import React, { useEffect, useState } from "react";
import BasicDatePicker from "./date";
import Locations from "./Locations";
import NavScrollExample from "./Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import logo from "./Images/car-logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const [carData, setcarData] = useState([]);
  const [dat, setDat] = useState();

  const location = useLocation();
  const token = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await GetCarDetails())();
  }, []);

  async function GetCarDetails() {
    try {
      const result = await axios.get(
        "http://localhost:5260/api/Car/admin/cars/GetCarsList",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      setcarData(result.data);
    } catch (err) {
      toast.error(err);
    }
  }

  const pass = () => {
    navigate("/reservation", { state: { data: carData } });
  };
  return (
    <>
      <NavScrollExample
        state={{
          data: token.token,
          username: token.username ? token.username : null,
          email: token.email ? token.email : null,
          pic: token.picture ? token.picture : null,
          name: token.name ? token.name : null,
        }}
      />
      <Locations />
      <BasicDatePicker />
      <ToastContainer />
      <div className="cardd">
        {carData
          ? carData.map(function fn(Data) {
              return (
                <Card
                  style={{ width: "18rem", borderColor: "grey" }}
                  className="solocard"
                >
                  <Card.Img variant="top" src={Data ? Data.imageURL : logo} />
                  <Card.Body>
                    <Card.Title
                      style={{
                        fontFamily:
                          "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                      }}
                    >
                      {Data ? Data.make + " " + Data.model : ""}
                    </Card.Title>
                    {Data ? (
                      <>
                        <p
                          style={{
                            fontSize: "15px",
                            opacity: "0.7",
                            fontFamily:
                              "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                          }}
                        >
                          {Data.specification}
                        </p>
                        <p
                          style={{
                            fontFamily:
                              "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                          }}
                        >
                          Available :{Data.availability ? "Yes" : "No"}
                        </p>
                      </>
                    ) : (
                      <p>No car data available</p>
                    )}
                    <Link
                      to={{
                        pathname: "/reservation",
                      }}
                      state={{
                        Data: Data,
                        username: token.username,
                        token: token.token,
                      }}
                    >
                      <Button variant="primary">Rent</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default Dashboard;
