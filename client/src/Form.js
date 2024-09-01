import { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Form() {
  const initialFormData = {
    fullname: "",
    email: "",
    phonenumber: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };
  const sendData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://contactformapplication-3.onrender.com/api/v1/contact",
        formData
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setHasSubmitted(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.phonenumber ||
      !formData.message
    ) {
      toast.dismiss();
      toast.error("All fields are required");
      return;
    }
    if (formData.fullname.length > 20) {
      toast.dismiss();
      toast.error("Name should be at most 20 characters");
      return;
    }
    if (
      formData.phonenumber.length !== 10 ||
      !/^\d{10}$/.test(formData.phonenumber)
    ) {
      toast.dismiss();
      toast.error("Incorrect PhoneNumber");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.dismiss();
      toast.error("Invalid email address");
      return;
    }

    sendData();
    setFormData(initialFormData);
  };
  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Sending...", { id: "loading-toast" });
    } else if (!isLoading && hasSubmitted) {
      toast.update("loading-toast", {
        render: "Send successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [isLoading, hasSubmitted]);

  return (
    <div className="main">
      <div className="image">
        <img src="https://media.istockphoto.com/id/1323765737/photo/close-up-of-a-businessman-using-a-laptop-computer-and-a-mobile-phone.webp?b=1&s=612x612&w=0&k=20&c=dMQ9OWLgVWXir9KBH-vHDkp68s2dodEiEqEVjTf6rF4=" />
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2>GET IN TOUCH</h2>
          <p style={{ display: "flex", gap: "20px" }}>
            <p>📞+91-7814214323</p> <p>📩itsbaljindersingh17@gmail.com</p>
          </p>

          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            onChange={handleChange}
            value={formData.fullname}
          ></input>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          ></input>
          <input
            type="tel"
            placeholder="ContactNo."
            name="phonenumber"
            onChange={handleChange}
            pattern="[0-9]*"
            inputMode="numeric"
            value={formData.phonenumber}
          ></input>
          <textarea
            id="message"
            placeholder="Your Message"
            rows="5"
            cols="40"
            name="message"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
          <button type="submit" disabled={isLoading}>
            send
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" pauseOnFocusLoss pauseOnHover />
    </div>
  );
}

export default Form;
