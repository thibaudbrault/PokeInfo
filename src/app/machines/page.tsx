"use client"

import { useMemo, useState } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { errorToast, GenNav, Loader } from '@/components';
import { useTableParams } from '@/hooks';
import { Heading } from '@/modules/machines';
import {
  BASE_URL,
  getMultiple,
  QueryKeys,
  removeDash,
  uppercase,
} from '@/utils';

import type { IMachine } from '@/types';

function MachinesPage() {
  const [version, setVersion] = useState<string | null>(`red-blue`);
  const [game, setGame] = useState<string>(`red`);
  const {
    isLoading,
    isError,
    error,
    data: machines,
  }: UseQueryResult<IMachine[], Error> = useQuery({
    queryKey: [QueryKeys.MACHINES],
    queryFn: () => getMultiple(`${BASE_URL}/machine?limit=1700`),
  });

  const data = useMemo(
    () => machines?.filter((m) => m.version_group.name === version),
    [version, machines],
  );

  const columns = useMemo<ColumnDef<IMachine>[]>(
    () => [
      {
        accessorKey: `item.name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">{uppercase(info.getValue<string>())}</td>
        ),
      },
      {
        accessorKey: `move.name`,
        id: `move`,
        header: `Move`,
        cell: (info) => (
          <td>
            <Link
              className="tLink"
              href={`/moves/${info.getValue()}`}
            >
              {removeDash(info.getValue<string>())}
            </Link>
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

  if (isError && error instanceof Error) {
    errorToast(error.message, `machines`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainBig">
        <h2 className="leftH2">Machines</h2>
        <h4 className="leftSubtitle">
          Game selected: <span className="bold">{game}</span>
        </h4>
        <GenNav game={game} setGame={setGame} setVersion={setVersion} />
        <section className="tableContainer" ref={tableContainerRef}>
          <table className="fullWidthTable">
            {tableHeader()}
            {tableBody()}
            <tfoot>
              <tr>
                <td colSpan={2}>There is no data for this game</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </main>
    </>
  );
}

export default MachinesPage;
