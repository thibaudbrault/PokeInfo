import Head from 'next/head';

type Props = {
  name: string;
};

export function Heading({ name }: Props) {
  return (
    <Head>
      <title>
        {`${name
          ?.replace(/-/g, ` `)
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}  | Type | PokéRef`}
      </title>
      <meta
        name="description"
        content={`Find every details about the ${name} type`}
      />
      <meta property="og:title" content={`${name} | Type | PokéRef`} />
      <meta
        property="og:description"
        content={`Find every details about the ${name} type`}
      />
      <meta property="og:url" content={`https://pokeref.app/types/${name}`} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
