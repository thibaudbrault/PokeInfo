"use client"

import { useMemo, useState } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { errorToast, Loader } from '@/components';
import { usePaginatedTableParams, useScrollDir } from '@/hooks';
import { Heading, Search } from '@/modules/abilities';
import moves from '@/modules/moves/Moves.module.scss';
import { BASE_URL, getMultiple, Limit, QueryKeys, removeDash } from '@/utils';

import type { IAbility } from '@/types';

function AbilitiesPage() {
  const limit = 50;
  const [offset, setOffset] = useState(0);

  const {
    isLoading,
    isError,
    error,
    data: abilities,
  }: UseQueryResult<IAbility[], Error> = useQuery({
    queryKey: [QueryKeys.ABILITIES, limit, offset],
    queryFn: () =>
      getMultiple(`${BASE_URL}/ability?limit=${limit}&offset=${offset}`),
    keepPreviousData: true,
  });

  const data = useMemo(() => abilities, [abilities]);
  const { scrollBtn } = useScrollDir();

  const columns = useMemo<ColumnDef<IAbility>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `name`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">
            <Link
              className="tLink"
              href={`/abilities/${info.getValue()}`}
            >
              {removeDash(info.getValue<string>())}
            </Link>
          </td>
        ),
      },
      {
        accessorFn: (row) =>
          row.flavor_text_entries.find((rf) => {
            return rf.language.name === `en`;
          })?.flavor_text || `-`,
        id: `effect`,
        header: `Effect`,
        cell: (info) => (
          <td className="tEffect">
            <span>{info.getValue<string>()}</span>
          </td>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns, setOffset, Limit.ABILITIES);

  if (isError && error instanceof Error) {
    errorToast(error.message, `abilities`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainBig">
        <div className={moves.search}>
          <h2 className="leftH2">Abilities</h2>
          <Search abilities={abilities} />
        </div>
        <section className="tableContainer" ref={tableContainerRef}>
          <table className="fullWidthTable">
            {tableHeader()}
            {tableBody()}
          </table>
        </section>
        {tablePagination()}
        {scrollBtn()}
      </main>
    </>
  );
}

export default AbilitiesPage;
