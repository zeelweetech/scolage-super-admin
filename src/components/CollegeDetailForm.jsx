import React, { useState } from "react";
import styled from "styled-components";

import { Dropdown } from "primereact/dropdown";
import RadioButtons from "./RadioButtons";
import MoreInfoField from "./MoreInfoField";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useLoadingBar } from "../context/LoadingBarContext";
import eye from "../assets/icons8-hide-30.png";
import eyeShow from "../assets/icons8-eye-30.png";

const Wrapper = styled.div`
  display: flex;
  gap: 50px;
  .form-left {
    flex: 1;
  }
  .form-right {
    flex: 1;
  }

  .add-btn-cta {
    margin-left: 150px;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    text-decoration-line: underline;
    color: #60269e;
    transform: translateY(-10px);
  }

  @media (min-width: 768px) and (max-width: 1620px) {
    flex-direction: column;
    gap: 0;
  }

  @media (min-width: 1621px) and (max-width: 1880px) {
    gap: 10px;
  }
`;

const InputFieldStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 25px;

  label {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    margin-right: 35px;
  }

  .input {
    width: calc(100% - 135px);

    input {
      width: 100%;
      background: #ffffff;
      border: 1px solid #707070;
      padding: 12px 20px;
      border-radius: 16px;
      outline: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000000;
      &:focus {
        border-color: #60269e;
        filter: drop-shadow(1.389px 7.878px 20px rgba(105, 95, 151, 0.122));
      }
    }
    .password-toggle {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-100%);
      height: 25px;
      width: 25px;
      cursor: pointer;
    }

    &.input-group {
      display: flex;
      align-items: stretch;
      input {
        border-radius: 16px 0 0 16px;
      }

      .p-dropdown {
        width: 115px;
        box-shadow: none;
        border-color: #707070;
        border-left: 0px;
        border-radius: 0 16px 16px 0;
        .p-dropdown-label {
          padding-right: 0;
          font-weight: 400;
          text-transform: capitalize;
          font-size: 14px;
          line-height: 19px;
          color: #000000;
        }
      }
    }

    &.city-input {
      display: flex;
      gap: 50px;
      .area-block {
        display: flex;
        align-items: center;
        min-width: 250px;
      }
    }
  }
`;

const InputField = ({
  title,
  id,
  placeholder,
  type,
  name,
  onTogglePassword,
}) => {
  return (
    <InputFieldStyles>
      <label htmlFor={id}>{title}</label>
      <div className="input">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required
        />
        {type === "password" && onTogglePassword && (
          <img
            src={eye}
            alt=""
            className="password-toggle"
            onClick={onTogglePassword}
          />
        )}

        {type === "text" && onTogglePassword && (
          <img
            src={eyeShow}
            alt="Toggle Password"
            className="password-toggle"
            onClick={onTogglePassword}
          />
        )}
      </div>
    </InputFieldStyles>
  );
};

const PhoneInput = ({
  id,
  title,
  type,
  placeholder,
  phoneType,
  setPhoneType,
  name,
  options,
}) => {
  return (
    <InputFieldStyles>
      <label htmlFor={id}>{title}</label>
      <div className="input input-group">
        <input type={type} id={id} placeholder={placeholder} name={name} />
        <Dropdown
          optionLabel="name"
          optionValue="name"
          value={phoneType}
          onChange={(e) => setPhoneType(e.value)}
          options={options}
          className="w-full md:w-14rem"
        />
      </div>
    </InputFieldStyles>
  );
};

const CityBlockStyles = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  gap: 20px;
  justify-content: space-between;
  .city-block {
    display: flex;
    align-items: center;
    label {
      display: block;
      width: 100px;
      min-width: 100px;
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #000000;
      margin-right: 35px;
    }
    input {
      width: calc(100% - 135px);
      background: #ffffff;
      border: 1px solid #707070;
      padding: 12px 20px;
      border-radius: 16px;
      outline: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000000;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    align-items: start;
    .city-block {
      width: 100%;
      input {
        min-width: calc(100% - 135px);
      }
    }
  }
`;

const CityBlock = () => {
  return (
    <CityBlockStyles>
      <div className="city-block">
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" placeholder="Hyderabad" />
      </div>
      <div className="city-block area-block">
        <label htmlFor="area">Area</label>
        <input type="text" id="area" name="area" placeholder="Marredpally" />
      </div>
    </CityBlockStyles>
  );
};

const LocationStyles = styled.div`
  display: flex;
  padding-bottom: 25px;
  p {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    padding-top: 20px;
    margin-right: 35px;
  }

  .map-block {
    width: calc(100% - 135px);
    height: 130px;
    background: #ffffff;
    border: 1px solid #707070;
    border-radius: 20px;
    overflow: hidden;

    textarea {
      height: 100%;
      width: 100%;
      padding: 10px;
      outline: none;
    }
  }
`;

const LocationBlock = () => {
  return (
    <LocationStyles>
      <p htmlFor="location">Location</p>
      <div className="map-block">
        <textarea className="map-link" name="location"></textarea>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.1654212487304!2d78.50663079248724!3d17.44387211831329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a3a7d6c32f3%3A0x3914ae52024acff4!2sMarredpally%2C%20Teachers%20Colony%2C%20East%20Nehru%20Nagar%2C%20Secunderabad%2C%20Telangana%20500026!5e0!3m2!1sen!2sin!4v1686722486313!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
      </div>
    </LocationStyles>
  );
};

const DropdownFieldStyles = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;

  p {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    margin-right: 35px;
  }

  .dropdown-field {
    width: calc(100% - 135px);

    .p-dropdown {
      width: 100%;
      border: 1px solid #707070;
      border-radius: 16px;
      box-shadow: none;
      .p-dropdown-label {
        padding: 12px 20px;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #7a86a1;
        text-transform: capitalize;
      }
    }
  }
`;

const DropdownField = ({ title, selected, setSelected, options }) => {
  return (
    <DropdownFieldStyles>
      <p>{title}</p>
      <div className="dropdown-field">
        <Dropdown
          optionLabel="name"
          optionValue="name"
          onChange={(e) => setSelected(e.value)}
          value={selected}
          options={options}
        />
      </div>
    </DropdownFieldStyles>
  );
};

const AcademicBlockStyles = styled.div`
  display: flex;
  padding-bottom: 25px;
  p {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    margin-right: 35px;
  }

  .radio-block {
    width: calc(100% - 135px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    label {
      text-transform: capitalize;
    }
  }
`;

const ClgInfoStyles = styled.div`
  .class-room-main {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    padding-bottom: 25px;

    .class-room-block {
      display: flex;
      align-items: center;
      p {
        width: 100px;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #000000;
        margin-right: 35px;
      }
      input {
        background: #fff;
        border: 1px solid #707070;
        border-radius: 16px;
        padding: 0 10px;
        font-weight: 400;
        font-size: 15px;
        line-height: 43px;
        color: #000;
        text-align: center;
        width: 85px;
        outline: none;
      }
    }

    .total-seats {
      display: flex;
      align-items: center;
      gap: 14px;
      p {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #000000;
      }
      input {
        background: #fff;
        border: 1px solid #707070;
        border-radius: 16px;
        padding: 0 10px;
        font-weight: 400;
        font-size: 15px;
        line-height: 43px;
        color: #000;
        text-align: center;
        width: 85px;
        outline: none;
      }
    }
    .class-type {
      display: flex;
      align-items: center;
      gap: 14px;

      p {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #000000;
      }

      .p-dropdown {
        width: 113px;
        border: 1px solid #707070;
        border-radius: 16px;
        box-shadow: none;

        .p-dropdown-label {
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
          text-transform: uppercase;
          color: #000;
          padding-right: 0;
        }
      }
    }
  }

  .clg-code-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 25px;

    .clg-code {
      display: flex;
      align-items: center;
      p {
        width: 100px;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #000000;
        margin-right: 35px;
      }
      input {
        background: #fff;
        border: 1px solid #707070;
        border-radius: 16px;
        padding: 0 10px;
        font-weight: 400;
        font-size: 15px;
        line-height: 43px;
        color: #000;
        text-align: center;
        width: 85px;
        outline: none;
      }
    }

    .total-seats {
      display: flex;
      align-items: center;
      gap: 14px;

      p {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #000000;
      }

      input {
        background: #fff;
        border: 1px solid #707070;
        border-radius: 16px;
        padding: 0 10px;
        font-weight: 400;
        font-size: 15px;
        line-height: 43px;
        color: #000;
        text-align: center;
        width: 85px;
        outline: none;
      }
    }

    .class-type {
      display: flex;
      align-items: center;
      gap: 14px;

      p {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #000000;
      }
      input {
        background: #fff;
        border: 1px solid #707070;
        border-radius: 16px;
        padding: 0 10px;
        font-weight: 400;
        font-size: 15px;
        line-height: 43px;
        color: #000;
        text-align: center;
        width: 113px;
        outline: none;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .class-room-main {
      flex-direction: column;
      align-items: start;
      gap: 25px;
      .class-room-block {
        width: 100%;
      }
      .total-seats {
        gap: 0;
        width: 100%;
      }
      .class-type {
        width: 100%;
        gap: 0;
        .p-dropdown {
          width: calc(100% - 135px) !important;
        }
      }
      .class-type .p-dropdown .p-dropdown-label {
        text-align: center;
      }
    }
    p {
      width: 100px !important;
      margin-right: 35px !important;
    }
    input {
      width: calc(100% - 135px) !important;
    }

    .clg-code-main {
      flex-direction: column;
      align-items: start;
      gap: 25px;

      .clg-code {
        width: 100%;
      }
      .total-seats {
        gap: 0;
        width: 100%;
      }
      .class-type {
        gap: 0;
        width: 100%;
      }
    }
  }

  @media (min-width: 1621px) and (max-width: 1820px) {
    .class-room-main {
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
    }
  }
  @media (min-width: 1621px) and (max-width: 1820px) {
    .class-room-main {
      flex-direction: column;
      align-items: start;
      gap: 25px;
      .class-room-block {
        width: 100%;
      }
      .total-seats {
        gap: 0;
        width: 100%;
      }
      .class-type {
        width: 100%;
        gap: 0;
        .p-dropdown {
          width: calc(100% - 135px) !important;
        }
      }
      .class-type .p-dropdown .p-dropdown-label {
        text-align: center;
      }
    }
    p {
      width: 100px !important;
      margin-right: 35px !important;
    }
    input {
      width: calc(100% - 135px) !important;
    }

    .clg-code-main {
      flex-direction: column;
      align-items: start;
      gap: 25px;

      .clg-code {
        width: 100%;
      }
      .total-seats {
        gap: 0;
        width: 100%;
      }
      .class-type {
        gap: 0;
        width: 100%;
      }
    }
  }
`;

const TimingStyles = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;

  .main-title {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    margin-right: 35px;
  }

  .options-block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid #707070;
    min-height: 45px;
    width: calc(100% - 135px);
    border-radius: 16px;
    padding: 10px 20px;
    gap: 6px 24px;

    .time-select {
      display: flex;
      align-items: center;
      gap: 14px;

      label {
        font-weight: 400;
        font-size: 15px;
        color: #7a86a1;
      }
      .p-dropdown {
        border: none;
        box-shadow: none;
        .p-dropdown-label {
          font-weight: 400;
          font-size: 15px;
          /* line-height: 20px; */
          color: #7a86a1;
          padding: 0;
          text-transform: uppercase;
        }
        .p-dropdown-trigger {
          width: 30px;
        }
      }
    }

    .day-select {
      .p-dropdown-label {
        text-transform: capitalize !important;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .options-block {
      /* flex-direction: column; */
      flex-wrap: wrap;
      align-items: flex-start;
      padding: 20px;
    }
  }
`;

const ToastStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  button {
    background: #60269e;
    padding: 6px 10px;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
  }
`;

const CollegeDetailForm = () => {
  const { setProgressBar } = useLoadingBar();
  const [phoneType, setPhoneType] = useState("mobile");
  const [phoneType2, setPhoneType2] = useState("mobile");
  const typeOpt = [{ name: "mobile" }, { name: "telephone" }];
  const [secPhone, setSecPhone] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const formRef = useRef(null);

  const [selectedCollegeType, setSelectedCollegeType] = useState("private");
  const collegeType = [{ name: "private" }, { name: "government" }];
  const [selectedSystemType, setSelectedSystemType] = useState("co-ed");
  const systemType = [{ name: "co-ed" }, { name: "regular" }];

  const [acdType, setAcdType] = useState("");
  const acdTypeOpt = ["day college", "weekend college", "night college"];

  const [selectedAffiliated, setSelectedAffiliated] = useState("stateboard");
  const affiliatedOpt = [
    { name: "stateboard" },
    { name: "nationalboard" },
    { name: "university" },
  ];

  const [selectClassType, setSelectClassType] = useState("ac");
  const classTypeOpt = [{ name: "ac" }, { name: "non-ac" }];

  const [selectedOpenTime, setSelectedOpenTime] = useState("7:00 am");
  const openTimeOpt = [
    { name: "7:00 am" },
    { name: "8:00 am" },
    { name: "9:00 am" },
    { name: "10:00 am" },
    { name: "11:00 am" },
    { name: "12:00 pm" },
  ];

  const [selectedCloseTime, setSelectedCloseTime] = useState("1:00 pm");
  const closeTimeOpt = [
    { name: "1:00 pm" },
    { name: "2:00 pm" },
    { name: "3:00 pm" },
    { name: "4:00 pm" },
    { name: "5:00 pm" },
    { name: "6:00 pm" },
    { name: "7:00 pm" },
  ];

  const [selectedWorkingDays, setSelectedWorkingDays] = useState("mon to fri");
  const workingDaysOpt = [{ name: "mon to fri" }, { name: "mon to sat" }];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Creating College...");
    try {
      setProgressBar(20);
      const phone = {
        phone: e.target.phone.value,
        phone2: e.target?.phone2?.value || "",
      };
      const address = e.target.address.value;
      const city = e.target.city.value;
      const area = e.target.area.value;

      const newObj = {
        collegename: e.target.collegename.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone: phone,
        address: address.trim() + ", " + area.trim() + ", " + city.trim(),
        location: e.target.location.value,
        college_type: selectedCollegeType,
        system_type: selectedSystemType,
        academic_type: acdType,
        affiliated: selectedAffiliated,
        class_rooms: e.target.classRoom.value,
        total_seats: e.target.totalSeats.value,
        class_type: selectClassType,
        college_code: e.target.collegeCode.value,
        college_area: e.target.collegeArea.value,
        no_of_floors: e.target.floors.value,
        timings: {
          open: selectedOpenTime,
          close: selectedCloseTime,
          Mon_to_Sat: selectedWorkingDays,
        },
        more_info: e.target.moreInfo.value,
        Description: e.target.Description.value,
        History_Achievements: e.target.History_Achievements.value,
      };

      setProgressBar(60);

      const { data } = await axios.post("/v2/reg/clgdetail", newObj, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // formRef.current.reset();
      localStorage.setItem("collegeId", data.collegeid);
      setProgressBar(100);
      toast.dismiss(loading);
      // toast.success("college added successfully.\n College ID: " + data.collegeid);
      toast(
        (t) => (
          <ToastStyles>
            <span>
              college added successfully <b>{data.collegeid}</b>
            </span>
            <button onClick={() => toast.dismiss(t.id)}>Close</button>
          </ToastStyles>
        ),
        {
          duration: 10000,
        }
      );
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("College Not Added. Please try again !!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <Wrapper>
          <div className="form-left">
            <InputField
              title="College Name"
              name={"collegename"}
              id="collegeName"
              placeholder="Kites Jr. College"
            />
            <InputField
              title="Email"
              type="email"
              name={"email"}
              id="email"
              placeholder="tony@scolage.com"
            />
            <InputField
              title="password"
              type={showPassword ? "text" : "password"}
              name={"password"}
              id="password"
              placeholder="password"
              onTogglePassword={togglePasswordVisibility}
            />
            <PhoneInput
              id={"phone"}
              title={"Phone"}
              name={"phone"}
              type={"number"}
              placeholder={"+91 9949 34595"}
              phoneType={phoneType}
              setPhoneType={setPhoneType}
              options={typeOpt}
            />
            {secPhone && (
              <PhoneInput
                id={"phone2"}
                title={"Phone 2"}
                name={"phone2"}
                type={"number"}
                placeholder={"+91 9949 34595"}
                phoneType={phoneType2}
                setPhoneType={setPhoneType2}
                options={typeOpt}
              />
            )}
            {!secPhone && (
              <button className="add-btn-cta" onClick={() => setSecPhone(true)}>
                Add Phone
              </button>
            )}
            <InputField
              title="Address"
              name={"address"}
              type="text"
              id="address"
              placeholder="Address"
            />

            <CityBlock />

            <LocationBlock />

            <DropdownField
              title={"College Type"}
              selected={selectedCollegeType}
              setSelected={setSelectedCollegeType}
              options={collegeType}
            />
            <DropdownField
              title={"System Type"}
              selected={selectedSystemType}
              setSelected={setSelectedSystemType}
              options={systemType}
            />
          </div>
          <div className="form-right">
            <AcademicBlockStyles>
              <p>Academic Type</p>
              <div className="radio-block">
                <RadioButtons
                  acdType={acdType}
                  setAcdType={setAcdType}
                  acdTypeOpt={acdTypeOpt}
                  name="academic-type"
                />
              </div>
            </AcademicBlockStyles>

            <DropdownField
              title={"Affiliated"}
              selected={selectedAffiliated}
              setSelected={setSelectedAffiliated}
              options={affiliatedOpt}
            />

            <ClgInfoStyles>
              <div className="class-room-main">
                <div className="class-room-block">
                  <p className="main-title">Class Rooms</p>
                  <input type="number" name="classRoom" placeholder="30" />
                </div>
                <div className="total-seats">
                  <p>Total Seats</p>
                  <input type="number" name="totalSeats" placeholder="12000" />
                </div>
                <div className="class-type">
                  <p>Class Type</p>
                  <Dropdown
                    options={classTypeOpt}
                    value={selectClassType}
                    onChange={(e) => setSelectClassType(e.value)}
                    optionLabel="name"
                    optionValue="name"
                  />
                </div>
              </div>
              <div className="clg-code-main">
                <div className="clg-code">
                  <p className="main-title">College Code</p>
                  <input type="number" name="collegeCode" placeholder="00692" />
                </div>

                <div className="total-seats">
                  <p>College Area</p>
                  <input type="number" name="collegeArea" placeholder="12000" />
                </div>

                <div className="class-type">
                  <p>No. of Floors</p>
                  <input type="number" name="floors" placeholder="12000" />
                </div>
              </div>
            </ClgInfoStyles>

            <TimingStyles>
              <p className="main-title">Timings</p>
              <div className="options-block">
                <div className="time-select open-select">
                  <label>open |</label>
                  <Dropdown
                    options={openTimeOpt}
                    value={selectedOpenTime}
                    onChange={(e) => setSelectedOpenTime(e.value)}
                    optionLabel="name"
                    optionValue="name"
                  />
                </div>
                <div className="time-select close-select">
                  <label>close |</label>
                  <Dropdown
                    options={closeTimeOpt}
                    value={selectedCloseTime}
                    onChange={(e) => setSelectedCloseTime(e.value)}
                    optionLabel="name"
                    optionValue="name"
                  />
                </div>
                <div className="time-select day-select">
                  <Dropdown
                    options={workingDaysOpt}
                    className="capitalize"
                    value={selectedWorkingDays}
                    onChange={(e) => setSelectedWorkingDays(e.value)}
                    optionLabel="name"
                    optionValue="name"
                  />
                </div>
              </div>
            </TimingStyles>

            <InputField
              title="History and Achievement"
              type="text"
              name={"History_Achievements"}
              id="History_Achievements"
              placeholder="History and Achievement"
            />

            <InputField
              title="Discription Box"
              type="text"
              name={"Description"}
              id="Description"
              placeholder="Description Box"
            />

            <MoreInfoField name={"moreInfo"} />
          </div>
        </Wrapper>
        <div className="save-cta-main">
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default CollegeDetailForm;
