import StyledButton from "../StyledButton";

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

  //TODO Refactor to move state out of the filter and into the table
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

export default GlobalClassFilter;
