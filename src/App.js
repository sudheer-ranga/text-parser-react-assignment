import React, { useState, useEffect } from "react";
import FileDragDrop from "./Components/FileDragDrop";
import ParsedTable from "./Components/ParsedTable";

import "./reset.css";
import "./styles.scss";

export default function App() {
  const initialFilters = [
    {
      key: "delimiter",
      type: "text",
      placeholder: "Delimiter",
      value: ",",
      minlength: 1,
      maxlength: 1
    },
    {
      key: "lines",
      type: "number",
      placeholder: "No of Lines",
      value: 2
    }
  ];

  const [fileContents, setFileContents] = useState(null);
  const [parsedContents, setParsedContents] = useState(null);
  const [fileError, setFileError] = useState({ type: false, empty: false });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    if (!fileContents) return;

    const parseContents = () => {
      const lines = fileContents.split("\n");
      let delimiter = null;
      filters.some(filter => {
        const isDelimiter = filter.key === "delimiter";
        if (isDelimiter) {
          delimiter = filter.value;
        }

        return isDelimiter;
      });

      if (!delimiter) return;
      const parsedData = lines.map(line => {
        const splitArray = line.split(delimiter).slice(0, 4);
        // If the array length is less than 4, fill the remaining elements with empty value
        for (let i = 0; i < 4; i++) {
          if (!splitArray[i]) {
            splitArray[i] = "";
          }
        }
        return splitArray;
      });

      setParsedContents(parsedData);
    };

    parseContents();
  }, [filters, fileContents]);

  const getContents = file => {
    setFilters(initialFilters);
    setFileError({ empty: false, type: file.error }); // reset error

    if (!file.error) {
      const contents = file.contents;
      if (!contents) setFileError({ ...fileError, empty: true });
      setFileContents(contents);
    } else {
      setFileContents(null);
    }
  };

  return (
    <div className="App">
      <FileDragDrop handleDrop={getContents} loadingCallback={setLoading} />
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader" />
        </div>
      ) : fileError.type || fileError.empty ? (
        (fileError.type && (
          <p className="error">Please upload file with '.txt' extension</p>
        )) ||
        (fileError.empty && <p className="error">Uploaded file is empty</p>)
      ) : (
        <ParsedTable
          contents={parsedContents}
          filters={filters}
          onFiltersUpdate={setFilters}
        />
      )}
    </div>
  );
}
