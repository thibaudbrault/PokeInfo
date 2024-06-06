import { ReactNode } from 'react';
import '@/styles/styles.scss';
import Providers from './providers';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="theme-color" content="#c4c4c4" />
            <meta
            name="keywords"
            content="pokemon, Pokémon, stats, pokedex, Pokédex, pokeref, Pokeref, PokeRef, PokéRef, pokéref, Pokéref, database, pokeapi, moves, abilities, evolutions, locations, Pokestats, Pokémon, Pocket Monsters, Pokémon Red, Pokémon Blue, Pokémon Yellow, Pokémon Gold, Pokémon Silver, Pokémon Crystal, Pokémon Ruby, Pokémon Sapphire, Pokémon FireRed, Pokémon LeafGreen, Pokémon Emerald, Pokémon Diamond, Pokémon Pearl, Pokémon Platinum, Pokémon HeartGold, Pokémon SoulSilver, Pokémon Black, Pokémon White, Pokémon Black 2, Pokémon White 2, Pokémon X, Pokémon Y, Pokémon Omega Ruby, Pokémon Alpha Sapphire, Pokémon Sun, Pokémon Moon, Pokémon Ultra Sun, Pokémon Ultra Moon, Pokémon GO, Pokémon Let's Go Pikachu, Pokémon Let's Go Eevee, Pokémon Sword, Pokémon Shield, Pokémon Legends Arceus, Pokémon Scarlet, Pokémon Violet, Pokemon Anime, Anime, TCG, Pokémon TCG"
            />
            <meta name="googlebot-news" content="noindex, nosnippet" />
            <meta name="screen-orientation" content="portrait" />
            <meta name="application-name" content="PokeRef" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icon-192x192.png" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&family=Oswald:wght@600&display=swap"
            rel="stylesheet"
            />
        </head>
        <body>
            <Providers>{children}</Providers>
        </body>
    </html>
  );
}