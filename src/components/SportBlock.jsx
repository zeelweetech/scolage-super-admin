import toast from "react-hot-toast";
import CameraIcon from "../Icons/CameraIcon";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
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

const SportBlock = ({ data, id, getCollegeDetails }) => {
  console.log(data);
  const [sportsList, setSportsList] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [editable, setEditable] = useState(false);
  const [newSportsList, setNewSportsList] = useState([]);

  const setFetchedValue = (data) => {
    const tempArray = [];
    data?.forEach((item, index) => {
      var newObj = {
        sportsid: item.sportsid,
        image: item.imageUrl,
        more_info: item.more_info,
        imgPreview: item.imageUrl,
      };
      tempArray.push(newObj);
    });
    setSportsList(tempArray);
  };

  useEffect(() => {
    setFetchedValue(data);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding details...");
    try {
      const collegeId = id ? id : localStorage.getItem("collegeProfileId");

      const formData = new FormData();

      if (sportsList.length) {
        sportsList.forEach((item, index) => {
          if (item.sportsid) {
            formData.append("sportsid", item.sportsid);
          }
          formData.append("collegeid", collegeId);
          if (!urlRegex.test(item.image)) {
            formData.append(`image`, item.image);
            formData.append(`photoIndex`, index);
          }
          formData.append(`more_info`, item.more_info);
        });

        // for(var pair of formData.entries()) {
        //    console.log(pair[0] + " - " + pair[1]);
        //  }

        const { data } = await axios.patch("/v2/sports/edit/all", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        });
      }

      if (newSportsList.length) {
        const newFormData = new FormData();
        newSportsList.forEach((item, index) => {
          newFormData.append(`more_info`, item.more_info);
          newFormData.append(`image`, item.image);
        });
        newFormData.append(`collegeid`, collegeId);

        const { data: newList } = await axios.post(
          "/v2/reg/sportsdetail",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (newList) {
          setNewSportsList([]);
        }
        setFetchedValue(newList.data);
      }
      setEditable(false);
      getCollegeDetails();
      window.location.reload();
      toast.dismiss(loading);
      toast.success("Details updated successfully");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Details not added, please try again");
    }
  };

  const handleChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...sportsList];
      if (name == "image") {
        let file = e.target.files[0];
        // 'sports + array.length + collegeid + ext'
        const fileExt = file.name.split(".").pop();
        // sports + $ + uuid + $ + collegeid
        const fileName = `sports\$${uuidv4()}\$${localStorage.getItem(
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
      setSportsList(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleNewChange = (e, i) => {
    if (editable) {
      const { name, value } = e.target;
      const onChangeVal = [...newSportsList];
      if (name == "image") {
        let file = e.target.files[0];
        // 'sports + array.length + collegeid + ext'
        const fileExt = file.name.split(".").pop();
        // sports + $ + uuid + $ + collegeid
        const fileName = `sports\$${uuidv4()}\$${localStorage.getItem(
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
      setNewSportsList(onChangeVal);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (editable) {
      setNewSportsList([
        ...newSportsList,
        { image: "", more_info: "", imgPreview: "" },
      ]);
    } else {
      toast.dismiss();
      toast.error("Edit Details are not Allowed !!");
    }
  };

  const handleRemoveItem = async (sportsId, index) => {
    const loading = toast.loading("Removing Media File...");
    try {
      if (editable) {
        const { data } = await axios.delete(`/sportsimage/delete/${sportsId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const tempArray = [...sportsList];
        tempArray.splice(index, 1);
        setSportsList(tempArray);
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
          {sportsList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`sport-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`sport-upload-${i}`}
                    name={"image"}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
                <div className="remove-btn">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(item.sportsid, i);
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
          {newSportsList.map((item, i) => (
            <GalleryStyle key={i}>
              <div className="image-block">
                {item.imgPreview && <img src={item?.imgPreview} alt="" />}
                <div className="image-btn">
                  <label htmlFor={`sport-new-upload-${i}`}>
                    <CameraIcon />
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    id={`sport-new-upload-${i}`}
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
                        const tempArray = [...newSportsList];
                        tempArray.splice(i, 1);
                        setNewSportsList(tempArray);
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
              setNewSportsList([]);
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

export default SportBlock;
