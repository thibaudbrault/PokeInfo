import Link from 'next/link';

import { removeDash } from '@/utils';

import styles from '../Data.module.scss';

import type { IGenus, IPokemon, IPokemonSpecies } from '@/types';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

export function Base({ pokemon, species }: Props) {
  // Convert height and weight to meters and kilograms and round the number
  const height = Number.parseFloat((pokemon.height * 0.1).toFixed(2));
  const weight = Number.parseFloat((pokemon.weight * 0.1).toFixed(2));
  const heightFt = (height * 3.28084).toFixed(1).replace(`.`, `'`) + `"`;
  const weightLb = Number.parseFloat((weight * 2.20462).toFixed(2));

  const filterGenera: IGenus | undefined =
    species && species.genera.find((sg) => sg.language.name === `en`);

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>pokédex number</th>
          <td>
            {pokemon?.id < 10000
              ? `# ${pokemon?.id?.toString()?.padStart(3, `0`)}`
              : `# ${pokemon.species.url.match(/\d/g)?.slice(1).join(``)}`}
          </td>
        </tr>
        <tr>
          <th>abilities</th>
          <td>
            <ul>
              {pokemon.abilities?.map((pa) => (
                <li key={pa.ability.name}>
                  <Link
                    className="tLink"
                    href={`/abilities/${pa.ability.name}`}
                    key={pa.ability.name}
                  >
                    {removeDash(pa.ability.name)}
                  </Link>
                  {pa.is_hidden && (
                    <small className="small"> (hidden ability)</small>
                  )}
                </li>
              ))}
            </ul>
          </td>
        </tr>
        <tr>
          <th>height</th>
          <td>
            {height.toString()} m ({heightFt})
          </td>
        </tr>
        <tr>
          <th>weight</th>
          <td>
            {weight.toString()} kg ({weightLb} lbs)
          </td>
        </tr>
        {pokemon.id < 10000 && (
          <>
            <tr>
              <th>category</th>
              <td>{filterGenera && filterGenera?.genus}</td>
            </tr>
            <tr>
              <th>shape</th>
              <td>{species?.shape?.name}</td>
            </tr>
            <tr>
              <th>color</th>
              <td>{species?.color?.name}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
