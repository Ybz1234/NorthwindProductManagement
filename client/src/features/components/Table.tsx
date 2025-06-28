import React from "react";

export type Column<T> = {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  containerClassName?: string;
  tableClassName?: string;
};

export function Table<T>({
  columns,
  data,
  rowKey,
  containerClassName = "",
  tableClassName = "",
}: TableProps<T>) {
  return (
    <div className={containerClassName}>
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{ width: col.width, textAlign: col.align ?? "left" }}
                className={col.className}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((col, i) => {
                  let content: React.ReactNode;
                  if (col.render) {
                    content = col.render(row);
                  } else if (typeof col.accessor === "function") {
                    content = col.accessor(row);
                  } else {
                    content = row[col.accessor] as React.ReactNode;
                  }
                  return (
                    <td
                      key={i}
                      style={{ textAlign: col.align ?? "left" }}
                      className={col.className}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}