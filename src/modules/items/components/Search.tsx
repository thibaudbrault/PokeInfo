import { useState } from 'react';

import * as Label from '@radix-ui/react-label';
import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';

import { Input } from '@/components';
import { ImageWithFallback, capitalize, removeDash } from '@/utils';

import type { IItem } from '@/types';

type Props = {
  items?: IItem[];
};

export function Search({ items }: Props) {
  const [searchRes, setSearchRes] = useState<FuseResult<IItem>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchItems = (text: string) => {
    if (items) {
      const fuse = new Fuse(items, {
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
        placeholder="Item Name"
        onChange={(e) => searchItems(e.target.value)}
      />
      {searchText && (
        <div className="searchContainer">
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={res.item.sprites.default || ``}
                    alt=""
                    width={32}
                    height={32}
                    fallbackSrc={`/images/other/unknown.png`}
                  />
                  <Link
                    href={`/items/${res.item.name}`}
                    className="searchLink bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </Link>
                  <span className="searchId">
                    {capitalize(removeDash(res.item.category.name))}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
