import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Select, { type SingleValue } from 'react-select';

import { useMediaQuery } from '@/hooks';
import { IOptions, genNav } from '@/utils';

import styles from '../../Pokemon.module.scss';

type Props = {
  pokemonId: number;
  game: string;
  setGame: Dispatch<SetStateAction<string>>;
  setVersion: Dispatch<SetStateAction<string>>;
  setFormat: Dispatch<SetStateAction<string>>;
};

export function Nav({
  game,
  pokemonId,
  setGame,
  setVersion,
  setFormat,
}: Props) {
  const [selected, setSelected] = useState<IOptions | null>(null);
  const isBreakpoint = useMediaQuery(890);

  const getOptionsForGame = (game: string) => {
    for (const gen of genNav) {
      for (const option of gen.options) {
        if (option.label === game) {
          return option;
        }
      }
    }
    return null;
  };

  const handleSelect = (option: SingleValue<IOptions>) => {
    if (option) {
      const format = genNav.find((gen) =>
        gen.options.some((opt) => opt === option),
      );
      setSelected(option);
      setGame(option.label);
      setVersion(option.value);
      if (format) {
        setFormat(format?.value);
      }
    }
  };

  useEffect(() => {
    const options = getOptionsForGame(game);
    setSelected(options);
  }, []);

  return isBreakpoint ? (
    <section className={styles.section}>
      <Select
        key={selected?.value}
        name="generation"
        id="generation"
        value={selected}
        className="dropdown"
        classNamePrefix="select"
        options={genNav.filter((gen) => gen.limit > pokemonId)}
        placeholder="Select"
        onChange={(option) => {
          handleSelect(option);
        }}
      />
    </section>
  ) : (
    <NavigationMenu.Root className="NavigationMenuRoot" id="generations">
      <NavigationMenu.List className="NavigationMenuList">
        {(pokemonId < 152 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen I
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`red`);
                  setVersion(`red-blue`);
                  setFormat(`gen1`);
                }}
              >
                Red
              </button>
              <button
                onClick={() => {
                  setGame(`blue`);
                  setVersion(`red-blue`);
                  setFormat(`gen1`);
                }}
              >
                Blue
              </button>
              <button
                onClick={() => {
                  setGame(`yellow`);
                  setVersion(`yellow`);
                  setFormat(`gen1`);
                }}
              >
                Yellow
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 252 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen II
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`gold`);
                  setVersion(`gold-silver`);
                  setFormat(`gen2`);
                }}
              >
                Gold
              </button>
              <button
                onClick={() => {
                  setGame(`silver`);
                  setVersion(`gold-silver`);
                  setFormat(`gen2`);
                }}
              >
                Silver
              </button>
              <button
                onClick={() => {
                  setGame(`crystal`);
                  setVersion(`crystal`);
                  setFormat(`gen2`);
                }}
              >
                Crystal
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 387 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen III
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`ruby`);
                  setVersion(`ruby-sapphire`);
                  setFormat(`gen3`);
                }}
              >
                Ruby
              </button>
              <button
                onClick={() => {
                  setGame(`sapphire`);
                  setVersion(`ruby-sapphire`);
                  setFormat(`gen3`);
                }}
              >
                Sapphire
              </button>
              <button
                onClick={() => {
                  setGame(`emerald`);
                  setVersion(`emerald`);
                  setFormat(`gen3`);
                }}
              >
                Emerald
              </button>
              <button
                onClick={() => {
                  setGame(`firered`);
                  setVersion(`firered-leafgreen`);
                  setFormat(`gen3`);
                }}
              >
                Fire Red
              </button>
              <button
                onClick={() => {
                  setGame(`leafgreen`);
                  setVersion(`firered-leafgreen`);
                  setFormat(`gen3`);
                }}
              >
                Leaf Green
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 494 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen IV
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`diamond`);
                  setVersion(`diamond-pearl`);
                  setFormat(`gen4`);
                }}
              >
                Diamond
              </button>
              <button
                onClick={() => {
                  setGame(`pearl`);
                  setVersion(`diamond-pearl`);
                  setFormat(`gen4`);
                }}
              >
                Pearl
              </button>
              <button
                onClick={() => {
                  setGame(`platinum`);
                  setVersion(`platinum`);
                  setFormat(`gen4`);
                }}
              >
                Platinum
              </button>
              <button
                onClick={() => {
                  setGame(`heartgold`);
                  setVersion(`heartgold-soulsilver`);
                  setFormat(`gen4`);
                }}
              >
                Heart Gold
              </button>
              <button
                onClick={() => {
                  setGame(`soulsilver`);
                  setVersion(`heartgold-soulsilver`);
                  setFormat(`gen4`);
                }}
              >
                Soul Silver
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 650 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen V
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`black`);
                  setVersion(`black-white`);
                  setFormat(`gen5`);
                }}
              >
                Black
              </button>
              <button
                onClick={() => {
                  setGame(`white`);
                  setVersion(`black-white`);
                  setFormat(`gen5`);
                }}
              >
                White
              </button>
              <button
                onClick={() => {
                  setGame(`black-2`);
                  setVersion(`black-2-white-2`);
                  setFormat(`gen5`);
                }}
              >
                Black 2
              </button>
              <button
                onClick={() => {
                  setGame(`white-2`);
                  setVersion(`black-2-white-2`);
                  setFormat(`gen5`);
                }}
              >
                White 2
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 722 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen VI
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`x`);
                  setVersion(`x-y`);
                  setFormat(`gen6`);
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  setGame(`y`);
                  setVersion(`x-y`);
                  setFormat(`gen6`);
                }}
              >
                Y
              </button>
              <button
                onClick={() => {
                  setGame(`omega-ruby`);
                  setVersion(`omega-ruby-alpha-sapphire`);
                  setFormat(`gen6`);
                }}
              >
                Omega Ruby
              </button>
              <button
                onClick={() => {
                  setGame(`alpha-sapphire`);
                  setVersion(`omega-ruby-alpha-sapphire`);
                  setFormat(`gen6`);
                }}
              >
                Alpha Sapphire
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 810 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen VII
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`sun`);
                  setVersion(`sun-moon`);
                  setFormat(`gen7`);
                }}
              >
                Sun
              </button>
              <button
                onClick={() => {
                  setGame(`moon`);
                  setVersion(`sun-moon`);
                  setFormat(`gen7`);
                }}
              >
                Moon
              </button>
              <button
                onClick={() => {
                  setGame(`ultra-sun`);
                  setVersion(`ultra-sun-ultra-moon`);
                  setFormat(`gen7`);
                }}
              >
                Ultra Sun
              </button>
              <button
                onClick={() => {
                  setGame(`ultra-moon`);
                  setVersion(`ultra-sun-ultra-moon`);
                  setFormat(`gen7`);
                }}
              >
                Ultra Moon
              </button>
              <button
                onClick={() => {
                  setGame(`lets-go-pikachu`);
                  setVersion(`lets-go-pikachu-lets-go-eevee`);
                  setFormat(`gen7`);
                }}
              >
                Let's Go Pikachu
              </button>
              <button
                onClick={() => {
                  setGame(`lets-go-eevee`);
                  setVersion(`lets-go-pikachu-lets-go-eevee`);
                  setFormat(`gen7`);
                }}
              >
                Let's Go Eevee
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 905 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen VIII
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              {pokemonId < 898 && (
                <>
                  <button
                    onClick={() => {
                      setGame(`sword`);
                      setVersion(`sword-shield`);
                      setFormat(`gen8`);
                    }}
                  >
                    Sword
                  </button>
                  <button
                    onClick={() => {
                      setGame(`shield`);
                      setVersion(`sword-shield`);
                      setFormat(`gen8`);
                    }}
                  >
                    Shield
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  setGame(`legends-arceus`);
                  setVersion(`legends-arceus`);
                  setFormat(`gen8`);
                }}
              >
                Legends Arceus
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(pokemonId < 1018 || pokemonId > 10000) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen IX
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button
                onClick={() => {
                  setGame(`scarlet`);
                  setVersion(`scarlet-violet`);
                  setFormat(`gen9`);
                }}
              >
                Scarlet
              </button>
              <button
                onClick={() => {
                  setGame(`violet`);
                  setVersion(`scarlet-violet`);
                  setFormat(`gen9`);
                }}
              >
                Violet
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
}
