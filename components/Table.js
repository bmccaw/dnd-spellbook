import React from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import Link from "next/link";
import Styled from "styled-components";
import createSpellbook from "./createSpellbook";

const Styles = Styled.div`
  table {
    font-family: "Roboto";
    color: #494949;
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
      background-color: #f8f8fa;
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
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

const StyledButton = Styled.button`
color: #494949;
text-transform: uppercase;
text-decoration: none;
background: #ffffff;
padding: 10px;
margin: 5px;
border: 2px solid #494949;
display: inline-block;
cursor:pointer;
transition: all 0.4s ease 0s;
& : hover {
  color: #ffffff;
background: #F07818;
border-color: #F07818;
transition: all 0.4s ease 0s;
}
`;

// Define a default UI for filtering
// This will be used for the search bar
function GlobalSearch({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} spells...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

const GlobalClassFilter = ({ setGlobalFilter }) => {
  const classArr = [
    "Bard",
    "Cleric",
    "Druid",
    "Paladin",
    "Ranger",
    "Sorceror",
    "Warlock",
    "Wizard",
  ];

  return classArr.map((val, index) => {
    return (
      <StyledButton
        key={index}
        value={val}
        onClick={(e) => {
          setGlobalFilter(e.target.value || undefined);
        }}
      >
        {val}
      </StyledButton>
    );
  });
};

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

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
    useFilters,
    useGlobalFilter,
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

  const handleClick = () => {
    createSpellbook(selectedFlatRows);
  };

  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <GlobalSearch
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <StyledButton onClick={handleClick}>Create Spellbook</StyledButton>
            <GlobalClassFilter setGlobalFilter={setGlobalFilter} />
          </th>
        </tr>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {/* Replace 'v's' with real icons */}
                  {/* {column.isSorted ? (column.isSortedDesc ? " v" : " ^") : ""} */}
                </span>
                {/* Select filters keep causing getInitialProps error */}
                {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
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
  const data = React.useMemo(() => tableData, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ row }) => (
          <Link href={`/spell/{[id]}`} as={`spell/${row.original._id}`}>
            <a target="_blank">{row.original.name}</a>
          </Link>
        ),
      },
      {
        Header: "Level",
        accessor: "level",
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
