<div align="center">
  <img alt="PokéInfo" src="https://raw.githubusercontent.com/thibaudbrault/PokeInfo/main/public/images/pok%C3%A9info_logo.png" width="90%" />  
</div>  
  
---
  
<h2 align="center">PokéInfo is a pokémon encyclopedia built using React JS, Sass and PokéAPI</h2>  
<p align="center">You'll find a ton of informations on every pokémon, moves, abilities, items and much more</p>  
<p align="center">Leave a 🌟 if you like my project 👍</p>

<div align="center">
    <img alt="Rotom" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/479.gif" width="15%" />
    <img alt="Rotom" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/10008.gif" width="15%" />  
    <img alt="Rotom" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/10009.gif" width="15%" />  
    <img alt="Rotom" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/10010.gif" width="15%" />  
    <img alt="Rotom" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/10011.gif" width="15%" />  
    <img alt="Rotom" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/10012.gif" width="15%" />  
</div>

---

<details open="open">  
  <summary>Table of contents</summary>

1.  [Roadmap](#roadmap)
2.  [Description](#description)
3.  [Technologies](#technologies)
4.  [Setup](#setup)
5.  [Acknowledgements](#acknowledgements)
6.  [License](#license)

</details>

<h2 id="roadmap">Roadmap</h2>

✅A page for every pokémon / move / ability / type / item  
✅Filter pokémon by name / type / generation / forms  
✅Filter moves / abilities / machines by name  
✅Change certain data according to the game selected  
✅Dark mode  
✅404 page  
✅Autocomplete  
✅Infinite scrolling (a bit wonky but trying to imrpove it)

🛠Implement PokeApi service worker to cache images  
🛠Improve performances

🔜Location page  
🔜A "create your team" page  
🔜Animation on scroll

🥚Pikachu page

<h2 id="description">Description</h2>

<h4>Main goal</h4>

My main goal for this site was to get better at React JS and to learn how to use an Api and to use styled-components. I chose to use PokéApi because there is a lot of tutorials to start from, the documentation is very clear and easy to use and there is a ton of informations so I could make an bigger site with multiple pages.

<h4>Contents</h4>

- All the 898 pokémon + regional variants, mega and gmax
- Moves : basic data, effect, pokémon that can learn it, ...
- Abilities : effect, pokémon that have this ability (normal or hidden), ...
- Types : effectiveness against other types, pokémon with this type, ...
- Items : effect, flinch power, ...
- Machines : list of tm and hm for every game
- Locations : coming soon
- Pikachu : all the different pikachu's forms (excluding gmax)

<h2 id="technologies">Technologies</h2>

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

<h2 id="setup">Setup</h2>

To get a local copy of this awesome app you'll need tohave Git and Node.js installed. After that, in your command line, you'll need to :

1. Clone the repo

```
git clone
```

2. Go in the folder

```
cd pokéinfo
```

3. Install the dependencies

```
npm install
```

4. Run the app

```
npm start
```

<h2 id="acknowledgements">Acknowledgements</h2>

A huge thanks to everyone that helped me by answering to my questions on Stack Overflow and Reddit.  
A big thanks also to the pokeapi team for creating such a huge, detailed and very well organized api.

<h4>Data</h4>

<a href="https://pokeapi.co/docs/v2" target="_blank">PokéAPi</a>

<h4>Dependencies</h4>

<a href="https://www.npmjs.com/package/axios" target="_blank">Axios</a>  
<a href="https://www.npmjs.com/package/react-cssfx-loading" target="_blank">React CSSFX loading</a>

<h2 id="license">License</h2>  
MIT © Thibaud Brault
