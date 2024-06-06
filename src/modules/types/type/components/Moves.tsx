import { useMemo } from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { useTableParams } from '@/hooks';
import styles from '@/modules/types/type/Type.module.scss';
import { removeDash } from '@/utils';

import type { IMove, IType } from '@/types';

type Props = {
  type?: IType;
  moves?: IMove[];
};

export function Moves({ type, moves }: Props) {
  const data = useMemo(() => (moves ? moves : []), [moves]);

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <td className={styles.name}>
            <Link
              href={`/moves/${info.getValue()}`}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </td>
        ),
      },
      {
        accessorKey: `damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <td className={styles.data}>{info.getValue<string>()}</td>
        ),
      },
      {
        accessorKey: `power`,
        id: `power`,
        header: `Power`,
        cell: (info) => (
          <td className={styles.data}>{info.getValue<string>() || `-`}</td>
        ),
      },
      {
        accessorKey: `pp`,
        id: `pp`,
        header: `PP`,
        cell: (info) => (
          <td className={styles.data}>{info.getValue<string>()}</td>
        ),
      },
      {
        accessorKey: `accuracy`,
        id: `accuracy`,
        header: `Accuracy`,
        cell: (info) => (
          <td className={styles.data}>{info.getValue<string>() || `-`}</td>
        ),
      },
      {
        accessorKey: `meta.ailment.name`,
        id: `status`,
        header: `Status`,
        cell: (info) => (
          <td className={styles.data}>
            {info.getValue<string>() !== `none` || !info.getValue<string>()
              ? info.getValue<string>()
              : `-`}
          </td>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <section className="section">
      <h3 className="h3">Moves</h3>
      <div className={styles.container}>
        <h4 className={styles.subtitle}>
          {data.length} moves are{` `}
          <span className="capitalize">{type?.name}</span> type
        </h4>
      </div>
      <div className="tableContainer" ref={tableContainerRef}>
        {data.length > 0 && (
          <table className="fullWidthTable">
            {tableHeader()}
            {tableBody()}
          </table>
        )}
      </div>
      {type?.name !== `fairy` && (
        <p className={styles.comment}>
          <span className="capitalize">{type?.name}</span> attacks were{` `}
          <span className="capitalize">{type?.move_damage_class?.name}</span>
          {` `}
          before Gen IV
        </p>
      )}
    </section>
  );
}
