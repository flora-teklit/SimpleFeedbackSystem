import React, { useState } from "react";
import CodeSamplesListCard from "./components/code_samples_card";
import ModelsSelectDropDown from "./components/models_select_dropdown";
import TextAreaForDisplayingAndEditingTheCodeSample from "./components/text_area_for_editing_code_sample";
import OptimisedCodeOutputDisplayCard from "./components/optimised_code_output_display_card";
import axios from "axios";
import { codeSamples } from "./utils/sample_codes";

const App = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedModel, setSelectedModel] = useState("textDavinci");
  const [optimizedCode, setOptimizedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = "http://127.0.0.1:8081";

  const handleTextAreaChange = (event) => {
    setSelectedCode(event.target.value);
  };

  const handleCodeSelect = (code) => {
    setSelectedCode(code);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleOptimizeClick = () => {
    const payload = {
      code: selectedCode,
      model: selectedModel,
    };

    axios
      .post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(true);
        const optimizedCodeFromApi = response.data.optimized_code;
        setOptimizedCode(optimizedCodeFromApi);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error optimizing code:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-950">
        Code Optimization
      </h1>
      <CodeSamplesListCard
        codeSamples={codeSamples}
        selectedCode={selectedCode}
        handleCodeSelect={handleCodeSelect}
      />

      <TextAreaForDisplayingAndEditingTheCodeSample
        selectedCode={selectedCode}
        handleTextAreaChange={handleTextAreaChange}
      />
      <ModelsSelectDropDown
        handleModelSelect={handleModelSelect}
        selectedModel={selectedModel}
      />

      <button
        className={`rounded mb-8 my-8 py-2 px-4 text-white font-bold ${
          selectedCode === "" || selectedModel === ""
            ? "bg-gray-300"
            : "bg-blue-500"
        }`}
        onClick={handleOptimizeClick}
        disabled={selectedModel === "" || selectedCode === ""}
      >
        Optimize
      </button>

      {optimizedCode !== null && (
        <OptimisedCodeOutputDisplayCard
          optimizedCode={loading ? "Loading ...... " : optimizedCode}
        />
      )}
    </div>
  );
};

export default App;
