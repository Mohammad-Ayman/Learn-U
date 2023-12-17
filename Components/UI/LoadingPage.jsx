import styled, { keyframes } from "styled-components";

// Create a keyframe animation
const roll = keyframes`
  0% {
    transform: translateX(-150%) rotate(0deg);
  }
  100% {
    transform: translateX(150%) rotate(360deg);
  }
`;

// Create a styled component for the loader container
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 4rem;
  color: #2e8dff;
`;

// Create a styled component for the loader circle
const LoaderCircle = styled.span`
  width: 48px;
  height: 48px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  animation: ${roll} 1s ease-in-out infinite alternate;

  &:after {
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    border: 5px solid;
    border-color: #2e8dff transparent;
  }
`;

const LoadingPage = () => {
  return (
    <div className={`home-container `}>
      <LoaderContainer>
        <LoaderCircle />
      </LoaderContainer>
    </div>
  );
};

export default LoadingPage;
