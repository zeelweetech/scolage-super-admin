import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import AddClgAccordion from "./components/AddClgAccordion";
import LoginId from "./components/LoginId";
import ClgDetailsBlock from "./components/ClgDetailsBlock";
import InfrastructureBlock from "./components/InfrastructureBlock";
import HighlightBlock from "./components/HighlightBlock";
import PolicyBlock from "./components/PolicyBlock";
import FeeStructureBlock from "./components/FeeStructureBlock";
import SubjectSeats from "./components/SubjectSeats";
import StaffInfoBlock from "./components/StaffInfoBlock";
import CollegeImagesBlock from "./components/CollegeImagesBlock";
import SportBlock from "./components/SportBlock";
import ToppersInfoBlock from "./components/ToppersInfoBlock";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CollegeImagesView from "./components/CollegeImagesView";
import YoutubeView from "./components/YoutubeView";

const CollegeProfile = () => {
   const [collegeData, setCollegeData] = useState(null);
   const navigate = useNavigate();

   let { id } = useParams();

   const getCollegeDetails = async () => {
      try {
         const { data } = await axios.post(`http://localhost:7000/v2/singleclglist/get/${id}`, {
            headers: {
               "Content-Type": "application/json",
            },
         });
         if (data.college.length === 0) {
            toast.error("Invalid college ID");
            navigate("/colleges");
         }
         setCollegeData(data);
      } catch (err) {
         console.log(err);
         toast("Something went wrong, please try again");
      }
   };

   useEffect(() => {
      getCollegeDetails();
   }, []);

   return (
      <Layout headerTitle={"College Profile"}>
         <AddClgAccordion accTitle={"COLLEGE LOGIN IDS"}>
            <ul>
               <LoginId />
               <LoginId />
               <LoginId />
               <LoginId />
               <LoginId />
            </ul>
         </AddClgAccordion>
         <AddClgAccordion accTitle={"COLLEGE DETAILS"}>
            <ClgDetailsBlock data={collegeData?.college[0]} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"INFRASTRUCTURE"}>
            <InfrastructureBlock data={collegeData?.infra} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"HIGHLIGHTS"}>
            <HighlightBlock data={collegeData?.highlight[0]} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"SPORTS"}>
            <SportBlock data={collegeData?.sports} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"CULTURAL"}>
            <SportBlock data={collegeData?.cultural} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"ACADEMICS"}>
            <SportBlock data={collegeData?.acedemic} />
         </AddClgAccordion>

         <AddClgAccordion accTitle={"ALUMNI AND TOPPERS"}>
            <ToppersInfoBlock data={collegeData?.alumini_and_toppers} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"MANAGEMENT & STAFF"}>
            <StaffInfoBlock data={collegeData?.management_staff} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"SUBJECTS"}>
            <SubjectSeats data={collegeData?.subject} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"ELIGIBILITY & TERMS"}>
            <FeeStructureBlock data={collegeData?.feeStructure[0]} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"COLLEGE IMAGES"}>
            <CollegeImagesView data={collegeData?.clgimage} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"YOUTUBE LINKS"}>
            <YoutubeView data={collegeData?.videoUrl?.[0]} />
         </AddClgAccordion>
         <AddClgAccordion accTitle={"COLLEGE POLICY & SOCIAL MEDIA"}>
            <PolicyBlock data={collegeData?.clgpolicySocialMedia[0]} />
         </AddClgAccordion>
      </Layout>
   );
};

export default CollegeProfile;
