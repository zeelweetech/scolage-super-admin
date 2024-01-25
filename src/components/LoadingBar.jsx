import React, { useContext } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useLoadingBar } from '../context/LoadingBarContext';

const ProgressBar = () => {
  const { progress, setProgressBar } = useLoadingBar();

  return (
    <LoadingBar
          color="#60269E"
          height={4}
      progress={progress}
      // onLoaderFinished={() => setProgressBar(0)}
    />
  );
};

export default ProgressBar;