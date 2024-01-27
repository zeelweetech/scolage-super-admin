import React, { useState } from "react";
import styled from "styled-components";

import { Dropdown } from "primereact/dropdown";
import RadioButtons from "./RadioButtons";
import MoreInfoField from "./MoreInfoField";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import GoogleMapReact from "google-map-react";

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

// const BottomCtasStyles = styled.div`
//    display: flex;
//    align-items: center;
//    justify-content: flex-end;
//    gap: 20px;
// `;

const InputFieldStyles = styled.div`
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
  value = "",
  title,
  id,
  handleChange,
  placeholder,
  name,
  type = "text",
}) => {
  return (
    <InputFieldStyles>
      <label htmlFor={id}>{title}</label>
      <div className="input">
        <input
          type={type}
          value={value}
          autoComplete="off"
          onChange={handleChange}
          id={id}
          name={name}
          placeholder={placeholder}
          required
        />
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
  name,
  value,
  handleChange,
  setPhoneType,
  options,
}) => {
  return (
    <InputFieldStyles>
      <label htmlFor={id}>{title}</label>
      <div className="input input-group">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
        />
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

const CityBlock = ({ readOnly }) => {
  return (
    <CityBlockStyles>
      <div className="city-block">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          placeholder="Hyderabad"
          readOnly={readOnly}
        />
      </div>
      <div className="city-block area-block">
        <label htmlFor="area">Area</label>
        <input
          type="text"
          id="area"
          placeholder="Marredpally"
          readOnly={readOnly}
        />
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

const LocationBlock = ({ name, value, handleChange }) => {
  return (
    <LocationStyles>
      <p htmlFor="location">Location</p>
      <div className="map-block">
        <textarea
          className="map-link"
          name={name}
          value={value}
          onChange={handleChange}
        ></textarea>
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

const DropdownField = ({
  title,
  selected,
  readOnly,
  name,
  handleDropChange,
  options,
}) => {
  return (
    <DropdownFieldStyles>
      <p>{title}</p>
      <div className="dropdown-field">
        <Dropdown
          optionLabel="name"
          disabled={readOnly}
          optionValue="name"
          onChange={(e) => handleDropChange(name, e.value)}
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
          color: #000;
          padding-right: 0;
          text-transform: capitalize;
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
        line-height: 20px;
        color: #7a86a1;
      }
      .p-dropdown {
        border: none;
        box-shadow: none;
        .p-dropdown-label {
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
          color: #7a86a1;
          padding: 0;
          text-transform: uppercase;
        }
        .p-dropdown-trigger {
          width: 30px;
        }
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

const ClgDetailsBlock = ({ data }) => {
  // console.log(data);
  const [formData, setFormData] = useState(data);
  const [phoneType, setPhoneType] = useState("mobile");
  const [phoneType2, setPhoneType2] = useState("mobile");
  const typeOpt = [{ name: "mobile" }, { name: "telephone" }];
  const [editable, setEditable] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const collegeType = [{ name: "private" }, { name: "government" }];
  const systemType = [{ name: "co-ed" }, { name: "regular" }];

  const acdTypeOpt = ["day college", "weekend college", "night college"];

  const affiliatedOpt = [
    { name: "stateboard" },
    { name: "nationalboard" },
    { name: "university" },
  ];

  const classTypeOpt = [{ name: "ac" }, { name: "non-ac" }];

  const openTimeOpt = [
    { name: "7:00 am" },
    { name: "8:00 am" },
    { name: "9:00 am" },
    { name: "10:00 am" },
    { name: "11:00 am" },
    { name: "12:00 pm" },
  ];

  const closeTimeOpt = [
    { name: "1:00 pm" },
    { name: "2:00 pm" },
    { name: "3:00 pm" },
    { name: "4:00 pm" },
    { name: "5:00 pm" },
    { name: "6:00 pm" },
    { name: "7:00 pm" },
  ];

  const workingDaysOpt = [{ name: "mon to sat" }, { name: "mon to fri" }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editable) {
      if (name === "phone" || name === "phone2") {
        setFormData({
          ...formData,
          phone: [
            {
              ...formData.phone[0],
              [name]: value,
            },
          ],
        });
        return true;
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      document.getElementById("editBtn").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  const handleDropChange = (name, value) => {
    if (editable) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      document.getElementById("editBtn").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  const handleRadioChange = (name, value) => {
    if (editable) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      document.getElementById("editBtn").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  const handleFormSubmit = async () => {
    const loading = toast.loading("Details Saving...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      const { data } = await axios.patch(
        `/v2/reg/clgdetail/update/${collegeId}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEditable(false);
      toast.dismiss(loading);
      toast.success("Details updated successfully !!");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Something went wrong, please try again !!");
    }
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  useEffect(() => {
    const googleMapsLink = formData?.location;
    console.log("googleMapsLink", googleMapsLink);

    const extractedCoordinates = extractCoordinatesFromLink(googleMapsLink);
    console.log("extractedCoordinates", extractedCoordinates);
    setCoordinates(extractedCoordinates);
  }, [formData?.location]);

  const extractCoordinatesFromLink = (link) => {
    // Extracting coordinates from the link
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
    const match = link?.match(regex);
    console.log("link", link);
    console.log("match", match);

    if (match && match.length === 3) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    } else {
      console.error("Error extracting coordinates from the link.");
      return { latitude: null, longitude: null };
    }
  };

  return (
    <>
      <Wrapper>
        <div className="form-left">
          <InputField
            name={"collegename"}
            value={formData?.collegename}
            handleChange={handleChange}
            title="College Name"
            id="collegeName"
            placeholder="Kites Jr. College"
          />
          <InputField
            name={"email"}
            value={formData?.email}
            handleChange={handleChange}
            title="Email"
            type="email"
            id="email"
            placeholder="tony@scolage.com"
          />
          <PhoneInput
            name="phone"
            value={formData?.phone?.[0]?.phone}
            handleChange={handleChange}
            id={"phone"}
            title={"Phone"}
            type={"tel"}
            placeholder={"+91 9949 34595"}
            phoneType={phoneType}
            setPhoneType={setPhoneType}
            options={typeOpt}
          />
          <PhoneInput
            name="phone2"
            value={formData?.phone?.[0]?.phone2}
            handleChange={handleChange}
            id={"phone2"}
            title={"Phone 2"}
            type={"tel"}
            placeholder={"+91 9949 34595"}
            phoneType={phoneType2}
            setPhoneType={setPhoneType2}
            options={typeOpt}
          />

          <InputField
            title="Address"
            type="text"
            name={"address"}
            handleChange={handleChange}
            value={formData?.address}
            id="address"
            placeholder="Address"
          />

          {/* <CityBlock readOnly={!editable} />*/}

          {/* <LocationBlock name={'location'} value={formData?.location} handleChange={handleChange} />  */}

          <LocationStyles>
            <p htmlFor="location">Location</p>
            <div className="map-block">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCOyEzskqLr1BKQ7j7t_JfMcY-8yHdymi0",
                }}
                defaultCenter={{
                  lat: coordinates?.latitude,
                  lng: coordinates?.longitude,
                }}
                defaultZoom={11}
                yesIWantToUseGoogleMapApiInternals
              >
                <AnyReactComponent
                  lat={coordinates?.latitude}
                  lng={coordinates?.longitude}
                  text="My Marker"
                />
              </GoogleMapReact>
              {/* <textarea
                className="map-link"
                name={"location"}
                value={formData?.location}
                onChange={handleChange}
              /> */}
            </div>
          </LocationStyles>

          <DropdownField
            readOnly={!editable}
            title={"College Type"}
            selected={formData?.college_type}
            handleDropChange={handleDropChange}
            name={"college_type"}
            options={collegeType}
          />
          <DropdownField
            readOnly={!editable}
            title={"System Type"}
            selected={formData?.system_type}
            handleDropChange={handleDropChange}
            name="system_type"
            options={systemType}
          />
        </div>
        <div className="form-right">
          <AcademicBlockStyles>
            <p>Academic Type</p>
            <div className="radio-block">
              <RadioButtons
                acdType={formData?.academic_type}
                readOnly={!editable}
                handleRadioChange={handleRadioChange}
                acdTypeOpt={acdTypeOpt}
                name="academic_type"
              />
            </div>
          </AcademicBlockStyles>

          <DropdownField
            readOnly={!editable}
            title={"Affiliated"}
            selected={formData?.affiliated}
            handleDropChange={handleDropChange}
            name="affiliated"
            options={affiliatedOpt}
          />

          <ClgInfoStyles>
            <div className="class-room-main">
              <div className="class-room-block">
                <p className="main-title">Class Rooms</p>
                <input
                  type="number"
                  value={formData?.class_rooms}
                  name="class_rooms"
                  onChange={handleChange}
                  placeholder="30"
                />
              </div>
              <div className="total-seats">
                <p>Total Seats</p>
                <input
                  type="number"
                  value={formData?.total_seats}
                  name="total_seats"
                  onChange={handleChange}
                  placeholder="12000"
                />
              </div>
              <div className="class-type">
                <p>Class Type</p>
                <Dropdown
                  disabled={!editable}
                  options={classTypeOpt}
                  value={formData?.class_type}
                  name="class_type"
                  onChange={(e) => handleDropChange("class_type", e.value)}
                  optionLabel="name"
                  optionValue="name"
                />
              </div>
            </div>
            <div className="clg-code-main">
              <div className="clg-code">
                <p className="main-title">College Code</p>
                <input
                  type="number"
                  value={formData?.college_code}
                  name="college_code"
                  onChange={handleChange}
                  placeholder="00692"
                />
              </div>

              <div className="total-seats">
                <p>College Area</p>
                <input
                  type="number"
                  value={formData?.college_area}
                  name="college_area"
                  onChange={handleChange}
                  placeholder="12000"
                />
              </div>

              <div className="class-type">
                <p>No. of Floors</p>
                <input
                  type="number"
                  value={formData?.no_of_floors}
                  name="no_of_floors"
                  onChange={handleChange}
                  placeholder="12000"
                />
              </div>
            </div>
          </ClgInfoStyles>

          <TimingStyles>
            <p className="main-title">Timings</p>
            <div className="options-block">
              <div className="time-select open-select">
                <label>open |</label>
                <Dropdown
                  disabled={!editable}
                  options={openTimeOpt}
                  value={formData?.timings?.[0]?.open}
                  onChange={(e) => {
                    if (editable) {
                      setFormData({
                        ...formData,
                        timings: [
                          {
                            ...formData.timings[0],
                            open: e.value,
                          },
                        ],
                      });
                    } else {
                      document.getElementById("editBtn").scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                      toast.dismiss();
                      toast.error("Edit details is not allowed !!");
                    }
                  }}
                  optionLabel="name"
                  optionValue="name"
                />
              </div>
              <div className="time-select close-select">
                <label>close |</label>
                <Dropdown
                  disabled={!editable}
                  options={closeTimeOpt}
                  value={formData?.timings?.[0]?.close}
                  onChange={(e) => {
                    if (editable) {
                      setFormData({
                        ...formData,
                        timings: [
                          {
                            ...formData.timings[0],
                            close: e.value,
                          },
                        ],
                      });
                    } else {
                      document.getElementById("editBtn").scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                      toast.dismiss();
                      toast.error("Edit details is not allowed !!");
                    }
                  }}
                  optionLabel="name"
                  optionValue="name"
                />
              </div>
              <div className="time-select day-select">
                <Dropdown
                  disabled={!editable}
                  options={workingDaysOpt}
                  value={formData?.timings?.[0]?.Mon_to_Sat}
                  onChange={(e) => {
                    if (editable) {
                      setFormData({
                        ...formData,
                        timings: [
                          {
                            ...formData.timings[0],
                            Mon_to_Sat: e.value,
                          },
                        ],
                      });
                    } else {
                      document.getElementById("editBtn").scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                      toast.dismiss();
                      toast.error("Edit details is not allowed !!");
                    }
                  }}
                  optionLabel="name"
                  optionValue="name"
                />
              </div>
            </div>
          </TimingStyles>

          <MoreInfoField
            name={"more_info"}
            value={formData?.more_info}
            handleChange={handleChange}
          />
        </div>
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            onClick={() => {
              setEditable(false);
              setFormData(data);
            }}
          >
            Cancel
          </button>
        )}
        {editable ? (
          <button onClick={handleFormSubmit}>Save</button>
        ) : (
          <button
            id="editBtn"
            onClick={() => {
              setEditable(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default ClgDetailsBlock;
