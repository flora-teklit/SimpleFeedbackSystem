import React from "react";

const TextAreaForDisplayingAndEditingTheCodeSample = ({
  selectedCode,
  handleTextAreaChange,
}) => {
  return (
    <div className="rounded bg-white p-4 shadow-md mb-4 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-950">Selected sample</h1>
      <textarea
        className="w-full h-32 border rounded p-2"
        value={selectedCode}
        onChange={handleTextAreaChange}
        placeholder="Your selected code sample will be diaplyed here.
          You can also edit it ......."
      />
    </div>
  );
};

export default TextAreaForDisplayingAndEditingTheCodeSample;
