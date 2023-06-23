import React from "react";

const OptimisedCodeOutputDisplayCard = ({ optimizedCode }) => {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-lg font-bold mb-2">Optimized Code:</h2>
      <pre>{optimizedCode}</pre>
    </div>
  );
};

export default OptimisedCodeOutputDisplayCard;
