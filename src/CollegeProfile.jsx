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
import CulturalBlock from "./components/CulturalBlock";
import AcademicBlock from "./components/AcademicBlock";
import CulturalForm from "./components/CulturalForm";
import AcademicForm from "./components/AcademicForm";
import { useLoadingBar } from "./context/LoadingBarContext";

const CollegeProfile = () => {
  const [collegeData, setCollegeData] = useState(null);
  const navigate = useNavigate();
  const { setProgressBar } = useLoadingBar();

  let { id } = useParams();

  const getCollegeDetails = async () => {
    setProgressBar(0);
    try {
      setProgressBar(40);
      const { data } = await axios.post(`/v2/singleclglist/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setProgressBar(50);
      if (data.college.length === 0) {
        toast.error("Invalid college ID");
        navigate("/colleges");
        setProgressBar(0);
      }
      setCollegeData(data);
      setProgressBar(100);
    } catch (err) {
      setProgressBar(0);
      console.log(err);
      toast("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    getCollegeDetails();
  }, []);

  console.log("collegeData", collegeData);

  return (
    <Layout headerTitle={"College Profile"}>
      <AddClgAccordion accTitle={"COLLEGE LOGIN IDS"}>
        {collegeData && <LoginId info={collegeData?.college} />}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"COLLEGE DETAILS"}>
        {collegeData && (
          <ClgDetailsBlock
            data={collegeData?.college}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"INFRASTRUCTURE"}>
        {collegeData && (
          <InfrastructureBlock
            data={collegeData?.infra?.[0]}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"HIGHLIGHTS"}>
        {collegeData && (
          <HighlightBlock
            data={collegeData?.highlight?.[0]}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"SPORTS"}>
        {collegeData && (
          <SportBlock
            data={collegeData?.sports}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"CULTURAL"}>
        {collegeData && (
          <CulturalForm
            data={collegeData?.cultural}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"ACADEMICS"}>
        {collegeData && (
          <AcademicForm
            data={collegeData?.acedemic}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>

      <AddClgAccordion accTitle={"ALUMNI AND TOPPERS"}>
        {collegeData && (
          <ToppersInfoBlock
            data={collegeData?.alumini_and_toppers}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"MANAGEMENT & STAFF"}>
        {collegeData && (
          <StaffInfoBlock
            data={collegeData?.management_staff}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"SUBJECTS"}>
        {collegeData && (
          <SubjectSeats
            data={collegeData?.subject}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"ELIGIBILITY & TERMS"}>
        {collegeData && (
          <FeeStructureBlock
            data={collegeData?.feeStructure?.[0]}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"COLLEGE IMAGES"}>
        {collegeData && (
          <CollegeImagesView
            data={collegeData?.clgimage}
            id={id}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"YOUTUBE LINKS"}>
        {collegeData && (
          <YoutubeView
            data={collegeData?.videoUrl?.[0]}
            getCollegeDetails={getCollegeDetails}
          />
        )}
      </AddClgAccordion>
      <AddClgAccordion accTitle={"COLLEGE POLICY & SOCIAL MEDIA"}>
        <PolicyBlock
          data={collegeData?.clgpolicySocialMedia[0]}
          getCollegeDetails={getCollegeDetails}
        />
      </AddClgAccordion>
    </Layout>
  );
};

export default CollegeProfile;
