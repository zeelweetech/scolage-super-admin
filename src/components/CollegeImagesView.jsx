import styled from "styled-components";
import AddIconBig from "../Icons/AddIconBig";
import RemoveIcon from "../Icons/RemoveIcon";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { urlRegex } from "../constants";

const Wrapper = styled.div`
  .images-block-main {
    display: flex;
    flex-wrap: wrap;
    gap: 60px 30px;

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
  }
`;

const ImageItemStyle = styled.div`
  width: 200px;
  .clg-image-block {
    height: 182px;
    border: 1px solid #707070;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;

    .clg-img {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .img-ctas {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      label {
        border: 1px solid #707070;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 15px 20px;
        background: #f8f8f8;
        border-radius: 16px;
        cursor: pointer;

        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #7a86a1;
        }
      }
      button {
        border: 1px solid #707070;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 15px 20px;
        background: #f8f8f8;
        border-radius: 16px;
        cursor: pointer;

        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #7a86a1;
        }
      }
    }

    &:hover {
      .img-ctas {
        display: flex;
      }
    }
  }

  .clg-img-title {
    background: #f8f8f8;
    border: 1px solid #707070;
    padding: 6px 4px 4px;
    input {
      width: 100%;
      background: transparent;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000;
      outline: none;
      text-align: center;
    }
  }
`;

const CollegeImagesView = ({ data, id }) => {
  const [collegeImage, setCollegeImage] = useState([]);
  const [editable, setEditable] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [newCollegeImage, setNewCollegeImage] = useState([]);

  const setFetchedData = (data) => {
    const tempArr = [];
    data?.forEach((item, index) => {
      const newObj = {
        clgimageid: item?.clgimageid,
        image: item?.imageUrl,
        imagePreview: item?.imageUrl,
        title: item?.name,
      };
      tempArr.push(newObj);
    });
    setCollegeImage(tempArr);
  };

  useEffect(() => {
    setFetchedData(data);
  }, []);

  const handleChange = (e, i) => {
    e.preventDefault();
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...collegeImage];
      if (name == "image") {
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `college\$${uuidv4()}\$${localStorage.getItem(
          "collegeId"
        )}.${fileExt}`;
        const tempFile = new File([file], fileName);
        onChangeVal[i][name] = tempFile;
        if (tempFile) {
          const reader = new FileReader();
          reader.onload = () => {
            onChangeVal[i].imagePreview = reader.result;
            forceUpdate();
          };

          reader.readAsDataURL(tempFile);
        }
      } else {
        onChangeVal[i][name] = value;
      }
      setCollegeImage(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit details are not allowed !!");
    }
  };

  const handleNewChange = (e, i) => {
    e.preventDefault();
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...newCollegeImage];
      if (name == "image") {
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `college\$${uuidv4()}\$${localStorage.getItem(
          "collegeId"
        )}.${fileExt}`;
        const tempFile = new File([file], fileName);
        onChangeVal[i][name] = tempFile;
        if (tempFile) {
          const reader = new FileReader();
          reader.onload = () => {
            onChangeVal[i].imagePreview = reader.result;
            forceUpdate();
          };

          reader.readAsDataURL(tempFile);
        }
      } else {
        onChangeVal[i][name] = value;
      }
      setNewCollegeImage(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit details are not allowed !!");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Saving...");
    try {
      const collegeId = id ? id : localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, please add college details first");
        return false;
      }

      if (collegeImage.length) {
        const formData = new FormData();
        collegeImage.forEach((item, index) => {
          if (item.clgimageid) {
            formData.append("clgimageid", item.clgimageid);
          }
          formData.append(`collegeid`, collegeId);
          if (!urlRegex.test(item.image)) {
            formData.append(`image`, item.image);
            formData.append(`photoIndex`, index);
          }
          formData.append(`name`, item.title);
        });

        const { data } = await axios.patch(
          "/v2/clgimage/edit/all/edit",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }

      if (newCollegeImage.length) {
        const newFormData = new FormData();
        newCollegeImage.forEach((item, index) => {
          newFormData.append("image", item.image);
          newFormData.append("name", item.title);
        });
        newFormData.append("collegeid", collegeId);

        const { data: newList } = await axios.post(
          "/v2/reg/clgimage",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (newList) {
          setNewCollegeImage([]);
          setFetchedData(newList.data);
        }
      }
      setEditable(false);
      toast.dismiss(loading);
      toast.success("Details added successfully");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Details not added, please try again");
    }
  };

  // const handleRemoveImage = (e, i) => {
  //    e.preventDefault();
  //    const onChangeVal = [...collegeImage];
  //    onChangeVal[i]["image"] = null;
  //    onChangeVal[i]["imagePreview"] = null;
  //    setCollegeImage(onChangeVal);
  // };

  const handleAddField = (e) => {
    e.preventDefault();
    if (editable) {
      setNewCollegeImage([
        ...newCollegeImage,
        { image: null, imagePreview: null, title: "" },
      ]);
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="images-block-main">
          {collegeImage.map((item, i) => (
            <ImageItemStyle key={i}>
              <div className="clg-image-block">
                <div className="clg-img">
                  {item.imagePreview ? (
                    <img src={item.imagePreview} alt="" />
                  ) : (
                    <p>Add Image*</p>
                  )}
                </div>
                <div className="img-ctas">
                  <label className="edit-cta" htmlFor={`college-image-${i}`}>
                    <AddIconBig />
                    <p>{item.image ? "Edit" : "Add"}</p>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    name="image"
                    id={`college-image-${i}`}
                    onChange={(e) => handleChange(e, i)}
                    style={{ display: "none" }}
                  />
                  {/* {item.image && (
                              <button type="button" className="remove-cta" onClick={(e) => handleRemoveImage(e, i)}>
                                 <RemoveIcon />
                                 <p>Remove</p>
                              </button>
                           )} */}
                </div>
              </div>

              <div className="clg-img-title">
                <input
                  type="text"
                  required
                  name="title"
                  value={item.title}
                  onChange={(e) => handleChange(e, i)}
                  placeholder="Name"
                />
              </div>
            </ImageItemStyle>
          ))}
          {newCollegeImage.map((item, i) => (
            <ImageItemStyle key={i}>
              <div className="clg-image-block">
                <div className="clg-img">
                  {item.imagePreview ? (
                    <img src={item.imagePreview} alt="" />
                  ) : (
                    <p>Add Image*</p>
                  )}
                </div>
                <div className="img-ctas">
                  <label
                    className="edit-cta"
                    htmlFor={`college-new-image-${i}`}
                  >
                    <AddIconBig />
                    <p>{item.image ? "Edit" : "Add"}</p>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    name="image"
                    id={`college-new-image-${i}`}
                    onChange={(e) => handleNewChange(e, i)}
                    style={{ display: "none" }}
                  />
                  {/* {item.image && (
                              <button type="button" className="remove-cta" onClick={(e) => handleRemoveImage(e, i)}>
                                 <RemoveIcon />
                                 <p>Remove</p>
                              </button>
                           )} */}
                </div>
              </div>

              <div className="clg-img-title">
                <input
                  type="text"
                  required
                  name="title"
                  value={item.title}
                  onChange={(e) => handleNewChange(e, i)}
                  placeholder="Name"
                />
              </div>
            </ImageItemStyle>
          ))}

          <div className="add-sub-cta">
            <button type="button" onClick={handleAddField}>
              Add More ...
            </button>
          </div>
        </div>
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            onClick={() => {
              setEditable(false);
              setCollegeImage(data);
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

export default CollegeImagesView;
