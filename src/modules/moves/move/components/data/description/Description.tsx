import Image from 'next/image';
import Link from 'next/link';

import styles from '../Data.module.scss';

import type { IMachine, IMove } from '@/types';

type Props = {
  move: IMove;
  version: string;
  machine?: IMachine[];
};

export function Description({ move, version, machine }: Props) {
  // Calculate the max number of pp for a move
  const maxPp = move.pp * 1.6;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>Type</th>
          <td className={styles.type}>
            <div className="type" id={move?.type?.name}>
              <Link
                href={`/types/${move.type.name}`}
                key={move?.type?.name}
              >
                <Image
                  src={`/images/types/${move?.type?.name}.png`}
                  alt={move?.type?.name}
                  width={20}
                  height={20}
                />
                <span>{move?.type?.name}</span>
              </Link>
            </div>
          </td>
        </tr>
        <tr>
          <th>Category</th>
          <td className={styles.category} id={move.damage_class.name}>
            <div>
              <Image
                src={`/images/status/move-${move.damage_class.name}.png`}
                alt={move.damage_class.name}
                width={35}
                height={35}
              />
              <span>{move.damage_class.name}</span>
            </div>
          </td>
        </tr>
        {machine?.map(
          (ma) =>
            ma.version_group.name === version && (
              <tr key={ma.move.name}>
                <th>Machine</th>
                <td>
                  <span>{ma.item.name.toUpperCase()}</span>
                </td>
              </tr>
            ),
        )}
        <tr>
          <th>Power</th>
          <td>{move.power !== null ? move.power : `-`}</td>
        </tr>
        <tr>
          <th>PP</th>
          <td>
            {move.pp} <small className="small">(max. {maxPp})</small>
          </td>
        </tr>
        <tr>
          <th>Accuracy</th>
          <td>{move.accuracy !== null ? move.accuracy : `-`}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{move.meta.ailment.name.replace(`none`, `-`)}</td>
        </tr>
        <tr>
          <th>Priority</th>
          <td>{move.priority}</td>
        </tr>
      </tbody>
    </table>
  );
}
