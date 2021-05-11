import React from 'react';

const TextInput = props => {
  const { classname, handleSearch } = props;
  return <input className={classname} type="text" onClick={handleSearch} />;
};

export default TextInput;
