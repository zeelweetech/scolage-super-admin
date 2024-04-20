import toast from "react-hot-toast";
import CameraIcon from "../Icons/CameraIcon";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
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

const CulturalForm = ({ data, id, getCollegeDetails }) => {
  const [culturalList, setCulturalList] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [editable, setEditable] = useState(false);
  const [newCulturalList, setNewCulturalList] = useState([]);

  const setFetchedValue = (data) => {
    const tempArray = [];
    data?.forEach((item, index) => {
      var newObj = {
        culturalid: item.culturalid,
        image: item.imageUrl,
        more_info: item.more_info,
        imgPreview: item.imageUrl,
      };
      tempArray.push(newObj);
    });
    setCulturalList(tempArray);
  };

  useEffect(() => {
    setFetchedValue(data);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding details...");
    try {
      // const collegeId = localStorage.getItem("collegeId");
      const collegeId = id ? id : localStorage.getItem("collegeId");

      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      if (culturalList.length) {
        const formData = new FormData();
        culturalList.forEach((item, index) => {
          if (item.culturalid) {
            formData.append("culturalid", item.culturalid);
          }
          formData.append("collegeid", collegeId);
          if (!urlRegex.test(item.image)) {
            formData.append(`image`, item.image);
            formData.append(`photoIndex`, index);
          }
          formData.append(`more_info`, item.more_info);
        });

        const { data } = await axios.patch("/v2/cultural/edit/all", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        });
      }

      if (newCulturalList.length) {
        const newFormData = new FormData();
        newCulturalList.forEach((item, index) => {
          newFormData.append("more_info", item.more_info);
          newFormData.append("image", item.image);
        });
        newFormData.append("collegeid", collegeId);

        const { data: newList } = await axios.post(
          "/v2/reg/culturaldetail",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (newList) {
          setNewCulturalList([]);
          setFetchedValue(newList.data);
        }
      }
      setEditable(false);
      getCollegeDetails();
      window.location.reload();
      toast.dismiss(loading);
      toast.success(data?.message);
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error(err?.response?.data?.error);
    }
  };

  const handleChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...culturalList];
      if (name == "image") {
        const file = e.target.files[0];

        const fileExt = file.name.split(".").pop();
        const fileName = `cultural\$${uuidv4()}\$${localStorage.getItem(
          "collegeProfileId"
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
      setCulturalList(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleNewChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...newCulturalList];
      if (name == "image") {
        const file = e.target.files[0];

        const fileExt = file.name.split(".").pop();
        const fileName = `cultural\$${uuidv4()}\$${localStorage.getItem(
          "collegeProfileId"
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
      setNewCulturalList(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (editable) {
      setNewCulturalList([
        ...newCulturalList,
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
        const { data } = await axios.delete(`/culturalimage/delete/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const tempArray = [...culturalList];
        tempArray.splice(index, 1);
        setCulturalList(tempArray);
        if (data) {
          toast.dismiss(loading);
          toast.success(data?.message);
        }
      } else {
        toast.dismiss();
        toast.error("Turn on edit mode first !!");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error(err?.response?.data?.error);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="gallery-fields">
          {/* already added list */}
          {culturalList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {/* <img src={""} alt="" /> */}
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`cultural-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`cultural-upload-${i}`}
                    name={"image"}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
                <div className="remove-btn">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(item.culturalid, i);
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
          {/* Newly added list */}
          {newCulturalList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {/* <img src={""} alt="" /> */}
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`cultural-new-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`cultural-new-upload-${i}`}
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
                        const tempArray = [...newCulturalList];
                        tempArray.splice(i, 1);
                        setNewCulturalList(tempArray);
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
              setNewCulturalList([]);
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

export default CulturalForm;
