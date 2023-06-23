import React from "react";

const ModelsSelectDropDown = ({ handleModelSelect, selectedModel }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor="model" className="mr-2">
        Select Model:
      </label>
      <select
        id="model"
        className="p-2 border rounded"
        value={selectedModel}
        onChange={(e) => handleModelSelect(e.target.value)}
      >
        <option value="textDavinci">Text Davinci</option>
        <option value="codeDavinci">Code Davinci</option>
        {}
      </select>
    </div>
  );
};

export default ModelsSelectDropDown;
