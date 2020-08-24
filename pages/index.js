import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import App from "../components/Table/Table";

const Index = ({ data }) => {
  return (
    <>
      <Head>
        <title>Dungeons and Dragons Spellbook</title>
      </Head>
      <Layout>
        <NavBar title="D&D Spellbook" />
        <Hero
          title={"Dungeons and Dragons Spellbook"}
          subtitle={"The place for all your D&D 5th Edition spell needs!"}
          image={"/static/images/hero4.jpg"}
        />
        <App tableData={data} />
      </Layout>
    </>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch(`https://dnd-spell-api.herokuapp.com/spells/`);
  const data = await res.json();

  console.log(`Showing data fetched. Count: ${data.length}`);
  try {
    return {
      data: data,
    };
  } catch (error) {
    console.error(error);
  }
};

export default Index;
