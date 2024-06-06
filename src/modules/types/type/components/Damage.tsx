import Image from 'next/image';
import Link from 'next/link';

import { Tooltip } from '@/components';
import moves from '@/modules/moves/move/components/data/Data.module.scss';
import styles from '@/modules/types/type/Type.module.scss';
import { capitalize, removeDash } from '@/utils';
import typesRelationData from '@/utils/types.json';

import type { IType } from '@/types';

type Props = {
  type?: IType;
};

type TypesRelation = {
  [key: string]: Record<string, number>;
};

export function Damage({ type }: Props) {
  const typesRelation: TypesRelation = typesRelationData;
  const name = type?.name || ``;
  const typeEffectiveness: Record<string, number> = typesRelation[name];

  const getTypeEffectiveness = (multiplier: number) => {
    return Object.entries(typeEffectiveness)
      .filter(([, value]) => value === multiplier)
      .map(([key]) => key);
  };

  const getTypeWeaknessess = (multiplier: number) => {
    const typeData: { key: string; value: number }[] = [];
    for (const [key, objValue] of Object.entries(typesRelation)) {
      const value = objValue[name];
      if (typeof value === `number`) {
        typeData.push({
          key,
          value,
        });
      }
    }
    return typeData
      .filter((type) => type.value === multiplier)
      .map((filteredType) => filteredType.key);
  };

  return (
    <>
      <section className={styles.section}>
        <table className={moves.table}>
          <tbody>
            <tr>
              <th>Generation</th>
              <td>{type && removeDash(type?.generation.name)}</td>
            </tr>
            <tr>
              <th>Damage class</th>
              <td>
                <span className="capitalize">
                  {type?.move_damage_class.name}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Deals 0X damage to</th>
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
            <tr>
              <th>Deals 1/2X damage to</th>
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
              <th>Deals 1X damage to</th>
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
              <th>Deals 2X damage to</th>
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
            <tr>
              <th>Takes 0X damage from</th>
              <td>
                <div>
                  {getTypeWeaknessess(0).map((type) => (
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
              <th>Takes 1/2X damage from</th>
              <td>
                <div>
                  {getTypeWeaknessess(0.5).map((type) => (
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
              <th>Takes 1X damage from</th>
              <td>
                <div>
                  {getTypeWeaknessess(1).map((type) => (
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
              <th>Takes 2X damage from</th>
              <td>
                <div>
                  {getTypeWeaknessess(2).map((type) => (
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
          </tbody>
        </table>
      </section>
      <Tooltip id="type-tooltip" />
    </>
  );
}
