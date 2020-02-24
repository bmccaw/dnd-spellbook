import fetch from "isomorphic-unfetch";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import parse from "html-react-parser";

const Spell = ({ spell }) => {
  console.log(spell);

  const {
    name,
    desc,
    higher_level,
    range,
    ritual,
    duration,
    concentration,
    casting_time,
    level,
    school,
    level_desc,
    range_desc,
    component_desc,
    verbal,
    material,
    somatic,
    material_desc,
    material_cost,
    source,
    page
  } = spell;

  return (
    <Layout>
      <Hero />
      <h1>{name}</h1>
      <div>{parse(desc)}</div>
      {higher_level && <p>{higher_level}</p>}
      <p>Range: {range}</p>
      <p>Ritual: {ritual ? "Yes" : "No"}</p>
      <p>Duration: {duration}</p>
      <p>Concentration: {concentration ? "Yes" : "No"}</p>
    </Layout>
  );
};

Spell.getInitialProps = async context => {
  const { id } = context.query;
  const res = await fetch(`https://dnd-spell-api.herokuapp.com/spells/${id}`);
  const spell = await res.json();

  console.log(`Fetched spell: ${spell.name}`);

  return { spell: spell };
};

export default Spell;
