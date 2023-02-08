import Head from 'next/head';

function HeadingLocations() {
  return (
    <Head>
      <title>Locations | Pokeref</title>
      <meta
        name="description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:title" content="Locations | Pokeref" />
      <meta
        property="og:description"
        content="Pokeref is a pokemon encyclopedia where you will find a ton of information for every pokemon game"
      />
      <meta property="og:url" content="https://pokeref.app/locations" />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default HeadingLocations;
