import Link from 'next/link';

import type { IPokemon } from '@/types';

type Props = {
  p: IPokemon;
};

export function Types({ p }: Props) {
  return (
    <>
      {p.types?.map((pt) => (
        <div key={pt.type.name} className="type" id={pt.type.name}>
          <Link
            href={`/types/${pt.type.name}`}
          >
            <span>{pt.type.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}
