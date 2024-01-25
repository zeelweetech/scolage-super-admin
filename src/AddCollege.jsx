import AddClgAccordion from "./components/AddClgAccordion";
import CollegeDetailForm from "./components/CollegeDetailForm";
import HighlightForm from "./components/HighlightForm";
import InfrastructureForm from "./components/InfrastructureForm";
import Layout from "./components/Layout";
import styled from "styled-components";
import ToppersBlock from "./components/ToppersBlock";
import StaffBlock from "./components/StaffBlock";
import SubjectBlock from "./components/SubjectBlock";
import FeesBlock from "./components/FeesBlock";
import CollegeImagesBlock from "./components/CollegeImagesBlock";
import TandCBlock from "./components/TandCBlock";
import SportUploadBlock from "./components/SportUploadBlock";
import CulturalBlock from "./components/CulturalBlock";
import AcademicBlock from "./components/AcademicBlock";
import { useEffect } from "react";
import { useLoadingBar } from "./context/LoadingBarContext";
import YtLinks from "./components/YtLinks";

const Wrapper = styled.div``;

const AddCollege = () => {
   const { setProgressBar } = useLoadingBar();
   useEffect(() => {
      setProgressBar(50);
      setProgressBar(100);
   }, [setProgressBar]);
   return (
      <Layout headerTitle={"College Profile Add or Edit"}>
         <Wrapper>
            <AddClgAccordion accTitle="College Details">
               <CollegeDetailForm />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"INFRASTRUCTURE"}>
               <InfrastructureForm />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"HIGHLIGHTS"}>
               <HighlightForm />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"SPORTS"}>
               <SportUploadBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"CULTURAL"}>
               <CulturalBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"ACADEMICS"}>
               <AcademicBlock />
               {/* <GalleryBlock /> */}
            </AddClgAccordion>
            <AddClgAccordion accTitle={"ALUMNI AND TOPPERS"}>
               <ToppersBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"MANAGEMENT & STAFF"}>
               <StaffBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"SUBJECTS"}>
               <SubjectBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"ELIGIBILITY & TERMS"}>
               <FeesBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"COLLEGE IMAGES"}>
               <CollegeImagesBlock />
            </AddClgAccordion>
            <AddClgAccordion accTitle={"YOUTUBE LINKS"}>
               <YtLinks />
               {/* <CollegeImagesBlock /> */}
            </AddClgAccordion>
            <AddClgAccordion accTitle={"COLLEGE POLICY & SOCIAL MEDIA"}>
               <TandCBlock />
            </AddClgAccordion>
         </Wrapper>
      </Layout>
   );
};

export default AddCollege;
