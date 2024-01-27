import toast from "react-hot-toast";
import CameraIcon from "../Icons/CameraIcon";
import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { urlRegex } from "../constants";

const Wrapper = styled.div`
  .gallery-fields {
    display: flex;
    gap: 50px 60px;
    flex-wrap: wrap;

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

  @media (min-width: 768px) and (max-width: 1024px) {
    .gallery-fields {
      gap: 30px;
    }
  }
`;

const GalleryStyle = styled.div`
  width: 195px;
  .image-block {
    height: 216px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid #707070;
    overflow: hidden;
    position: relative;
    margin-bottom: 12px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .remove-btn {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 0 0 10px;
      box-shadow: 0 0 10px 5px rgb(0 0 0 / 0.1);
      background: #fff;
      button {
        font-size: 24px;
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .image-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #fff;
      border-radius: 10px 0 0 0;
      label {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .info-block {
    border: 1px solid #707070;
    height: 44px;
    border-radius: 6px;
    overflow: hidden;

    textarea {
      height: 100%;
      width: 100%;
      padding: 5px 10px;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #000;
      outline: none;
      resize: none;
      background: #f8f8f8;
    }
  }
`;

const AcademicBlock = ({ data }) => {
  // console.log(data)
  const [academicList, setAcademicList] = useState([
    { image: "", more_info: "", imgPreview: "" },
  ]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [editable, setEditable] = useState(false);
  const [newAcademicList, setNewAcademicList] = useState([]);

  const setFetchedValue = (data) => {
    const tempArray = [];
    data?.forEach((item, index) => {
      var newObj = {
        academicid: item.academicid,
        image: item.imageUrl,
        more_info: item.more_info,
        imgPreview: item.imageUrl,
      };
      tempArray.push(newObj);
    });
    setAcademicList(tempArray);
  };

  useEffect(() => {
    setFetchedValue(data);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding details...");
    try {
      const collegeId = localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      if (academicList.length) {
        const formDate = new FormData();
        academicList.forEach((item, index) => {
          if (item.academicid) {
            formDate.append("academicid", item.academicid);
          }
          formDate.append("collegeid", collegeId);
          if (!urlRegex.test(item.image)) {
            formDate.append(`image`, item.image);
            formDate.append(`photoIndex`, index);
          }
          formDate.append(`more_info`, item.more_info);
        });

        const { data } = await axios.patch("/v2/academic/edit/all", formDate, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        });
      }

      if (newAcademicList.length) {
        const newFormData = new FormData();
        newAcademicList.forEach((item, index) => {
          newFormData.append(`more_info`, item.more_info);
          newFormData.append("image", item.image);
        });
        newFormData.append(`collegeid`, collegeId);

        const { data: newList } = await axios.post(
          "/v2/reg/acedemicdetail",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (newList) {
          setNewAcademicList([]);
          setFetchedValue(newList.data);
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

  const handleChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...academicList];
      if (name == "image") {
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `academics\$${uuidv4()}\$${localStorage.getItem(
          "collegeId"
        )}.${fileExt}`;
        const tempFile = new File([file], fileName);
        onChangeVal[i][name] = tempFile;
        if (tempFile) {
          const reader = new FileReader();

          reader.onload = () => {
            onChangeVal[i].imgPreview = reader.result;
            forceUpdate();
          };

          reader.readAsDataURL(tempFile);
        }
      } else {
        onChangeVal[i][name] = value;
      }
      setAcademicList(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleNewChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...newAcademicList];
      if (name == "image") {
        const file = e.target.files[0];

        const fileExt = file.name.split(".").pop();
        const fileName = `academics\$${uuidv4()}\$${localStorage.getItem(
          "collegeId"
        )}.${fileExt}`;
        const tempFile = new File([file], fileName);
        onChangeVal[i][name] = tempFile;
        if (tempFile) {
          const reader = new FileReader();

          reader.onload = () => {
            onChangeVal[i].imgPreview = reader.result;
            forceUpdate();
          };

          reader.readAsDataURL(tempFile);
        }
      } else {
        onChangeVal[i][name] = value;
      }
      setNewAcademicList(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (editable) {
      setNewAcademicList([
        ...newAcademicList,
        { image: "", more_info: "", imgPreview: "" },
      ]);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleRemoveItem = async (id, index) => {
    const loading = toast.loading("Removing Media File...");
    try {
      if (editable) {
        const { data } = await axios.delete(`/academic/delete/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const tempArray = [...academicList];
        tempArray.splice(index, 1);
        setAcademicList(tempArray);

        if (data) {
          toast.dismiss(loading);
          toast.success("Media deleted successfully");
        }
      } else {
        toast.dismiss();
        toast.error("Turn on edit mode first !!");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Failed to delete Media, Please try again !!");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="gallery-fields">
          {academicList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {/* <img src={""} alt="" /> */}
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`academic-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`academic-upload-${i}`}
                    name={"image"}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
                <div className="remove-btn">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(item.academicid, i);
                    }}
                  >
                    <IoIosClose />
                  </button>
                </div>
              </div>
              <div className="info-block">
                <textarea
                  placeholder="More Info"
                  value={item.more_info}
                  name="more_info"
                  onChange={(e) => handleChange(e, i)}
                ></textarea>
              </div>
            </GalleryStyle>
          ))}
          {newAcademicList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {/* <img src={""} alt="" /> */}
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`academic-new-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`academic-new-upload-${i}`}
                    name={"image"}
                    onChange={(e) => handleNewChange(e, i)}
                  />
                </div>
                <div className="remove-btn">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (editable) {
                        const tempArray = [...newAcademicList];
                        tempArray.splice(i, 1);
                        setNewAcademicList(tempArray);
                      } else {
                        toast.dismiss();
                        toast.error("Edit Details are not Allowed !!");
                      }
                    }}
                  >
                    <IoIosClose />
                  </button>
                </div>
              </div>
              <div className="info-block">
                <textarea
                  placeholder="More Info"
                  value={item.more_info}
                  name="more_info"
                  onChange={(e) => handleNewChange(e, i)}
                ></textarea>
              </div>
            </GalleryStyle>
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
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setEditable(false);
              setFetchedValue(data);
              setNewAcademicList([]);
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

export default AcademicBlock;
