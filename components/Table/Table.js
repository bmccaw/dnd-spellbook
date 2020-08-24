import React, { useEffect, useRef, forwardRef, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import GlobalSearch from "../Table/GlobalSearch";
import GlobalClassFilter from "../Table/GlobalClassFilter";
import SelectColumnFilter from "../Table/SelectColumnFilter";
import StyledButton from "../StyledButton";
import Link from "next/link";
import Styled from "styled-components";
import createSpellbook from "../createSpellbook";

const Styles = Styled.div`
  table {
    font-family: "Roboto";
    color: #494949;
    width: 100%;
    border-spacing: 0;
    tr {
      :nth-of-type(odd) {
        td{
        background: #e6e6e6;
        }
      }
    }
    thead th {
      position: sticky;
      top:0px;
    }
    th,
    td {
      background-color: #f8f8fa;
      margin: 0;
      padding: 1rem;
      text-align: left;
    }
  }
  a {
    text-decoration:none;
    color: #F07818;
    font-weight: 500;
    transition: all 0.4s ease 0s;
    : hover {
      color: #494949;
      transition: all 0.4s ease 0s;
    }
  }
`;

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: "name", desc: false }],
        hiddenColumns: ["class_desc"],
      },
      disableSortRemove: true,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  useEffect(() => {
    const tableHeaderTop = document
      .querySelector(".sticky-table thead")
      .getBoundingClientRect().top;
    const ths = document.querySelectorAll(".sticky-table thead th");
    // const nav = document.querySelector(".nav").getBoundingClientRect().top;

    for (let i = 0; i < ths.length; i++) {
      const th = ths[i];
      th.style.top = th.getBoundingClientRect().top - tableHeaderTop + "px";
    }
  }, []);

  const handleSpellbookExport = () => {
    createSpellbook(selectedFlatRows);
  };

  return (
    <table className="sticky-table" {...getTableProps()}>
      <thead>
        <tr>
          <th colSpan={visibleColumns.length}>
            <GlobalSearch
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <StyledButton onClick={handleSpellbookExport}>
              Create Spellbook
            </StyledButton>
            <GlobalClassFilter setGlobalFilter={setGlobalFilter} />
            <StyledButton
              onClick={() => {
                setAllFilters([]);
                //TODO move state to Table to fix "active" button
                // setGlobalFilter("" || undefined);
              }}
            >
              Reset Filters
            </StyledButton>
          </th>
        </tr>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={index}>
                <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-chevron-up" aria-hidden="true"></i>
                    )
                  ) : (
                    ""
                  )}
                </span>
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell) => {
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
  const data = useMemo(() => tableData, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: SelectColumnFilter,
        filter: "includes",
        disableFilters: true,
        Cell: ({ row }) => (
          <Link href={`/spell/{[id]}`} as={`spell/${row.original._id}`}>
            <a target="_blank">{row.original.name}</a>
          </Link>
        ),
      },
      {
        Header: "Level",
        accessor: (spell) => String(spell.level),
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "School",
        accessor: "school",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Casting Time",
        accessor: "casting_time",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Ritual",
        accessor: (a) => (a.ritual == true ? "Yes" : "No"),
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Concentration",
        accessor: (a) => (a.concentration == true ? "Yes" : "No"),
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Source",
        accessor: "source",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Class",
        accessor: "class_desc",
        Filter: SelectColumnFilter,
        filter: "includes",
        show: false,
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
};

export default App;
