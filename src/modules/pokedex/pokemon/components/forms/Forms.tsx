import { useMemo } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

import { SmallLoader, errorToast } from '@/components';
import { useTableParams } from '@/hooks';
import { getPokemonForms, QueryKeys, removeDash } from '@/utils';

import type { IPokemon, IPokemonForm } from '@/types';

type Props = {
  pokemon: IPokemon;
};

export function Forms({ pokemon }: Props) {
  const {
    isLoading,
    isError,
    error,
    data: forms,
  }: UseQueryResult<IPokemonForm[], Error> = useQuery({
    queryKey: [QueryKeys.FORMS, pokemon],
    queryFn: () => getPokemonForms(pokemon),
  });

  const data = useMemo(
    () => forms?.filter((f: IPokemonForm) => f.form_name !== `unknown`),
    [forms],
  );

  const columns = useMemo<ColumnDef<IPokemonForm>[]>(
    () => [
      {
        accessorKey: `sprites.front_default`,
        id: `sprite`,
        header: `Sprite`,
        cell: (info) => (
          <td>
            <Image
              src={info.getValue<string>() || ``}
              alt="-"
              width={96}
              height={96}
            />
          </td>
        ),
      },
      {
        accessorFn: (row) => row.form_name,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">{removeDash(info.getValue<string>())}</td>
        ),
      },
      {
        accessorKey: `is_battle_only`,
        id: `battle`,
        header: `Only in battle`,
        cell: (info) => {
          if (info.getValue<boolean>()) {
            return <td>Yes</td>;
          }
          return <td>No</td>;
        },
      },
      {
        accessorKey: `is_mega`,
        id: `mega`,
        header: `Mega`,
        cell: (info) => {
          if (info.getValue<boolean>()) {
            return <td>Yes</td>;
          }
          return <td>No</td>;
        },
      },
      {
        accessorFn: (row) => row.types[0].type.name,
        id: `type1`,
        header: () => (
          <span>
            1<sup className="sup">st</sup> type
          </span>
        ),
        cell: (info) => (
          <td className="tType">
            <div className="type" id={info.getValue<string>()}>
              <Link
                href={`/types/${info.getValue()}`}
              >
                <Image
                  src={`/images/types/${info.getValue()}.png` || ``}
                  alt={`-`}
                  width={15}
                  height={15}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </div>
          </td>
        ),
      },
      {
        accessorFn: (row) => row.types.length > 1 && row.types?.[1].type.name,
        id: `type2`,
        header: () => (
          <span>
            2<sup className="sup">nd</sup> type
          </span>
        ),
        cell: (info) => (
          <td className="tType">
            <div className="type" id={info.getValue<string>()}>
              <Link
                href={`/types/${info.getValue()}`}
              >
                <Image
                  src={`/images/types/${info.getValue()}.png` || ``}
                  alt={`-`}
                  width={15}
                  height={15}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
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

  if (isError && error instanceof Error) {
    errorToast(error.message, `forms`);
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <section className="section" id="forms">
      <h3 className="h3">Forms</h3>
      <div className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
      </div>
    </section>
  );
}
