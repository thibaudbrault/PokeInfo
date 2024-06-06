import Link from 'next/link';

import { ImageWithFallback, removeDash, removeLongName } from '@/utils';

import styles from '../../../Move.module.scss';

import type { IPokemon, IPokemonMoveVersion } from '@/types';

type Props = {
  pokemon?: IPokemon[];
  moveName: string;
  version: string;
  toggle: number;
};

export function Content({ pokemon, moveName, version, toggle }: Props) {
  const conditionFilter = (pmv: IPokemonMoveVersion) => {
    if (toggle === 0) {
      return (
        pmv.move_learn_method.name === `level-up` && pmv.level_learned_at > 1
      );
    } else if (toggle === 1) {
      return (
        pmv.move_learn_method.name === `machine` && pmv.level_learned_at === 0
      );
    } else if (toggle === 2) {
      return (
        pmv.move_learn_method.name === `egg` ||
        (pmv.move_learn_method.name === `level-up` &&
          pmv.level_learned_at === 1)
      );
    } else if (toggle === 3) {
      return pmv.move_learn_method.name === `tutor`;
    } else if (toggle === 4) {
      return (
        pmv.move_learn_method.name === `level-up` && pmv.level_learned_at === 0
      );
    }
  };

  return (
    <>
      <ul className={styles.list}>
        {pokemon?.map((p) =>
          p.moves.map(
            (pm) =>
              pm.move.name.includes(moveName) &&
              pm.version_group_details.map(
                (pmv) =>
                  pmv.version_group.name.includes(version) &&
                  conditionFilter(pmv) && (
                    <li key={p.name}>
                      <ImageWithFallback
                        src={p.sprites.front_default || ``}
                        alt={p.name}
                        width={96}
                        height={96}
                        fallbackSrc={`/images/other/unknown.png`}
                      />
                      <Link
                        className={styles.link}
                        href={`/pokemon/${p.name}`}
                        key={p.name}
                      >
                        {removeLongName(removeDash(p.name))}
                      </Link>
                      {pmv.level_learned_at > 1 && (
                        <p>Level {pmv.level_learned_at}</p>
                      )}
                      {pmv.level_learned_at === 1 && <p>Move relearner</p>}
                    </li>
                  ),
              ),
          ),
        )}
      </ul>
      <span className={styles.empty}>
        This move can't be learned with this method
      </span>
    </>
  );
}
