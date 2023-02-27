import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import Base from './Base/Base.PokemonCard';
import Desc from './Desc/Desc.PokemonCard';
import Sprite from './Sprite/Sprite.PokemonCard';
import {
  PokemonDataSection,
  PokemonDataSprite,
} from './Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string | null;
};

function Data({ pokemon, species, game }: Props) {
  return (
    <PokemonDataSection>
      <div>
        <Desc species={species} pokemon={pokemon} game={game} />
        <Base species={species} pokemon={pokemon} />
      </div>
      <PokemonDataSprite>
        <Sprite species={species} pokemon={pokemon} />
      </PokemonDataSprite>
    </PokemonDataSection>
  );
}

export default Data;
