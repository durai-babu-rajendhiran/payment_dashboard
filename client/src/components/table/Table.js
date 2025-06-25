// components/Table.js
import React, { useState } from 'react';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  {onEdit && (
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
