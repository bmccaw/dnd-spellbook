import fetch from 'isomorphic-unfetch';

const Spell = props => (
	<div>
		<h1>{props.spell.name}</h1>
		<p>{props.spell.desc}</p>
	</div>
);

Spell.getIntialProps = async (context) => {
	const { id } = context.query;
	const res = await fetch(`http://dnd5eapi.co/api/spells/${id}`);
  	const spell = await res.json();

	console.log(`Fetched spell: ${spell.name}`);

	return { spell };
	
}

export default Spell;