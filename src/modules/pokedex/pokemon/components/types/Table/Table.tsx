import Image from 'next/image';
import Link from 'next/link';

import { Tooltip } from '@/components';
import { capitalize } from '@/utils';
import typesRelationData from '@/utils/types.json';

import styles from '../Types.module.scss';

import type { IType } from '@/types';

type Props = {
  types: IType[];
};

type TypesRelation = {
  [key: string]: Record<string, number>;
};

export function Table({ types }: Props) {
  const typesRelation: TypesRelation = typesRelationData;
  const type1: Record<string, number> = typesRelation[types[0].name];
  const type2: boolean | Record<string, number> =
    types.length > 1 && typesRelation[types[1].name];

  const getTypeEffectiveness = (multiplier: number) => {
    if (types.length === 1) {
      return Object.entries(type1)
        .filter(([, value]) => value === multiplier)
        .map(([key]) => key);
    } else {
      const multipliedTypes: Record<string, number> = {};
      for (const key in type1) {
        if (
          Object.prototype.hasOwnProperty.call(type1, key) &&
          Object.prototype.hasOwnProperty.call(type2, key)
        ) {
          multipliedTypes[key] =
            type1[key] * (type2 as Record<string, number>)[key];
        }
      }
      return Object.entries(multipliedTypes)
        .filter(([, value]) => value === multiplier)
        .map(([key]) => key);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>0x damage from</th>
            <td>
              <div>
                {getTypeEffectiveness(0).map((type) => (
                  <Link
                    key={type}
                    data-tooltip-id="type-tooltip"
                    data-tooltip-content={capitalize(type)}
                    href={`/types/${type}`}
                  >
                    <Image
                      src={`/images/types/${type}.png`}
                      alt={type}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          {types.length > 1 && (
            <tr>
              <th>1/4x damage from</th>
              <td>
                <div>
                  {getTypeEffectiveness(0.25).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={`/types/${type}`}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
          )}
          <tr>
            <th>1/2x damage from</th>
            <td>
              <div>
                {getTypeEffectiveness(0.5).map((type) => (
                  <Link
                    key={type}
                    data-tooltip-id="type-tooltip"
                    data-tooltip-content={capitalize(type)}
                    href={`/types/${type}`}
                  >
                    <Image
                      src={`/images/types/${type}.png`}
                      alt={type}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>1x damage from</th>
            <td>
              <div>
                {getTypeEffectiveness(1).map((type) => (
                  <Link
                    key={type}
                    data-tooltip-id="type-tooltip"
                    data-tooltip-content={capitalize(type)}
                    href={`/types/${type}`}
                  >
                    <Image
                      src={`/images/types/${type}.png`}
                      alt={type}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>2x damage from</th>
            <td>
              <div>
                {getTypeEffectiveness(2).map((type) => (
                  <Link
                    key={type}
                    data-tooltip-id="type-tooltip"
                    data-tooltip-content={capitalize(type)}
                    href={`/types/${type}`}
                  >
                    <Image
                      src={`/images/types/${type}.png`}
                      alt={type}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </div>
            </td>
          </tr>
          {types.length > 1 && (
            <tr>
              <th>4x damage from</th>
              <td>
                <div>
                  {getTypeEffectiveness(4).map((type) => (
                    <Link
                      key={type}
                      data-tooltip-id="type-tooltip"
                      data-tooltip-content={capitalize(type)}
                      href={`/types/${type}`}
                    >
                      <Image
                        src={`/images/types/${type}.png`}
                        alt={type}
                        width={32}
                        height={32}
                      />
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Tooltip id="type-tooltip" />
    </>
  );
}
