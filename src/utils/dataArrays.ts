export const learnMethod: Record<string, string> = {
  1: `level-up`,
  2: `machine`,
  3: `egg`,
  4: `tutor`,
};

export const regions: Record<string, string> = {
  1: `kanto`,
  2: `johto`,
  3: `hoenn`,
  4: `sinnoh`,
  5: `unova`,
  6: `kalos`,
  7: `alola`,
  8: `galar`,
  9: `hisui`,
  10: `paldea`,
};

export interface IOptions {
  value: string;
  label: string;
}

export interface IOptionsOffsetLimit extends IOptions {
  offset: number;
  limit: number;
}

export interface IOptionsFixed extends IOptions {
  isFixed?: boolean;
}

export const formOptions: IOptionsOffsetLimit[] = [
  { label: `Alola`, value: `alola`, offset: 1107, limit: 30 },
  { label: `Galar`, value: `galar`, offset: 1177, limit: 25 },
  { label: `Hisui`, value: `hisui`, offset: 1245, limit: 20 },
  { label: `Paldea`, value: `paldea`, offset: 1266, limit: 10 },
  { label: `Mega`, value: `mega`, offset: 1049, limit: 60 },
  { label: `Gmax`, value: `gmax`, offset: 1211, limit: 40 },
];

export const generationOptions: IOptionsOffsetLimit[] = [
  { label: `Generation I`, value: `gen1`, offset: 0, limit: 151 },
  { label: `Generation II`, value: `gen2`, offset: 151, limit: 100 },
  { label: `Generation III`, value: `gen3`, offset: 251, limit: 135 },
  { label: `Generation IV`, value: `gen4`, offset: 386, limit: 107 },
  { label: `Generation V`, value: `gen5`, offset: 493, limit: 156 },
  { label: `Generation VI`, value: `gen6`, offset: 649, limit: 72 },
  { label: `Generation VII`, value: `gen7`, offset: 721, limit: 88 },
  { label: `Generation VIII`, value: `gen8`, offset: 809, limit: 96 },
  { label: `Generation IX`, value: `gen9`, offset: 905, limit: 112 },
];

export const typeOptions: IOptionsFixed[] = [
  { value: `bug`, label: `Bug` },
  { value: `dark`, label: `Dark` },
  { value: `dragon`, label: `Dragon` },
  { value: `electric`, label: `Electric` },
  { value: `fairy`, label: `Fairy` },
  { value: `fighting`, label: `Fighting` },
  { value: `fire`, label: `Fire` },
  { value: `flying`, label: `Flying` },
  { value: `ghost`, label: `Ghost` },
  { value: `grass`, label: `Grass` },
  { value: `ground`, label: `Ground` },
  { value: `ice`, label: `Ice` },
  { value: `normal`, label: `Normal` },
  { value: `poison`, label: `Poison` },
  { value: `psychic`, label: `Psychic` },
  { value: `rock`, label: `Rock` },
  { value: `steel`, label: `Steel` },
  { value: `water`, label: `Water` },
];

type PokemonFilters = {
  game: string;
  version: string;
  format: string;
  min: number;
  max: number;
}[];

export const pokemonFilters: PokemonFilters = [
  {
    game: `yellow`,
    version: `yellow`,
    format: `gen1`,
    min: 0,
    max: 152,
  },
  {
    game: `crystal`,
    version: `crystal`,
    format: `gen2`,
    min: 151,
    max: 252,
  },
  {
    game: `emerald`,
    version: `emerald`,
    format: `gen3`,
    min: 251,
    max: 387,
  },
  {
    game: `platinum`,
    version: `platinum`,
    format: `gen4`,
    min: 386,
    max: 494,
  },
  {
    game: `black-2`,
    version: `black-2-white-2`,
    format: `gen5`,
    min: 493,
    max: 650,
  },
  {
    game: `x`,
    version: `x-y`,
    format: `gen6`,
    min: 649,
    max: 722,
  },
  {
    game: `ultra-sun`,
    version: `ultra-sun-ultra-moon`,
    format: `gen7`,
    min: 721,
    max: 810,
  },
  {
    game: `sword`,
    version: `sword-shield`,
    format: `gen8`,
    min: 809,
    max: 898,
  },
  {
    game: `legends-arceus`,
    version: `legends-arceus`,
    format: `gen8`,
    min: 897,
    max: 905,
  },
  {
    game: `scarlet`,
    version: `scarlet-violet`,
    format: `gen9`,
    min: 904,
    max: 1018,
  },
];

export interface IGenNav extends IOptions {
  limit: number;
  options: {
    label: string;
    value: string;
  }[];
}

export const genNav: IGenNav[] = [
  {
    value: `gen1`,
    label: `Gen I`,
    limit: 152,
    options: [
      {
        label: `red`,
        value: `red-blue`,
      },
      {
        label: `blue`,
        value: `red-blue`,
      },
      {
        label: `yellow`,
        value: `yellow`,
      },
    ],
  },
  {
    value: `gen2`,
    label: `Gen II`,
    limit: 252,
    options: [
      {
        label: `gold`,
        value: `gold-silver`,
      },
      {
        label: `silver`,
        value: `gold-silver`,
      },
      {
        label: `crystal`,
        value: `crystal`,
      },
    ],
  },
  {
    value: `gen3`,
    label: `Gen III`,
    limit: 387,
    options: [
      {
        label: `ruby`,
        value: `ruby-sapphire`,
      },
      {
        label: `sapphire`,
        value: `ruby-sapphire`,
      },
      {
        label: `emerald`,
        value: `emerald`,
      },
      {
        label: `firered`,
        value: `firered-leafgreen`,
      },
      {
        label: `leafgreen`,
        value: `firered-leafgreen`,
      },
    ],
  },
  {
    value: `gen4`,
    label: `Gen IV`,
    limit: 494,
    options: [
      {
        label: `diamond`,
        value: `diamond-pearl`,
      },
      {
        label: `pearl`,
        value: `diamond-pearl`,
      },
      {
        label: `platinum`,
        value: `platinum`,
      },
      {
        label: `heartgold`,
        value: `heartgold-soulsilver`,
      },
      {
        label: `soulsilver`,
        value: `heartgold-soulsilver`,
      },
    ],
  },
  {
    value: `gen5`,
    label: `Gen V`,
    limit: 650,
    options: [
      {
        label: `black`,
        value: `black-white`,
      },
      {
        label: `white`,
        value: `black-white`,
      },
      {
        label: `black-2`,
        value: `black-2-white-2`,
      },

      {
        label: `white-2`,
        value: `black-2-white-2`,
      },
    ],
  },
  {
    value: `gen6`,
    label: `Gen VI`,
    limit: 722,
    options: [
      {
        label: `x`,
        value: `x-y`,
      },
      {
        label: `y`,
        value: `x-y`,
      },
      {
        label: `omega-ruby`,
        value: `omega-ruby-alpha-sapphire`,
      },
      {
        label: `alpha-sapphire`,
        value: `omega-ruby-alpha-sapphire`,
      },
    ],
  },
  {
    value: `gen7`,
    label: `Gen VII`,
    limit: 810,
    options: [
      {
        label: `sun`,
        value: `sun-moon`,
      },
      {
        label: `moon`,
        value: `sun-moon`,
      },
      {
        label: `ultra-sun`,
        value: `ultra-sun-ultra-moon`,
      },
      {
        label: `ultra-moon`,
        value: `ultra-sun-ultra-moon`,
      },
      {
        label: `lets-go-pikachu`,
        value: `lets-go-pikachu-lets-go-eevee`,
      },

      {
        label: `lets-go-eevee`,
        value: `lets-go-pikachu-lets-go-eevee`,
      },
    ],
  },
  {
    value: `gen8`,
    label: `Gen VIII`,
    limit: 905,
    options: [
      {
        label: `sword`,
        value: `sword-shield`,
      },
      {
        label: `shield`,
        value: `sword-shield`,
      },
      {
        label: `brilliant-diamond`,
        value: `brilliant-diamond-and-shining-pearl`,
      },
      {
        label: `shining-pearl`,
        value: `brilliant-diamond-and-shining-pearl`,
      },
      {
        label: `legends-arceus`,
        value: `legends-arceus`,
      },
    ],
  },
  {
    value: `gen9`,
    label: `Gen IX`,
    limit: 1018,
    options: [
      {
        label: `scarlet`,
        value: `scarlet-violet`,
      },
      {
        label: `violet`,
        value: `scarlet-violet`,
      },
    ],
  },
];

type Natures = {
  name: string;
  positive: string;
  negative: string;
};

export const pokemonNatures: Natures[] = [
  { name: `Adamant`, positive: `Attack`, negative: `Sp-Atk` },
  { name: `Bashful`, positive: `None`, negative: `None` },
  { name: `Bold`, positive: `Defense`, negative: `Attack` },
  { name: `Brave`, positive: `Attack`, negative: `Speed` },
  { name: `Calm`, positive: `Sp-Def`, negative: `Attack` },
  { name: `Careful`, positive: `Sp-Def`, negative: `Sp-Atk` },
  { name: `Docile`, positive: `None`, negative: `None` },
  { name: `Gentle`, positive: `Sp-Def`, negative: `Defense` },
  { name: `Hardy`, positive: `None`, negative: `None` },
  { name: `Hasty`, positive: `Speed`, negative: `Defense` },
  { name: `Impish`, positive: `Defense`, negative: `Sp-Atk` },
  { name: `Jolly`, positive: `Speed`, negative: `Sp-Atk` },
  { name: `Lax`, positive: `Defense`, negative: `Sp-Def` },
  { name: `Lonely`, positive: `Attack`, negative: `Defense` },
  { name: `Mild`, positive: `Sp-Atk`, negative: `Defense` },
  { name: `Modest`, positive: `Sp-Atk`, negative: `Attack` },
  { name: `Naive`, positive: `Speed`, negative: `Sp-Def` },
  { name: `Naughty`, positive: `Attack`, negative: `Sp-Def` },
  { name: `Quiet`, positive: `Sp-Atk`, negative: `Speed` },
  { name: `Quirky`, positive: `None`, negative: `none` },
  { name: `Rash`, positive: `Sp-Atk`, negative: `Sp-Def` },
  { name: `Relaxed`, positive: `Defense`, negative: `Speed` },
  { name: `Sassy`, positive: `Sp-Def`, negative: `Speed` },
  { name: `Serious`, positive: `None`, negative: `None` },
  { name: `Timid`, positive: `Speed`, negative: `Attack` },
];

export const formatOptions = [
  { value: `gen9vgc2023`, label: `Gen 9 - VGC 2023` },
  { value: `gen9ou`, label: `Gen 9 - OverUsed` },
  { value: `gen9uu`, label: `Gen 9 - UnderUsed` },
  { value: `gen9monotype`, label: `Gen 9 - Monotype` },
  { value: `gen9ubers`, label: `Gen 9 - Ubers` },
  { value: `gen9lc`, label: `Gen 9 - Little cup` },
  // { value: '', label: '' },
];
