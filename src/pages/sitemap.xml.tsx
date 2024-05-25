import { GetServerSideProps } from 'next';

import { IAbility, IItem, ILocation, IMove, IPokemon, IType } from '@/types';
import { BASE_URL, Limit, sanitizeForXML } from '@/utils';

const URL = `https://pokeref.app`;

export const runtime = `edge`;

async function generateSiteMap() {
  const pokedexRes = await fetch(`${BASE_URL}/pokemon?limit=${Limit.POKEMON}`);
  const pokedex: IPokemon[] = await pokedexRes
    .json()
    .then((res) => res.results);
  const movesRes = await fetch(`${BASE_URL}/move?limit=${Limit.MOVES.INDEX}`);
  const moves: IMove[] = await movesRes.json().then((res) => res.results);
  const abilitiesRes = await fetch(
    `${BASE_URL}/ability?limit=${Limit.ABILITIES}`,
  );
  const abilities: IAbility[] = await abilitiesRes
    .json()
    .then((res) => res.results);
  const typesRes = await fetch(`${BASE_URL}/type?limit=${Limit.TYPES}`);
  const types: IType[] = await typesRes.json().then((res) => res.results);
  const itemsRes = await fetch(`${BASE_URL}/item?limit=${Limit.ITEMS}`);
  const items: IItem[] = await itemsRes.json().then((res) => res.results);
  const locationsRes = await fetch(
    `${BASE_URL}/location?limit=${Limit.LOCATIONS}`,
  );
  const locations: ILocation[] = await locationsRes
    .json()
    .then((res) => res.results);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url>
        <loc>${URL}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${URL}/abilities</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${URL}/items</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${URL}/locations</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${URL}/machines</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${URL}/moves</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${URL}/types</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    ${pokedex.map((pokemon) => {
      const sanitizedName = sanitizeForXML(pokemon.name);
      return `
            <url>
                <loc>${URL}/pokemon/${sanitizedName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    })}
    ${moves.map((move) => {
      const sanitizedName = sanitizeForXML(move.name);
      return `
            <url>
                <loc>${URL}/move/${sanitizedName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    })}
    ${abilities.map((ability) => {
      const sanitizedName = sanitizeForXML(ability.name);
      return `
            <url>
                <loc>${URL}/ability/${sanitizedName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    })}
    ${types.map((type) => {
      const sanitizedName = sanitizeForXML(type.name);
      return `
            <url>
                <loc>${URL}/type/${sanitizedName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    })}
    ${items.map((item) => {
      const sanitizedName = sanitizeForXML(item.name);
      return `
            <url>
                <loc>${URL}/item/${sanitizedName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    })}
    ${locations.map((location) => {
      const sanitizedName = sanitizeForXML(location.name);
      return `
            <url>
                <loc>${URL}/location/${sanitizedName}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
        `;
    })}
  </urlset>
 `;
  return sitemap;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;

  // Generate the XML sitemap with the blog data
  const sitemap = await generateSiteMap();

  res.setHeader(`Content-Type`, `text/xml`);
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {}
