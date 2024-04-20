import axios from "axios";
import { styled } from "styled-components";
import React from "react";
import { InputField } from "./TandCBlock";
import toast from "react-hot-toast";

const Wrapper = styled.div``;

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const loading = toast.loading("Saving...");
  try {
    const collegeId = localStorage.getItem("collegeId");

    if (!collegeId) {
      toast.dismiss(loading);
      toast.error("College Id not found, Please add college details first.");
      return false;
    }

    const newObj = {
      collegeid: collegeId,
      videoUrl0: e.target.yt1.value,
      videoUrl1: e.target.yt2.value,
      videoUrl2: e.target.yt3.value,
      videoUrl3: e.target.yt4.value,
      videoUrl4: e.target.yt5.value,
    };

    const { data } = await axios.post("/v2/reg/videoUrl", newObj, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.dismiss(loading);
    toast.success(data?.message);
  } catch (err) {
    console.log(err);
    toast.dismiss(loading);
    toast.error(err?.response?.data?.error);
  }
};

const YtLinks = () => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Wrapper>
        <InputField
          title={"Youtube Link 1"}
          required
          name="yt1"
          placeholder={"Enter a youtube link 1"}
        />
        <InputField
          title={"Youtube Link 2"}
          required
          name="yt2"
          placeholder={"Enter a youtube link 2"}
        />
        <InputField
          title={"Youtube Link 3"}
          required
          name="yt3"
          placeholder={"Enter a youtube link 3"}
        />
        <InputField
          title={"Youtube Link 4"}
          required
          name="yt4"
          placeholder={"Enter a youtube link 4"}
        />
        <InputField
          title={"Youtube Link 5"}
          required
          name="yt5"
          placeholder={"Enter a youtube link 5"}
        />

        <div class="save-cta-main">
          <button type="submit">Save</button>
        </div>
      </Wrapper>
    </form>
  );
};

export default YtLinks;
