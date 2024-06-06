import { useState } from 'react';

import * as Label from '@radix-ui/react-label';
import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';

import { Input } from '@/components';
import { ImageWithFallback, capitalize, removeDash } from '@/utils';

import type { IMove } from '@/types';

type Props = {
  moves?: IMove[];
};

export function Search({ moves }: Props) {
  const [searchRes, setSearchRes] = useState<FuseResult<IMove>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchMoves = (text: string) => {
    if (moves) {
      const fuse = new Fuse(moves, {
        keys: [`name`],
        includeMatches: true,
      });
      setSearchText(text);
      setSearchRes(fuse.search(text).slice(0, 5));
    }
  };

  return (
    <div className="search">
      <Label.Root htmlFor="search">Search</Label.Root>
      <Input
        type="text"
        placeholder="Move Name"
        onChange={(e) => searchMoves(e.target.value)}
      />
      {searchText && (
        <div className="searchContainer">
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${res.item.type.name}.png`}
                    alt=""
                    width={32}
                    height={32}
                    fallbackSrc={`/images/other/unknown.png`}
                  />
                  <Link
                    href={`/moves/${res.item.name}`}
                    className="searchLink bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </Link>
                  <span className="searchId">
                    {capitalize(res.item.type.name)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
