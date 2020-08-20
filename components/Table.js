import React, { useEffect } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useAsyncDebounce,
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

const StyledButton = Styled.button`
color: ${({ active }) => (active ? "#ffffff" : "#494949")};
text-transform: uppercase;
text-decoration: none;
background: ${({ active }) => (active ? "#F07818" : "#ffffff")};
padding: 10px;
margin: 5px;
border: 2px solid;
border-color: ${({ active }) => (active ? "#F07818" : "#494949")} ;
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
const GlobalSearch = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined); // Set undefined to remove the filter entirely
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
};

const GlobalClassFilter = ({ setGlobalFilter }) => {
  const classArr = [
    {
      id: 1,
      title: "Bard",
    },
    {
      id: 2,
      title: "Cleric",
    },
    {
      id: 3,
      title: "Druid",
    },
    {
      id: 4,
      title: "Paladin",
    },
    {
      id: 5,
      title: "Ranger",
    },
    {
      id: 6,
      title: "Sorcerer",
    },
    {
      id: 7,
      title: "Warlock",
    },
    {
      id: 8,
      title: "Wizard",
    },
  ];
  const [active, setActive] = React.useState(null);

  return classArr.map((val) => {
    return (
      <StyledButton
        key={val.id}
        value={val.title}
        active={val.title === active}
        id={val.id}
        onClick={(e) => {
          if (active === val.title) {
            setActive(null);
            setGlobalFilter("" || undefined);
          } else {
            setActive(e.target.value);
            setGlobalFilter(e.target.value || undefined);
          }
        }}
      >
        {val.title}
      </StyledButton>
    );
  });
};

// This is a custom filter UI for selecting
// a unique option from a list
const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  options.sort();

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
};

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

  const handleClick = () => {
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
            <StyledButton onClick={handleClick}>Create Spellbook</StyledButton>
            <GlobalClassFilter setGlobalFilter={setGlobalFilter} />
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
                {/* Isn't playing nice with GlobalSearch. Only seems to work when used before GlobalFilter */}
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
  const data = React.useMemo(() => tableData, []);

  const columns = React.useMemo(
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
