import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import NavBar from "../../components/NavBar";
import Container from "../../components/Container";
import parse from "html-react-parser";

const Spell = ({ spell }) => {
  const {
    name,
    desc,
    higher_level,
    range,
    ritual,
    duration,
    casting_time,
    school,
    level_desc,
    component_desc,
    material_desc,
    source,
    page,
  } = spell;

  const bookLocation = source + ` ` + page;

  return (
    <>
      <Head>
        <title>Dungeons and Dragons Spellbook | {name}</title>
      </Head>
      <Layout>
        <NavBar title={"D&D Spellbook"} />
        <Container>
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
        </Container>
      </Layout>
    </>
  );
};

Spell.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://dnd-spell-api.herokuapp.com/spells/${id}`);
  const spell = await res.json();

  console.log(`Fetched spell: ${spell.name}`);

  return { spell: spell };
};

export default Spell;
