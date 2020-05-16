import React, { useState } from "react";
import "./Filters.scss";

export default function ParsedTable({ filters, onUpdate }) {
  const [filterValues, setFilterValues] = useState(filters);

  const handleChange = (e, i) => {
    const value = e.target.value;
    const updatedFilters = [...filterValues];
    updatedFilters[i].value = value;
    setFilterValues(updatedFilters);
    onUpdate(updatedFilters);
  };

  return (
    <div className="filters-wrapper">
      {filterValues.map((filter, index) => {
        return (
          <input
            type={filter.type}
            placeholder={filter.placeholder}
            value={filter.value}
            onChange={e => {
              handleChange(e, index);
            }}
            key={index}
            minLength={filter.minlength}
            maxLength={filter.maxlength}
          />
        );
      })}
    </div>
  );
}
