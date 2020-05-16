import React, { useState, useEffect } from "react";
import Table from "./../Table";
import Filters from "./../Filters";
import "./ParsedTable.scss";

export default function ParsedTable({ contents, filters, onFiltersUpdate }) {
  const [displayContents, setDisplayContents] = useState(null);

  useEffect(() => {
    if (contents && filters) {
      filters.some(filter => {
        const isLines = filter.key === "lines";
        if (isLines && filter.value) {
          const parsed = contents.slice(0, filter.value);
          setDisplayContents(parsed);
        }

        return isLines;
      });
    }
  }, [contents, filters]);

  const handleUpdate = updatedFilters => {
    onFiltersUpdate(updatedFilters);
  };

  return (
    displayContents && (
      <div className="parsed-info-wrapper">
        <Filters filters={filters} onUpdate={handleUpdate} />
        <Table contents={displayContents} />
      </div>
    )
  );
}
