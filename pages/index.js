import fetch from "isomorphic-unfetch";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import SpellTable from "../components/SpellTable";
import Nav from "../components/Navbar";

const Index = ({ data }) => (
  <Layout>
    <Nav title="Dungeons and Dragons Spellbook" />
    <Hero
      title={"Dungeons and Dragons Spellbook"}
      subtitle={"The place for all your D&D 5th Edition spell needs!"}
      image={"/static/images/hero.jpg"}
    />
    <SpellTable data={data} />
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch(`https://dnd-spell-api.herokuapp.com/spells/`);
  const data = await res.json();

  console.log(`Showing data fetched. Count: ${data.length}`);

  return {
    data: data
  };
};

export default Index;
