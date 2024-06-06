import Image from 'next/image';
import Link from 'next/link';

import styles from '../Types.module.scss';

import type { IType } from '@/types';

type Props = {
  types?: IType[];
};

export function List({ types }: Props) {
  return (
    <>
      {types?.map((t: IType) => (
        <li key={t.name}>
          <div className={`${styles.type} type`} id={t.name}>
            <Link
              href={`/types/${t?.name}`}
              key={t.name}
            >
              <Image
                src={`/images/types/${t.name}.png`}
                alt={t.name}
                width={50}
                height={50}
              />
              <h2>{t.name}</h2>
            </Link>
          </div>
        </li>
      ))}
    </>
  );
}
