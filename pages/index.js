import fetch from 'isomorphic-unfetch';
import Hero from '../components/Hero';
// import Nav from '../components/Navbar';

const Index = (props) => (
	<div>
	  {/* <Nav /> */}
	  <Hero /> 
	  <ul>
		  {props.results.map(spell => (
			  <li>
				  {spell.name}
			  </li>
		  ))}
	  </ul>
	</div>
  );

  Index.getInitialProps = async () => {
	  const res = await fetch ('http://dnd5eapi.co/api/spells/');
	  const data = await res.json();
	  
	  console.log(`Showing data fetched. Count: ${data.count}`);

	  return {
		  results: data.results
	  };
  };
  
  export default Index;