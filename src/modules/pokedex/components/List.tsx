import Link from 'next/link';

import { removeDash, removeLongName } from '@/utils';

import styles from '../Pokedex.module.scss';
import { Sprites } from './Sprites';
import { Types } from './Types';

import type { IPokemon } from '@/types';

type Props = {
  filteredPokedex: IPokemon[];
};

export function List({ filteredPokedex }: Props) {
  return (
    <ul className={styles.list} data-test-id="pokemonList">
      {filteredPokedex &&
        filteredPokedex?.map((p: IPokemon) => (
          <li
            className={styles.element}
            key={p.id}
            data-test-id="pokemonElement"
          >
            <Sprites p={p} />
            {p.id < 1018 && (
              <p className={styles.number}>
                {p.id.toString().padStart(3, `0`)}
              </p>
            )}
            <h2>
              <Link href={`/pokemon/${p.name}`} key={p.name}>
                {removeLongName(removeDash(p.name))}
              </Link>
            </h2>
            <div className={styles.types}>
              <Types p={p} />
            </div>
          </li>
        ))}
    </ul>
  );
}
