import styled from "styled-components";
import InfraChecks from "./InfraChecks";
import MoreInfoField from "./MoreInfoField";
import { useRef, useState } from "react";
import CheckData from "../../helper/InfraCheckData";
import toast from "react-hot-toast";
import axios from "axios";

const Wrapper = styled.div`
   display: flex;
   gap: 30px;
   .infra-left {
      flex: 2;
      .infra-radios-main {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         gap: 46px 20px;
      }
   }
   .infra-right {
      flex: 1;
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      flex-direction: column;
      .infra-left {
         .infra-radios-main {
            gap: 26px 10px;
         }
      }
   }
   @media (min-width: 1025px) and (max-width: 1280px) {
      /* flex-direction: column; */
      .infra-left {
         .infra-radios-main {
            gap: 26px 10px;
         }
      }
   }
`;

const InfrastructureForm = () => {
   const [infraChecks, setInfraChecks] = useState([]);

   const formRef = useRef(null)

   const handleFormSubmit = async (e) => {
      e.preventDefault();
      const loading = toast.loading('Adding...')
      try {
         if (infraChecks.length === 0) {
            toast.error("Please select at least one option");
            return false;
         }

         const collegeId = localStorage.getItem("collegeId");
         if (!collegeId) {
            toast.dismiss(loading)
            toast.error("College Id not found, Please add college details first.");
            return false;
         }

         const newObj = {
            collegeid: collegeId,
            moreinfo: e.target.moreinfo.value || "",
         };
         infraChecks.map((item) => {
            newObj[item] = true;
         });
         const { data } = await axios.post("/v2/reg/infrastr", newObj);
         if (data) {
            formRef.current.reset();
            setInfraChecks([])
         }
         toast.dismiss(loading)
         toast.success("Data added successfully.");
      } catch (err) {
         console.log(err);
         toast.dismiss(loading);
         toast.error("Data not added, Please try again.");
      }
   };

   return (
      <>
         <form ref={formRef} onSubmit={handleFormSubmit}>
            <Wrapper>
               <div className="infra-left">
                  <div className="infra-radios-main">
                     {CheckData.map((item, index) => (
                        <InfraChecks key={index} name="infra-checks" data={item} infraChecks={infraChecks} setInfraChecks={setInfraChecks} />
                     ))}
                  </div>
               </div>
               <div className="infra-right">
                  <MoreInfoField height={"500px"} name={"moreinfo"} />
               </div>
            </Wrapper>
            <div className="save-cta-main">
               <button>Save</button>
            </div>
         </form>
      </>
   );
};

export default InfrastructureForm;
