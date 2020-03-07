import React from "react";
import { useTable, useSortBy } from "react-table";
import Styled from "styled-components";

const Styles = Styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: "name", desc: false }]
      }
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {/* Replace 'v's' with real icons */}
                  {column.isSorted ? (column.isSortedDesc ? " v" : " ^") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const App = ({ tableData }) => {
  const data = tableData;
  const columns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Level",
      accessor: "level"
    },
    {
      Header: "School",
      accessor: "school"
    },
    {
      Header: "Casting Time",
      accessor: "casting_time"
    },
    {
      Header: "Ritual",
      accessor: "ritual"
    },
    {
      Header: "Concentration",
      accessor: "concentration"
    },
    {
      Header: "Source",
      accessor: "source"
    }
  ];

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
};

export default App;
