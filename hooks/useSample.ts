import { useState } from 'react';

const useTest = () => {
  const [test, setTest] = useState('test');

  return { test, setTest };
};

export default useTest;
