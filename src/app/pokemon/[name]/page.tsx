"use client"

import { useEffect, useRef, useState } from 'react';

import { FaChevronLeft } from '@meronex/icons/fa';
import { HiOutlineSpeakerphone } from '@meronex/icons/hi';
import Link from 'next/link';

import { Button, Loader, Separator, errorToast } from '@/components';
import {
  Cards,
  Competitive,
  Content,
  Data,
  Evolution,
  Forms,
  Heading,
  Info,
  Locations,
  Moves,
  Nav,
  Sprites,
  Stats,
  Types,
  useFetchPokemon,
} from '@/modules/pokedex/pokemon';
import styles from '@/modules/pokedex/pokemon/Pokemon.module.scss';
import { IFlavorText } from '@/types';
import { pokemonFilters, removeDash, removeLongName } from '@/utils';
import { useParams } from 'next/navigation';

function PokemonCard() {
  const [game, setGame] = useState<string>(``);
  const [version, setVersion] = useState<string>(``);
  const [format, setFormat] = useState<string>(``);

  const params = useParams();
  const name = params.name as string;

  const { pokemonId, pokemon, species, types, location, evolution, cards } =
    useFetchPokemon(name);

  // Modify game and version according to the id of the pokemon
  const pokemonFiltersFn = () => {
    pokemonId &&
      pokemonFilters.filter((p) => {
        pokemonId > p.min &&
          pokemonId < p.max &&
          (setGame(p.game), setVersion(p.version), setFormat(p.format));
      });
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.error(`Error playing audio`);
    }
  };

  useEffect(() => {
    pokemonFiltersFn();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId]);

  if (
    pokemon.status === `error` ||
    types.status === `error` ||
    location.status === `error`
  ) {
    errorToast(undefined, `pokemon`);
  }

  if (
    pokemon.status === `loading` ||
    types.status === `loading` ||
    location.status === `loading` ||
    (species.status === `loading` && species.isInitialLoading) ||
    (evolution.status === `loading` && evolution.isInitialLoading)
  ) {
    return <Loader />;
  }

  const getSeoDesc = () => {
    if (species.data) {
      const flavorText = species?.data.flavor_text_entries.find(
        (sf: IFlavorText) => sf.language.name === `en`,
      );
      const desc = flavorText.flavor_text;
      return desc;
    } else {
      return `Find every details about ${name}`;
    }
  };

  return (
    <>
      <Heading name={name} description={getSeoDesc()} />
      <main className="mainBig">
        <section className={styles.section}>
          <div className={styles.name}>
            {pokemon.data?.name?.includes(`mega`) ? (
              <h2 className="title">
                {removeDash(pokemon.data?.name)
                  .split(` `)
                  .reverse()
                  .join(` `)}
              </h2>
            ) : (
              <h2 className="title">{removeLongName(removeDash(name))}</h2>
            )}
            {pokemon.data?.id < 722 && (
              <div>
                <button onClick={play}>
                  <HiOutlineSpeakerphone />
                </button>
                <audio
                  ref={audioRef}
                  src={`https://raw.githubusercontent.com/thibaudbrault/pokeref_medias/main/cries/${pokemon.data?.id}.ogg`}
                />
              </div>
            )}
          </div>
          {species.data && (
            <h4 className="subtitle">
              {removeDash(species.data?.generation?.name)}
            </h4>
          )}
        </section>

        <Nav
          pokemonId={pokemon.data?.id}
          game={game}
          setGame={setGame}
          setVersion={setVersion}
          setFormat={setFormat}
        />

        <Content hasForm={pokemon.data.forms.length > 1} />

        <Data pokemon={pokemon.data} species={species.data} game={game} />

        <Separator />

        {evolution.data && <Evolution evolution={evolution.data} name={name} />}

        <Separator />

        {pokemonId && pokemonId < 10000 && (
          <Info
            pokemon={pokemon.data}
            species={species.data}
            evolution={evolution.data}
          />
        )}

        <Separator />

        <Stats pokemon={pokemon.data} />

        <Separator />

        {types.data && (
          <>
            <Types types={types.data} />
            <Separator />
          </>
        )}

        {version && (
          <>
            <Moves pokemon={pokemon.data} version={version} name={name} />
            <Separator />
          </>
        )}

        {game && (
          <>
            <Locations location={location.data} game={game} />
            <Separator />
          </>
        )}

        {pokemon.data.forms.length > 1 && (
          <>
            <Forms pokemon={pokemon.data} />
            <Separator />
          </>
        )}

        {format && (
          <>
            <Competitive format={format} name={name} />
            <Separator />
          </>
        )}

        <Sprites pokemon={pokemon.data} />

        <Separator />

        {cards.data && <Cards cards={cards.data} />}

        <Button intent="back" size="fit" asChild>
          <Link href="/">
            <FaChevronLeft />
            Back to Pokédex
          </Link>
        </Button>
      </main>
    </>
  );
}

export default PokemonCard;
