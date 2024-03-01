import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";

const Wrapper = styled.div`
  background: #f6efff;
  border: 1px solid #707070;
  border-radius: 20px;
  height: 100%;

  .header {
    border-bottom: 1px solid #9c9c9c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px 12px 56px;

    .task-done-per {
      font-weight: 400;
      font-size: 29px;
      color: #000000;
      display: flex;
      align-items: center;
      gap: 20px;

      span {
        font-weight: 400;
        font-size: 22px;
        color: #7a86a1;
      }
    }

    .options {
      button {
        height: 18px;
        width: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 100%;

          path {
            fill: #707070;
          }
        }
      }
    }
  }

  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 38px;

    .tasks-status {
      padding-left: 27px;

      p {
        font-weight: 400;
        font-size: 29px;
        line-height: 39px;
        color: #000000;
        padding-bottom: 6px;
      }

      h5 {
        font-weight: 400;
        font-size: 23px;
        line-height: 31px;
        color: #7a86a1;
        text-transform: capitalize;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: -27px;
          transform: translateY(-50%);
          width: 17px;
          height: 17px;
          border-radius: 100%;
          background: #7a86a1;
          border: 1px solid #707070;
        }
      }

      &.completed {
        h5 {
          &::before {
            background: #2dc127;
          }
        }
      }
      &.pending {
        h5 {
          &::before {
            background: #f3770b;
          }
        }
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    .header {
      padding: 12px 28px 8px 52px;
      .task-done-per {
        font-size: 26px;
      }
      .task-done-per {
        span {
          font-size: 20px;
        }
      }
    }
    .body {
      gap: 10px;
      padding: 12px 28px;
      .tasks-status {
        h5 {
          font-size: 20px;
          line-height: 26px;
        }
      }
    }
  }
`;

const TaskBlock = ({ countData }) => {
  return (
    <Wrapper>
      <div className="header">
        <div className="task-done-per">
          {countData?.percentageWorkDone} <span>Tasks done</span>
        </div>
        <div className="options">
          <button>
            <FiMoreHorizontal />
          </button>
        </div>
      </div>

      <div className="body">
        <div className="tasks-status completed">
          <p>{countData?.completed}</p>
          <h5>completed</h5>
        </div>
        <div className="tasks-status pending">
          <p>{countData?.pending}</p>
          <h5>Pending</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default TaskBlock;
