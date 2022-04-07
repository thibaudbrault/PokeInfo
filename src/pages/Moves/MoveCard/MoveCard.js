import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Method from '../../../helpers/Method/Method';

import { CardTitle, H3, Subtitle } from '../../../components/BaseStyles/Headings';
import { GenNav } from '../../../components/BaseStyles/Navbars';
import { MainBig } from '../../../components/BaseStyles/Sizing';
import Data from './Data/Data.MoveCard';
import { MoveCardLink, MoveCardList, MoveCardText, MoveCardTypes } from './StyledMoveCard';
import { BackButton } from '../../../components/BaseStyles/Inputs';

const MoveCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [move, setMove] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/move/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setMove(results);
        });
    }, [name]);

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=898')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setPokemon(results.map((res) => res.data));
        });
    }, []);

    const [machine, setMachine] = useState([])

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/machine?limit=1700')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setMachine(results.map((res) => res.data));
        });
    }, []);

    const[version, setVersion] = useState('ultra-sun-ultra-moon');

    const [toggleState, setToggleState] = useState(1);
    const toggleTable = (index) => {
        setToggleState(index);
    }

    const title = `${name.replace(/-/g, ' ')}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Moves | PokéInfo`;
     }, [title]);

    return (
        <MainBig>
            {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
            ) : (
                <>
                    <CardTitle>{move?.name?.replace(/-/g, ' ')}</CardTitle>
                    <Subtitle>{move?.generation?.name?.replace(/-/g, ' ')}</Subtitle>

                    <GenNav>
                        <ol>
                            {move?.generation?.name === 'generation-i' &&
                                <li>
                                    <button>Gen I</button>
                                    <div>
                                        <button onClick={() => setVersion('red-blue')}>Red / Blue</button>
                                        <button onClick={() => setVersion('yellow')}>Yellow</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii') &&
                                <li>
                                    <button>Gen II</button>
                                    <div>
                                        <button onClick={() => setVersion('gold-silver')}>Gold / Silver</button>
                                        <button onClick={() => setVersion('crystal')}>Crystal</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii') &&
                                <li>
                                    <button>Gen III</button>
                                    <div>
                                        <button onClick={() => setVersion('ruby-sapphire')}>Ruby / Sapphire</button>
                                        <button onClick={() => setVersion('emerald')}>Emerald</button>
                                        <button onClick={() => setVersion('firered-greenleaf')}>Fire Red / Green Leaf</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv') &&
                                <li>
                                    <button>Gen IV</button>
                                    <div>
                                        <button onClick={() => setVersion('diamond-pearl')}>Diamond / Pearl</button>
                                        <button onClick={() => setVersion('platinum')}>Platinum</button>
                                        <button onClick={() => setVersion('heartgold-soulsilver')}>Heart Gold / Soul Silver</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v') &&
                                <li>
                                    <button>Gen V</button>
                                    <div>
                                        <button onClick={() => setVersion('black-white')}>Black / White</button>
                                        <button onClick={() => setVersion('black-2-white-2')}>Black 2 / White 2</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v' || move?.generation?.name === 'generation-vi') &&
                                <li>
                                    <button>Gen VI</button>
                                    <div>
                                        <button onClick={() => setVersion('x-y')}>X / Y</button>
                                        <button onClick={() => setVersion('omega-ruby-alpha-sapphire')}>Omega Ruby / Alpha Sapphire</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v' || move?.generation?.name === 'generation-vi' || move?.generation?.name === 'generation-vii') &&
                                <li>
                                    <button>Gen VII</button>
                                    <div>
                                        <button onClick={() => setVersion('sun-moon')}>Sun / Moon</button>
                                        <button onClick={() => setVersion('ultra-sun-ultra-moon')}>Ultra Sun / Ultra Moon</button>
                                        <button onClick={() => setVersion('lets-go-pikachu-lets-go-eevee')}>Let's Go Pikachu / Let's Go Eevee</button>
                                    </div>
                                </li>
                            }
                            {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v' || move?.generation?.name === 'generation-vi' || move?.generation?.name === 'generation-vii' || move?.generation?.name === 'generation-viii') &&
                                <li>
                                    <button>Gen VIII</button>
                                    <div>
                                        <button onClick={() => setVersion('sword-shield')}>Sword / Shield</button>
                                    </div>
                                </li>
                            }
                        </ol>
                    </GenNav>

                    <Data 
                        move={move}
                        machine={machine}
                        version={version}
                    />

                    <Method 
                        toggleState={toggleState}
                        toggleTable={toggleTable}
                    />

                    <section  className={toggleState === 1 ? "active move_learn" : "hidden"}>
                        <H3>Learned by level up</H3>
                        <MoveCardText>Learned when the pokémon reach a ceratin level. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</MoveCardText>
                        <MoveCardList>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at > 1 &&
                                            <li>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <MoveCardLink
                                                    to={`/pokemon/${p?.name}`}
                                                    key={p?.name}
                                                >
                                                    {p?.name.replace(/-/g, ' ')}
                                                </MoveCardLink>
                                                <p>Level {pmv?.level_learned_at}</p>
                                                <MoveCardTypes>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name}>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </MoveCardTypes>
                                            </li>
                                        )
                                    )
                                )}
                        </MoveCardList>
                    </section>

                    <section  className={toggleState === 2 ? "active move_learn" : "hidden"}>
                        <H3>Learned by TM / HM</H3>
                        <MoveCardText>Learned by using a TM or a HM. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</MoveCardText>
                        <MoveCardList>
                            {pokemon?.map((p) => 
                                p?.moves?.map((pm) => 
                                    pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                    pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'machine' && pmv?.level_learned_at === 0 &&
                                        <li>
                                            <img src={p?.sprites?.front_default} alt={p?.name} />
                                            <MoveCardLink
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                            >
                                                {p?.name.replace(/-/g, ' ')}
                                            </MoveCardLink>
                                            <MoveCardTypes>
                                                {p?.types?.map((pt) =>
                                                    <div id={pt.type.name}>
                                                        <img alt={pt?.type?.name} />
                                                        <span>{pt?.type?.name}</span>
                                                    </div>
                                                )}
                                            </MoveCardTypes>
                                        </li>
                                    )
                                )
                            )}
                        </MoveCardList>
                    </section>

                    <section  className={toggleState === 3 ? "active move_learn" : "hidden"}>
                        <H3>Learned from the Move Relearner / by breeding</H3>
                        <MoveCardText>Learned at level 1 which means that the only way to learn this move is via the move relearner or through breeeding. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</MoveCardText>
                        <MoveCardList>
                            {pokemon?.map((p) => 
                                p?.moves?.map((pm) => 
                                    pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                    pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'egg' && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 1 &&
                                        <li>
                                            <img src={p?.sprites?.front_default} alt={p?.name} />
                                            <MoveCardLink
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                            >
                                                {p?.name.replace(/-/g, ' ')}
                                            </MoveCardLink>
                                            <MoveCardTypes>
                                                {p?.types?.map((pt) =>
                                                    <div id={pt.type.name}>
                                                        <img alt={pt?.type?.name} />
                                                        <span>{pt?.type?.name}</span>
                                                    </div>
                                                )}
                                            </MoveCardTypes>
                                        </li>
                                    )
                                )
                            )}
                        </MoveCardList>
                    </section>

                    <section  className={toggleState === 4 ? "active move_learn" : "hidden"}>
                        <H3>Learned by move tutor</H3>
                        <MoveCardText>Learned by going to the move tutor. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</MoveCardText>
                        <MoveCardList>
                            {pokemon?.map((p) => 
                                p?.moves?.map((pm) => 
                                    pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                    pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'tutor' &&
                                        <li>
                                            <img src={p?.sprites?.front_default} alt={p?.name} />
                                            <MoveCardLink
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                            >
                                                {p?.name.replace(/-/g, ' ')}
                                            </MoveCardLink>
                                            <MoveCardTypes>
                                                {p?.types?.map((pt) =>
                                                    <div id={pt.type.name}>
                                                        <img alt={pt?.type?.name} />
                                                        <span>{pt?.type?.name}</span>
                                                    </div>
                                                )}
                                            </MoveCardTypes>
                                        </li>
                                    )
                                )
                            )}
                        </MoveCardList>
                    </section>

                    <section  className={toggleState === 5 ? "active move_learn" : "hidden"}>
                        <H3>Learned when evolving</H3>
                        <MoveCardText>Learned when the pokémon is evolving no matter its level. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</MoveCardText>
                        <MoveCardList>
                            {pokemon?.map((p) => 
                                p?.moves?.map((pm) => 
                                    pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                    pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 0 && 
                                        <li>
                                            <img src={p?.sprites?.front_default} alt={p?.name} />
                                            <MoveCardLink
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}MoveCardList
                                            >
                                                {p?.name.replace(/-/g, ' ')}
                                            </MoveCardLink>
                                            <MoveCardTypes>
                                                {p?.types?.map((pt) =>
                                                    <div id={pt.type.name}>
                                                        <img alt={pt?.type?.name} />
                                                        <span>{pt?.type?.name}</span>
                                                    </div>
                                                )}
                                            </MoveCardTypes>
                                        </li>
                                    )
                                )
                            )}
                        </MoveCardList>
                    </section>

                    <BackButton onClick={() => navigate("/moves")}> ᐸ Back to moves</BackButton>
                </>
            )}
        </MainBig>
    )
}

export default MoveCard;