"use client"

import { useState } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import { errorToast, Loader, Separator } from '@/components';
import { useScrollDir } from '@/hooks';
import { Filters, Heading, List } from '@/modules/pokedex';
import styles from '@/modules/pokedex/Pokedex.module.scss';
import { useTypeQuery } from '@/modules/types/type';
import {
  BASE_URL,
  getMultiple,
  IOptions,
  Limit,
  QueryKeys,
  type IOptionsOffsetLimit,
} from '@/utils';

import type { IPokemon } from '@/types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function Pokedex() {
  const [filteredPokedex, setFilteredPokedex] = useState<IPokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [form, setForm] = useState<IOptionsOffsetLimit | null>(null);
  const [generation, setGeneration] = useState<IOptionsOffsetLimit | null>(
    null,
  );
  const [type, setType] = useState<IOptions | null>(null);
  const [page, setPage] = useState<number>(0);

  const { scrollBtn } = useScrollDir();


  const {
    isLoading,
    isError,
    error,
    data: pokedex,
  }: UseQueryResult<IPokemon[], Error> = useQuery({
    queryKey: [QueryKeys.POKEDEX, limit, offset],
    queryFn: () =>
      getMultiple(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`),
    keepPreviousData: true,
  });
  const {
    pokemon: pokedexWithType,
    isInitialLoading: typeIsLoading,
    isError: typeIsError,
    error: typeError,
  } = useTypeQuery(type?.value as string);

  const handlePageChange = (data: { selected: number }) => {
    window.scrollTo(0, 0);
    setPage(data.selected);
    setOffset((50 * page) % Limit.POKEMON);
  };

  if (isError && error instanceof Error) {
    errorToast(error?.message, `pokedex`);
  }

  if (typeIsError && typeError instanceof Error) {
    errorToast(typeError?.message, `type`);
  }

  if (isLoading || typeIsLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainBig">
        <Filters
          pokedex={pokedex}
          pokedexWithType={pokedexWithType}
          setFilteredPokedex={setFilteredPokedex}
          page={page}
          setPage={setPage}
          offset={offset}
          setOffset={setOffset}
          setLimit={setLimit}
          form={form}
          setForm={setForm}
          generation={generation}
          setGeneration={setGeneration}
          type={type}
          setType={setType}
        />
        <Separator />
        <p className={styles.explanation}>
          Click on a Pokémon's name to get the Pokémon info / Click on a type to
          get the type info
        </p>
        <List filteredPokedex={filteredPokedex} />
        <Separator />
        {scrollBtn()}
        {!form && !generation && !type && (
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            onPageChange={handlePageChange}
            disableInitialCallback={true}
            nextLabel=">"
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(Limit.POKEMON / 50)}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
          />
        )}
      </main>
    </>
  );
}

export default Pokedex;
