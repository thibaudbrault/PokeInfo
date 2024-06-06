import { useMemo } from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

import { usePaginatedTableParams, useScrollDir } from '@/hooks';
import { Limit, removeDash } from '@/utils';

import { useMovesQuery } from '../hooks';
import styles from '../Moves.module.scss';
import { Search } from './Search';

import type { IMove } from '@/types';

export function Moves() {
  const { moves, setOffset } = useMovesQuery();
  const data = useMemo(() => moves, [moves]);
  const { scrollBtn } = useScrollDir();

  const columns = useMemo<ColumnDef<IMove>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `name`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              id={info.getValue<string>()}
              href={`/moves/${info.getValue()}`}
            >
              {removeDash(info.getValue<string>()).replaceAll(`--`, `-`)}
            </Link>
          </td>
        ),
      },
      {
        accessorKey: `type.name`,
        id: `type`,
        header: `Type`,
        cell: (info) => (
          <td className="tType">
            <Link
              href={`/types/${info.getValue()}`}
            >
              <Image
                src={`/images/types/${info.getValue<string>()}.png`}
                alt={info.getValue<string>()}
                width={32}
                height={32}
                style={{ cursor: `pointer` }}
              />
            </Link>
          </td>
        ),
      },
      {
        accessorKey: `damage_class.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <td className="tCategory" id={info.getValue<string>()}>
            <div>
              <Image
                alt={info.getValue<string>()}
                width={20}
                height={20}
                src={`/images/status/move-${info.getValue()}.png`}
              />
              <span>{info.getValue<string>()}</span>
            </div>
          </td>
        ),
      },
      {
        accessorKey: `power`,
        id: `power`,
        header: `Power`,
        cell: (info) => <td>{info.getValue<number>() ?? `-`}</td>,
      },
      {
        accessorKey: `pp`,
        id: `pp`,
        header: `PP`,
        cell: (info) => <td>{info.getValue<number>() ?? `-`}</td>,
      },
      {
        accessorKey: `accuracy`,
        id: `accuracy`,
        header: `Accuracy`,
        cell: (info) => <td>{info.getValue<number>() ?? `-`}</td>,
      },
      {
        accessorFn: (row) =>
          row.flavor_text_entries.find((rf) => {
            return rf.language.name === `en` && rf.flavor_text !== `Dummy Data`;
          })?.flavor_text || `-`,
        id: `effect`,
        header: `Effect`,
        cell: (info) => <td className="tEffect">{info.getValue<string>()}</td>,
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns, setOffset, Limit.MOVES.INDEX);

  return (
    <section>
      <div className={styles.search}>
        <h2 className="leftH2">Moves</h2>
        <Search moves={moves} />
      </div>
      <div className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
      </div>
      {tablePagination()}
      {scrollBtn()}
    </section>
  );
}
