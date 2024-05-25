<h1 align="center" style="font-size:80px">PokéRef</h1>

---

<div align="center">

![GitHub branch checks state](https://img.shields.io/github/checks-status/thibaudbrault/pokeref/dev)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/thibaudbrault/pokeref/main.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c046a4cf-f603-40f7-9dac-1efcd734baab/deploy-status)](https://app.netlify.com/sites/pokeref/deploys)
![GitHub issues](https://img.shields.io/github/issues/thibaudbrault/pokeref)
![GitHub pull requests](https://img.shields.io/github/issues-pr/thibaudbrault/pokeref)

</div>

<h3 align="center">PokéRef is a Pokémon encyclopedia built with Next JS, Typescript and Scss modules and uses data from PokéAPI, Smogon and PokémonTCG</h3>  
<p align="center">You'll find a ton of information on every Pokémon, moves, abilities, items and a lot more</p>  
<div align="center">
  <a href="https://pokeref.app/">Live version</a>  
</div>  
  
<p align="center">Leave a 🌟 if you like my project 👍</p>

<div align="center">

![](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/643.gif)
![](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/644.gif)
![](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/646.gif)

</div>

---

<details open="open">  
  <summary>Table of contents</summary>

1.  [Roadmap](#roadmap)
2.  [Setup](#setup)
3.  [Description](#description)
4.  [Technologies](#technologies)
5.  [Acknowledgements](#acknowledgements)

</details>

<h2 id="roadmap">Roadmap</h2>

<h4>Features</h4>

✅A page for every Pokémon / move / ability / type / item and more  
✅Filter Pokémon by name / form / generation and type  
✅Filter moves / abilities / machines by name  
✅Fuzzy search for Pokémon / moves / abilities and items pages  
✅Change certain data according to the game selected  
✅Pokémon cries (up to Pokémon n° 721)  
✅Competitive information for every Pokémon with data from Smogon  
✅List of every Pokémon cards for every Pokémon  
✅Dark and light mode  
✅404 page  
✅Fully responsive

<h4>Performance improvements</h4>

✅Use of Tanstack-Query to fetch data only once by using `cacheTime: Infinity` and `staleTime: Infinity`. The data will very rarely change so there is no use in re-fetching it every x minutes / hours  
✅Use of Next JS next/image to optimize images. Very important for this app because some pages (like the index.js or the items.js) have a lot of images and they are one of the main problems regarding my performances so optimizing them to make the loading faster is very important  
✅Turned into a PWA with the next-pwa package  
✅Paginated pokedex, moves, abilities and items pages

<h4>SEO</h4>

✅Head with fitting title, description and keywords for every page (static and dynamic)  
✅Sitemap with every static and dynamic pages

<h2 id="setup">Setup</h2>

<h4>Prequisites</h4>

- Have PNPM installed (optional)

<h4>Clone the repo</h4>

```bash
git clone https://github.com/thibaudbrault/PokeRef.git
```

<h4>Install the dependencies</h4>

```bash
pnpm install
```

<h4>Start the server</h4>

```bash
pnpm dev
```

<h4>Enjoy 😃</h4>

<h2 id="description">Description</h2>

<h4>Main goal</h4>

My main goal for this site was to get better at React JS and to learn how to use an API and to use Styled-Components.  
I chose to use PokéAPI because there are a lot of tutorials to start from, the documentation is very clear and easy to use and there is a ton of information so I could make a bigger site with multiple pages.

<h4>Story of this project</h4>

- Started by using vanilla JS + Scss to learn how to fetch data from an API in vanilla JS
- Quickly moved to React JS + Scss to learn React by working on a big project
- Moved to React JS + Styled-Components to learn a new way to write CSS. It was a good move for me because I really like Styled-Components because it has the advantages of Scss, is easily importable / exportable between files and supports theming.
- Added React-Query to fetch data. It's a great library that makes it easy to manage caching, fetching, loading and error handling for every data fetch.
- Finally moved to Next JS (instead of CRA) + Styled-Components to learn to use Next JS. I chose to use Next JS to benefit from the image optimization given by the <Image /> component because the app has a lot of images to render and every optimization is welcome. I also chose it to benefit from the Static-Site generation.
- Upgraded to Next 13. There were some problems that made the transition to using the app folder instead of the pages one not possible, but I benefited from the changes to the <Image /> component (it no longer creates spans) and the <Link /> component (it no longer need to have an anchor tag inside).
- Added React-Table and converted all my tables to benefit from virtualization, sorting and filtering for every column making it easier to find the desired information.
- Changed all the structure folder and moved from Styled-Components to Scss modules.

<h4>Problems encountered (ordered from the oldest to the most recent)</h4>

- Learning to fetch data from an API and use this data. That was the first time that I've used an API and at first I had problems to understand how the fetch API worked and how to use and display the data returned.
- Moving to Styled-Components. Not a big problem because it uses nesting like Sass so I didn't have to modify a lot of CSS, but I had to learn how to create global styles and how to create themes and switch between them.
- Implementing an infinite scroll (now removed) in React with <a href="https://www.npmjs.com/package/react-infinite-scroll-component" target="_blank">react-infinite-scroll-component</a>. I had problems with creating the function that fetches more data and the function that says when there are more elements to return. Maybe I'll try to implement it with React-Query but it's currently not a priority.
- Tried to virtualize the moves, abilities and items pages' lists. I tried to implement it by using <a href="https://github.com/bvaughn/react-virtualized" target="_blank">react-virtualized</a> and <a href="https://github.com/petyosi/react-virtuoso" target="_blank">react-virtuoso</a>, but I had a few problems (the main one being that it did not take into account the sorting of the list and returned the list without it).
- Implementing React-Query. I had to learn how to modify my custom hooks to make it work with React-Query and how to import the data from the hooks. It took me some time to make the transition works, but I don't regret it because my code is more readable (mainly the part where I import my hooks, but also the way I handle the loading state to return an animation while the data is being fetched) and it's an easy way to cache data.
- Moving from CRA to Next. The main problem I had was learning to use dynamic routing and when I understood it the migration became easier. It still took me some time because I had to move all my files in other folders, change the paths in imports, implement the <Image /> component along with a width and height, correct some problems with the images (the creation of multiple spans wrapping the image that was solved by using next/future/image before moving to Next 13) and a few other problems with the <Link /> component (the fact that it can't have multiple children, that it needs to have a 'href' instead of the 'to' used in react-router to give the path and that you need to put an anchor tag inside the Link and use passHref).
- Converting all the files to Typescript and declare all the types.
- Make my components fully reusable.

<h4>Contents</h4>

- Pokémon : basic data, evolution line, moves that he can learn, ...
- Moves : basic data, effect, Pokémon that can learn it, ...
- Abilities : effect, Pokémon with this ability (normal or hidden), ...
- Types : effectiveness against other types, Pokémon with this type, ...
- Items : effect, flinch power, ...
- Machines : list of TM and HM for every game
- Locations : every place and the Pokémon that can be encountered
- And much more

<h2 id="technologies">Technologies</h2>

- <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
- <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
- <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
- <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" />
- <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" />
- <img src="https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220" />

<h2 id="acknowledgements">Acknowledgements</h2>

A huge thanks to everyone that helped me by answering to my questions on Stack Overflow and Reddit.  
A big thanks also to the PokeAPI team for creating such a huge, detailed and very well organized API.

<h4>Data</h4>

<a href="https://pokeapi.co/docs/v2" target="_blank">PokéAPI</a>  
<a href="https://github.com/pkmn/smogon" target="_blank">Smogon</a>  
<a href="https://pokemontcg.io/" target="_blank">PokemonTCG</a>

<h4>Dependencies</h4>

<a href="https://www.npmjs.com/package/@tanstack/react-query" target="_blank">Tanstack React-Query</a>  
<a href="https://www.npmjs.com/package/@tanstack/react-table" target="_blank">Tanstack React-Table</a>  
<a href="https://www.npmjs.com/package/react-hook-form" target="_blank">React Hook Form</a>  
<a href="https://www.npmjs.com/package/react-select" target="_blank">React Select</a>  
<a href="https://www.npmjs.com/package/react-paginate" target="_blank">React Paginate</a>  
<a href="https://www.npmjs.com/package/fuse.js" target="_blank">Fuse.js</a>  
<a href="https://www.npmjs.com/package/eslint" target="_blank">ESLint</a>  
<a href="https://www.npmjs.com/package/prettier" target="_blank">Prettier</a>  
<a href="https://www.npmjs.com/package/next-pwa" target="_blank">Next PWA</a>

<h4> TS Types</h4>

<a href="https://github.com/monbrey/pokeapi-typescript" target="_blank">Pokeapi-Typescript</a>
