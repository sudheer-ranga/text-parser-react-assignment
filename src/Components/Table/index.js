import React from "react";
import "./Table.scss";

export default function Table({ contents, lines }) {
  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          {contents.map((line, index) => {
            return (
              <tr key={`row-${index}`}>
                {line.map((data, i) => {
                  return <td key={`data-${i}`}>{data}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
