import Link from 'next/link';

import styles from '@/modules/locations/Locations.module.scss';
import { capitalize, removeDash } from '@/utils';

import type { IRegion } from '@/types';

type Props = {
  location: string | null;
  locations?: IRegion[];
};

export function List({ location, locations }: Props) {
  return (
    <section>
      {locations?.map(
        (l) =>
          l.name === location && (
            <>
              <ul className={styles.list} key={l.name}>
                {l.locations
                  .sort((a, b) => a.name.localeCompare(b.name))
                  ?.map((ll) => (
                    <li key={ll.name}>
                      <Link
                        href={`/locations/${ll.name}`}
                        key={ll.name}
                      >
                        {removeDash(ll.name).replace(
                          /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
                          ``,
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
              <span className={styles.placeholder}>
                No data for {capitalize(location)}
              </span>
            </>
          ),
      )}
    </section>
  );
}
