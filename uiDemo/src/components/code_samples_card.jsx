import React from "react";

function CodeSamplesListCard({ codeSamples, handleCodeSelect, selectedCode }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {codeSamples.map((sample) => (
        <div
          key={sample.id}
          className={`p-4 border rounded ${
            selectedCode === sample.code ? "bg-blue-200" : ""
          }`}
          onClick={() => handleCodeSelect(sample.code)}
        >
          <div className="whitespace-normal break-words">{sample.code}</div>
        </div>
      ))}
    </div>
  );
}

export default CodeSamplesListCard;
