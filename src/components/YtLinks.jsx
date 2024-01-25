import axios from "axios";
import { styled } from "styled-components";
import React from "react";
import { InputField } from "./TandCBlock";
import toast from "react-hot-toast";

const Wrapper = styled.div``;

const handleFormSubmit = (e) => {
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

      const { data } = axios.post("/v2/reg/videoUrl", newObj);

      toast.dismiss(loading);
      toast.success("Details added successfully.");
   } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error('Details not added, please try again !!');
   }
};

const YtLinks = () => {
   return (
      <form onSubmit={handleFormSubmit}>
         <Wrapper>
            <InputField title={"Youtube Link 1"} required name="yt1" placeholder={"https://www.youtube.com/"} />
            <InputField title={"Youtube Link 2"} required name="yt2" placeholder={"https://www.youtube.com/"} />
            <InputField title={"Youtube Link 3"} required name="yt3" placeholder={"https://www.youtube.com/"} />
            <InputField title={"Youtube Link 4"} required name="yt4" placeholder={"https://www.youtube.com/"} />
            <InputField title={"Youtube Link 5"} required name="yt5" placeholder={"https://www.youtube.com/"} />

            <div class="save-cta-main">
               <button type="submit">Save</button>
            </div>
         </Wrapper>
      </form>
   );
};

export default YtLinks;
