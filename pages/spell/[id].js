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
    school,
    level_desc,
    component_desc,
    material_desc,
    source,
    page
  } = spell;

  const bookLocation = source + ` ` + page;

  return (
    <Layout>
      <h1>{name}</h1>
      <p>
        <i>
          {level_desc} {school}
          {ritual ? " (Ritual)" : ""}
        </i>
      </p>
      <p>
        <b>Casting Time:</b> {casting_time}
      </p>
      <p>
        <b>Range:</b> {range}
      </p>
      <p>
        <b>Components:</b> {component_desc}
        {material_desc ? ` (${material_desc})` : ""}
      </p>
      <p>
        <b>Duration:</b> {duration}
      </p>
      <div>{parse(desc)}</div>
      {higher_level && (
        <div>
          <b>At Higher Levels: </b>
          {parse(higher_level)}
        </div>
      )}
      <p>{bookLocation}</p>
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
