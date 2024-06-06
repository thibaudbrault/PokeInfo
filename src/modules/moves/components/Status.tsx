import { useMemo } from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { useTableParams } from '@/hooks';
import { removeDash } from '@/utils';

import styles from '../Moves.module.scss';

import type { IMove, IMoveAilment } from '@/types';

type Props = {
  status?: IMoveAilment[];
};

export function Status({ status }: Props) {
  const data = useMemo(
    () => status?.filter((s) => s.name !== `none`),
    [status],
  );

  const columns = useMemo<ColumnDef<IMoveAilment>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Status`,
        cell: (info) => (
          <td className="tBold">{removeDash(info.getValue<string>())}</td>
        ),
      },
      {
        accessorFn: (row) => row.moves,
        header: `Moves`,
        cell: (info) => (
          <td>
            <div className={styles.status}>
              {info.getValue<IMove[]>().map((i) => (
                <Link
                  key={i.id}
                  href={`/moves/${i.name}`}
                >
                  {removeDash(i.name)}
                </Link>
              ))}
            </div>
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
    <>
      <h2 className="leftH2">Status</h2>
      <section className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
      </section>
    </>
  );
}
