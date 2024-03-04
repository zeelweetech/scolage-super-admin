import React, { useEffect, useRef, useState } from "react";
import CameraIcon from "../Icons/CameraIcon";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";
import { urlRegex } from "../constants";

const Wrapper = styled.div`
  .topper-fields {
    display: flex;
    gap: 60px 40px;
    flex-wrap: wrap;
  }
  .add-sub-cta {
    display: flex;
    align-items: end;
    button {
      background: #60269e;
      padding: 10px 18px;
      border-radius: 20px;
      color: #fff;
      font-family: Segoe UI;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }
  }
  .save-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 48px;
    button {
      background: #60269e;
      filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
      border-radius: 16px;
      padding: 12px 34px;
      font-weight: 400;
      font-size: 13px;
      line-height: 17px;
      color: #ffffff;
    }
  }
`;

const TopperItemStyles = styled.div`
  width: 304px;
  .topper-item-top {
    display: flex;
    padding-bottom: 18px;
    align-items: stretch;

    .image-block {
      width: 124px;
      height: 112px;
      border-radius: 10px;
      border: 1px solid #707070;
      position: relative;
      overflow: hidden;

      .image-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        label {
          height: 30px;
          width: 30px;
          background: #fff;
          border-radius: 10px 0 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
    }

    .topper-info-block {
      padding-left: 16px;
      width: calc(100% - 124px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      input {
        width: 100%;
        border: 1px solid #707070;
        outline: none;
        background: #f8f8f8;
        border-radius: 6px;
        text-align: center;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        padding: 5px;
        color: #000;
      }
    }
  }

  .more-info-block {
    border: 1px solid #707070;
    border-radius: 6px;
    height: 44px;
    overflow: hidden;

    textarea {
      height: 100%;
      width: 100%;
      padding: 5px 10px;
      resize: none;
      outline: none;
      background: #f8f8f8;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #000;
    }
  }
`;

const ToppersInfoBlock = ({ data, id }) => {
  const [topperInfoList, setTopperInfoList] = useState([
    {
      image: "",
      name: "",
      passYear: "",
      marks: "",
      moreInfo: "",
      imagePreview: "",
    },
  ]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [editable, setEditable] = useState(false);
  const [newTopperInfoList, setNewTopperInfoList] = useState([]);

  const setFetchedValue = (data) => {
    const tempArray = [];
    data?.forEach((item, index) => {
      var newObj = {
        alutopperid: item.alutopperid,
        image: item.imageUrl,
        name: item.name,
        passYear: item.passing_out_year,
        marks: item.marks,
        moreInfo: item.more_info,
        imagePreview: item.imageUrl,
      };
      tempArray.push(newObj);
    });
    setTopperInfoList(tempArray);
  };

  useEffect(() => {
    setFetchedValue(data);
  }, []);

  // const formRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding details...");
    try {
      // const collegeId = localStorage.getItem("collegeProfileId");
      const collegeId = id ? id : localStorage.getItem("collegeProfileId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      if (topperInfoList.length) {
        const formData = new FormData();
        topperInfoList.forEach((item, index) => {
          if (item.alutopperid) {
            formData.append(`alutopperid`, item.alutopperid);
          }
          if (!urlRegex.test(item.image)) {
            formData.append(`image`, item.image);
            formData.append(`photoIndex`, index);
          }
          formData.append("collegeid", collegeId);
          formData.append(`name`, item.name);
          formData.append(`passing_out_year`, item.passYear);
          formData.append(`marks`, item.marks);
          formData.append(`more_info`, item.moreInfo);
        });
        formData.append("collegeid", collegeId);

        // for (var pair of formData.entries()) {
        //    console.log(pair[0] + " - " + pair[1]);
        //  }

        const { data } = await axios.patch(
          "/v2/alutoppers/edit/all/array",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      // { image: "", name: "", passYear: "", marks: "", moreInfo: "", imagePreview: "" }
      if (newTopperInfoList.length) {
        const newFormData = new FormData();
        newTopperInfoList.forEach((item, index) => {
          newFormData.append(`image`, item.image);
          newFormData.append(`name`, item.name);
          newFormData.append(`more_info`, item.moreInfo);
          newFormData.append(`passing_out_year`, item.passYear);
          newFormData.append(`marks`, item.marks);
        });
        newFormData.append("collegeid", collegeId);

        const { data: newList } = await axios.post(
          "/v2/reg/alutoppers",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (newList) {
          setNewTopperInfoList([]);
          setFetchedValue(newList.data);
        }
      }
      setEditable(false);
      toast.dismiss(loading);
      toast.success("Details updated successfully");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const list = [...topperInfoList];
      if (name == "image") {
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `toppers\$${uuidv4()}\$${localStorage.getItem(
          "collegeProfileId"
        )}.${fileExt}`;
        const tempFile = new File([file], fileName);
        list[i][name] = tempFile;
        if (tempFile) {
          const reader = new FileReader();

          reader.onload = () => {
            list[i].imagePreview = reader.result;
            forceUpdate();
          };

          reader.readAsDataURL(tempFile);
        }
      } else {
        list[i][name] = value;
      }
      setTopperInfoList(list);
    } else {
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  const handleNewChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const list = [...newTopperInfoList];
      if (name == "image") {
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `toppers\$${uuidv4()}\$${localStorage.getItem(
          "collegeProfileId"
        )}.${fileExt}`;
        const tempFile = new File([file], fileName);
        list[i][name] = tempFile;
        if (tempFile) {
          const reader = new FileReader();

          reader.onload = () => {
            list[i].imagePreview = reader.result;
            forceUpdate();
          };

          reader.readAsDataURL(tempFile);
        }
      } else {
        list[i][name] = value;
      }
      setNewTopperInfoList(list);
    } else {
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    if (editable) {
      setNewTopperInfoList([
        ...newTopperInfoList,
        {
          image: "",
          name: "",
          passYear: "",
          marks: "",
          moreInfo: "",
          imagePreview: "",
        },
      ]);
    } else {
      toast.dismiss();
      toast.error("Edit details is not allowed !!");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="topper-fields">
          {topperInfoList.map((item, i) => (
            <TopperItemStyles key={i}>
              <div className="topper-item-top">
                <div className="image-block">
                  {/* <img src={"/bar-bg.png"} alt="" /> */}
                  {item.imagePreview && <img src={item?.imagePreview} alt="" />}
                  <div className="image-btn">
                    <label htmlFor={`file-upload-${i}`}>
                      <CameraIcon />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id={`file-upload-${i}`}
                      name="image"
                      onChange={(e) => handleChange(e, i)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="topper-info-block">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <input
                    type="number"
                    placeholder="Passing out year"
                    name="passYear"
                    value={item.passYear}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <input
                    type="number"
                    placeholder="Marks"
                    name="marks"
                    value={item.marks}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
              </div>

              <div className="more-info-block">
                <textarea
                  placeholder="More Info"
                  name="moreInfo"
                  value={item.moreInfo}
                  onChange={(e) => handleChange(e, i)}
                ></textarea>
              </div>
            </TopperItemStyles>
          ))}
          {newTopperInfoList.map((item, i) => (
            <TopperItemStyles key={i}>
              <div className="topper-item-top">
                <div className="image-block">
                  {/* <img src={"/bar-bg.png"} alt="" /> */}
                  {item.imagePreview && <img src={item?.imagePreview} alt="" />}
                  <div className="image-btn">
                    <label htmlFor={`file-new-upload-${i}`}>
                      <CameraIcon />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id={`file-new-upload-${i}`}
                      name="image"
                      onChange={(e) => handleNewChange(e, i)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="topper-info-block">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleNewChange(e, i)}
                  />
                  <input
                    type="number"
                    placeholder="Passing out year"
                    name="passYear"
                    value={item.passYear}
                    onChange={(e) => handleNewChange(e, i)}
                  />
                  <input
                    type="number"
                    placeholder="Marks"
                    name="marks"
                    value={item.marks}
                    onChange={(e) => handleNewChange(e, i)}
                  />
                </div>
              </div>

              <div className="more-info-block">
                <textarea
                  placeholder="More Info"
                  name="moreInfo"
                  value={item.moreInfo}
                  onChange={(e) => handleNewChange(e, i)}
                ></textarea>
              </div>
            </TopperItemStyles>
          ))}
          <div className="add-sub-cta">
            <button type="button" onClick={handleAddFields}>
              Add More ...
            </button>
          </div>
        </div>
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setEditable(false);
              setFetchedValue();
              forceUpdate();
            }}
          >
            Cancel
          </button>
        )}
        {editable ? (
          <button type="submit" onClick={handleFormSubmit}>
            Save
          </button>
        ) : (
          <button
            id="editBtn"
            type="button"
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

export default ToppersInfoBlock;
