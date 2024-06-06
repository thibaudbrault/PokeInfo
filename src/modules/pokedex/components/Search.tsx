import { useState } from 'react';

import * as Label from '@radix-ui/react-label';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';

import { Input } from '@/components';
import {
  BASE_URL,
  ImageWithFallback,
  QueryKeys,
  getPokedexResults,
  removeDash,
  removeLongName,
} from '@/utils';

import styles from '../Pokedex.module.scss';

import type { INamedApiResource } from '@/types';

type Props = {
  onGrid?: boolean;
};

export function Search({ onGrid }: Props) {
  const { data: pokedex }: UseQueryResult<INamedApiResource[]> = useQuery({
    queryKey: [QueryKeys.SEARCH],
    queryFn: getPokedexResults,
  });

  const [searchRes, setSearchRes] = useState<FuseResult<INamedApiResource>[]>(
    [],
  );

  const searchPokedex = (text: string) => {
    if (pokedex) {
      const fuse = new Fuse(pokedex, {
        keys: [`name`],
        includeMatches: true,
      });
      setSearchRes(fuse.search(text).slice(0, 5));
    }
  };

  return (
    <div className={onGrid ? `${styles.search} search` : `search`}>
      <Label.Root htmlFor="search">Search</Label.Root>
      <Input
        type="text"
        id="search"
        placeholder="Pokémon Name"
        onChange={(e) => searchPokedex(e.target.value)}
      />
      {searchRes.length > 0 && (
        <div className="searchContainer">
          <ul>
            {searchRes?.map((res) => (
              <li key={res.item.name}>
                <Link
                  href={`/pokemon/${res.item.name}`}
                  className="searchLink"
                >
                  <ImageWithFallback
                    src={
                      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.item.url
                        .replace(`${BASE_URL}/pokemon/`, ``)
                        .slice(0, -1)}.png` || ``
                    }
                    alt=""
                    width={48}
                    height={48}
                    fallbackSrc={`/images/other/unknown.png`}
                  />
                  <p className="capitalize">
                    {removeLongName(removeDash(res.item.name))}
                  </p>
                  <span className="searchId">
                    {res.item.url
                      .replace(`${BASE_URL}/pokemon/`, ``)
                      .slice(0, -1)
                      .padStart(3, `0`)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
