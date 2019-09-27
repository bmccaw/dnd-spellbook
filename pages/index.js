import fetch from 'isomorphic-unfetch';
import Hero from '../components/Hero';
import Link from 'next/link';
import Layout from '../components/Layout';
import SpellTable from '../components/SpellTable';

const Index = ({data}) => (
  <Layout>
    <Hero />
    <SpellTable rows={data}/>
    <style global jsx>{`
        body {
          margin: 0;
        }
      `}</style>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch("https://dnd-spell-api.herokuapp.com/spells/");
  const data = await res.json(); 

  console.log(`Showing data fetched. Count: ${data.length}`);

  return {
    data: data
  };
};

export default Index;
