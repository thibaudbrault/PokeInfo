import { useState } from 'react';

import * as Label from '@radix-ui/react-label';
import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';

import { Input } from '@/components';
import { capitalize, removeDash } from '@/utils';

import type { IAbility } from '@/types';

type Props = {
  abilities?: IAbility[];
};

export function Search({ abilities }: Props) {
  const [searchRes, setSearchRes] = useState<FuseResult<IAbility>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchAbilities = (text: string) => {
    if (abilities) {
      const fuse = new Fuse(abilities, {
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
        placeholder="Ability Name"
        onChange={(e) => searchAbilities(e.target.value)}
      />
      {searchText && (
        <div className="searchContainer">
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <Link
                    href={`/abilities/${res.item.name}`}
                    className="searchLink bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </Link>
                  <span className="searchId">
                    {res.item.pokemon.length} Pokémon
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
