import Link from 'next/link';

import { removeDash } from '@/utils';

import type {
  IEvolutionChain,
  IPokemon,
  IPokemonSpecies,
  IPokemonStat,
} from '@/types';

interface Pokemon {
  pokemon: IPokemon;
}

interface Species {
  species: IPokemonSpecies;
}

interface Evolution {
  evolution: IEvolutionChain;
}

interface PokemonGender extends Pokemon {
  species: IPokemonSpecies;
  male: number;
  female: number;
}

const stepsFn = (species: IPokemonSpecies) => {
  return species.hatch_counter * 256;
};

export const InfoTable = [
  {
    category: `breeding`,
    desc_1: {
      title: `gender`,
      value: ({ pokemon, species, male, female }: PokemonGender) => {
        return (
          pokemon.id < 10000 &&
          (species?.gender_rate !== -1 ? (
            <p>
              {male}% male
              <br />
              {female}% female
            </p>
          ) : (
            `genderless`
          ))
        );
      },
    },
    desc_2: {
      title: `egg groups`,
      value: ({ species }: Species) => {
        return species?.egg_groups?.map((seg) => (
          <p key={seg.name}>{removeDash(seg.name)}</p>
        ));
      },
    },
    desc_3: {
      title: `egg cycles`,
      value: ({ species }: Species) => {
        return (
          <>
            <p>{species.hatch_counter} cycles</p>
            <p>{stepsFn(species)} steps</p>
          </>
        );
      },
    },
    desc_4: {
      title: `baby trigger item`,
      value: ({ evolution }: Evolution) => {
        return evolution?.baby_trigger_item
          ? removeDash(evolution?.baby_trigger_item?.name)
          : `None`;
      },
    },
    desc_5: {
      title: `habitat`,
      value: ({ species }: Species) => {
        return species?.habitat ? species.habitat.name : `Undiscovered`;
      },
    },
  },
  {
    category: `training`,
    desc_1: {
      title: `EV yield`,
      value: ({ pokemon }: Pokemon) => {
        return pokemon.stats
          .filter((ps: IPokemonStat) => ps.effort !== 0)
          .map((ps) => (
            <span key={ps.stat.name}>
              {ps?.effort}
              {` `}
              {removeDash(ps?.stat.name)}
            </span>
          ));
      },
    },
    desc_2: {
      title: `catch rate`,
      value: ({ species }: Species) => {
        return species.capture_rate;
      },
    },
    desc_3: {
      title: `base happiness`,
      value: ({ species }: Species) => {
        return species.base_happiness;
      },
    },
    desc_4: {
      title: `base XP`,
      value: ({ pokemon }: Pokemon) => {
        return pokemon.base_experience;
      },
    },
    desc_5: {
      title: `growth rate`,
      value: ({ species }: Species) => {
        return removeDash(species.growth_rate.name);
      },
    },
    desc_6: {
      title: `held items`,
      value: ({ pokemon }: Pokemon) => {
        return pokemon?.held_items?.length > 0
          ? pokemon?.held_items?.map((ph) => (
              <Link
                href={`/items/${ph.item.name}`}
                key={ph.item.name}
              >
                {removeDash(ph.item.name)}
              </Link>
            ))
          : `None`;
      },
    },
  },
  {
    category: `forms`,
    desc_1: {
      title: `alternative forms`,
      value: ({ species }: Species) => {
        return species.forms_switchable ? `Yes` : `No`;
      },
    },
    desc_2: {
      title: `varieties`,
      value: ({ species }: Species) => {
        return species.varieties.length > 1
          ? species.varieties?.map(
              (sv) =>
                sv.is_default === false && (
                  <Link
                    href={`/pokemon/${sv.pokemon.name}`}
                    key={sv.pokemon.name}
                  >
                    {removeDash(sv.pokemon.name)}
                  </Link>
                ),
            )
          : `No other forms`;
      },
    },
    desc_3: {
      title: `form description`,
      value: ({ species }: Species) => {
        return species.form_descriptions.length
          ? species.form_descriptions.find((sf) => sf.language.name === `en`)
              ?.description
          : `No other form`;
      },
    },
    desc_4: {
      title: `gender differences`,
      value: ({ species }: Species) => {
        return species.has_gender_differences ? `Yes` : `No`;
      },
    },
  },
];
