import styled from "styled-components";
import AddIconWB from "../Icons/AddIconWB";
import toast from "react-hot-toast";
import axios from "axios";

const Wrapper = styled.div`
  max-width: 720px;
  .team-insert-form {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 44px;
  }

  .add-user-cta {
    button {
      width: 207px;
      height: 45px;
      background: #60269e;
      border: 1px solid #707070;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      gap: 10px;
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #fefefe;
      }
    }
  }
`;

const InsertFieldStyles = styled.div`
  input {
    border: 1px solid #707070;
    background: #fff;
    border-radius: 16px;
    height: 45px;
    padding: 10px;
    text-align: center;
    width: 207px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #000;
    outline: none;
  }
`;

const InsertTeamForm = ({ record, setRecord }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const employeeId = e.target.employeeId.value;
    const role = e.target.role.value;
    //  const userId = e.target.userId.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const tempData = {
      name,
      employeeId,
      role,
      // userId,
      email,
      password,
    };

    try {
      const { data } = await axios.post("/v2/reg/team", tempData);
      setRecord([...record, { ...tempData }]);
      e.target.name.value = "";
      e.target.employeeId.value = "";
      e.target.role.value = "";
      // e.target.userId.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
      toast.success("User Added Successfully !!");
    } catch (err) {
      console.log(err);
      toast.error("User Not Added !!");
    }
  };

  return (
    <Wrapper>
      <form className="team-insert-form" onSubmit={handleFormSubmit}>
        <InsertFieldStyles>
          <input type="text" name="name" placeholder="Name" />
        </InsertFieldStyles>
        <InsertFieldStyles>
          <input type="number" name="employeeId" placeholder="Employee ID" />
        </InsertFieldStyles>
        <InsertFieldStyles>
          <input type="text" name="role" placeholder="Role" />
        </InsertFieldStyles>
        <InsertFieldStyles>
          {/* <input type="number" name="userId" placeholder="User ID" /> */}
          <input type="email" name="email" placeholder="Email" />
        </InsertFieldStyles>
        <InsertFieldStyles>
          <input
            type="password"
            onCopy={(e) => e.preventDefault()}
            name="password"
            placeholder="Password"
          />
        </InsertFieldStyles>
        <div className="add-user-cta">
          <button type="submit">
            <AddIconWB />
            <p>Add User</p>
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default InsertTeamForm;
