import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "./mainNav";
import "./Main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Main.css";
//eslint-disable-next-line
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCar() {
  const [CarName, setCarname] = useState("");
  const [CarModel, setCarmodel] = useState("");
  const [spec, setSpec] = useState("");
  const [Imageurl, setImageURL] = useState("");
  const [dailyrate, setDailyRate] = useState("");
  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [year, setYear] = useState();
  //eslint-disable-next-line
  const navigate = useNavigate();

  async function AdminAddcar() {
    try {
      await axios.post("http://localhost:5260/api/Car/admin/cars", {
        carId: 0,
        make: CarName,
        model: CarModel,
        year: year,
        availability: true,
        dailyRate: dailyrate,
        imageURL: Imageurl,
        specification: spec,
        discount: null,
        discountId: null,
        carStore: null,
        reviews: null,
        reservations: null,
        payments: null,
        discounts: null,
      });
      toast.success("Successfully Added Car");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/AdminDashboard");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <MainNav />
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4"> Add Car</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Car Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Car Name"
                      value={CarName}
                      onChange={(e) => setCarname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Car Model
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Car Model"
                      value={CarModel}
                      onChange={(e) => setCarmodel(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Specifications
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Specification"
                      value={spec}
                      onChange={(e) => setSpec(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      ImageURL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Image URL"
                      value={Imageurl}
                      onChange={(e) => setImageURL(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      DailyRate
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Daily Rate"
                      value={dailyrate}
                      onChange={(e) => setDailyRate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={AdminAddcar}
                    disabled={loading}
                  >
                    {loading ? "Submit..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCar;
