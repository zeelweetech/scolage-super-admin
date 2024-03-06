import styled from "styled-components";
import InfraChecks from "./InfraChecks";
import MoreInfoField from "./MoreInfoField";
import { useEffect, useState } from "react";
import CheckData from "../../helper/InfraCheckData";
import toast from "react-hot-toast";
import axios from "axios";
import InfraChecksEdit from "./InfraChecksEdit";

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

const InfrastructureBlock = ({ data, getCollegeDetails }) => {
  // console.log(info)
  const [infraChecks, setInfraChecks] = useState([]);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(data);

  const setFetchedItems = () => {
    var tempArr = [];
    for (var key in data) {
      if (data[key] == true) {
        tempArr.push(key);
      }
    }
    setInfraChecks(tempArr);
  };

  useEffect(() => {
    setFetchedItems();
  }, []);

  const handleChange = (e) => {
    if (editable) {
      setFormData({
        ...formData,
        moreinfo: e.target.value,
      });
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleCheckChange = (key, value) => {
    if (editable) {
      setFormData({
        ...formData,
        [key]: value,
      });
    } else {
      toast.dismiss();
      toast.error("Edit Details not allowed !!");
    }
  };

  const handleFormSubmit = async () => {
    const loading = toast.loading("Saving details...");
    try {
      const { data } = await axios.put(
        `/v2/edit/infrastr/${formData.infraid}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEditable(false);
      getCollegeDetails();
      toast.dismiss(loading);
      toast.success("Details updated successfully !!");
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("Something went wrong, please try again !!");
    }
  };

  return (
    <>
      <Wrapper>
        <div className="infra-left">
          <div className="infra-radios-main">
            {CheckData.map((item, index) => (
              <InfraChecksEdit
                disabled={!editable}
                key={index}
                name="infra-checks"
                data={item}
                infraChecks={infraChecks}
                formData={formData}
                handleCheckChange={handleCheckChange}
                setInfraChecks={setInfraChecks}
              />
            ))}
          </div>
        </div>
        <div className="infra-right">
          <MoreInfoField
            height={"500px"}
            name="moreinfo"
            value={formData?.moreinfo}
            handleChange={handleChange}
          />
        </div>
      </Wrapper>
      <div className="bottom-ctas-styles save-cta-main">
        {editable && (
          <button
            className="cancel-btn-cta"
            onClick={() => {
              setEditable(false);
              setFormData(data);
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

export default InfrastructureBlock;
