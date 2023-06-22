import { Type } from '@/components/common/styles/Themes';
import { IPokemon, IPokemonSpecies } from '@/types';
import { removeDash } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
  PokemonDataDesc,
  PokemonDataOldTypes,
  PokemonDataTypes,
} from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string | null;
};

export function Description({ pokemon, species, game }: Props) {
  const filterDesc =
    species?.flavor_text_entries &&
    game &&
    species?.flavor_text_entries.find(
      (sf) => sf.language.name === `en` && sf.version.name === game,
    );

  return (
    <>
      <ul>
        {pokemon.id < 10000 && (
          <PokemonDataDesc>
            <span>
              {filterDesc && filterDesc?.flavor_text ? (
                filterDesc?.flavor_text
                  .replace(`\u000c`, ` `)
                  .replace(`POKéMON`, `Pokémon`)
              ) : (
                <span className="bold">
                  There is no description for this Pokémon
                </span>
              )}
            </span>
            <p>
              Pokémon{` `}
              <span className="capitalize">
                <i>{game && removeDash(game)}</i>
              </span>
            </p>
          </PokemonDataDesc>
        )}
        <PokemonDataTypes>
          {pokemon?.types?.map((pt) => (
            <Type id={pt.type.name} key={pt.type.name}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: pt.type.name },
                }}
              >
                <Image
                  src={`/images/types/${pt.type.name}.png`}
                  alt={pt.type.name}
                  width={25}
                  height={25}
                />
                <span>{pt.type.name}</span>
              </Link>
            </Type>
          ))}
        </PokemonDataTypes>
        <PokemonDataOldTypes>
          {pokemon.past_types.map((pp) => (
            <p key={pp.generation.name}>
              Up to <span>{removeDash(pp.generation.name)}</span> (included) :
              was{` `}
              {pp.types.map((ppt) => (
                <span key={ppt.type.name}>{ppt.type.name}</span>
              ))}
            </p>
          ))}
        </PokemonDataOldTypes>
      </ul>
    </>
  );
}
