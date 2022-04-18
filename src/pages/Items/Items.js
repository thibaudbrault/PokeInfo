import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import { MainBig } from '../../components/BaseStyles/Sizing';
import { LeftTitle } from '../../components/BaseStyles/Headings';
import { Input, ModifiedSearch } from '../../components/BaseStyles/Inputs';
import { Table, THead, TLink, TRow } from '../../components/BaseStyles/Table';
import { TCategoryItems, TEffectItems, TNameItems } from './StyledItems';

function Items() {

    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState([])

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/item?limit=1608')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setItems(results.map((res) => res.data));
        });
    }, []);

    useEffect(() => {
        setFilteredItems(
            items.filter((items) =>
                items.name.replace(/-/g, ' ').toLowerCase().includes(search.toLowerCase())
            ).sort((a, b) => a.name.localeCompare(b.name))
        );
    }, [search, items]);

    useEffect(() => {
        document.title = `Items | PokéInfo`;
     }, []);

    return (
        <MainBig>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
            ) : (
                <>
                    <LeftTitle>Items</LeftTitle>
                    <ModifiedSearch>
                        <Input>
                            <label htmlFor="searchBar">Search</label>
                            <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                        </Input>
                    </ModifiedSearch>

                    <Table>
                        <THead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Effect</th>
                            </tr>
                        </THead>
                        <tbody>
                            {filteredItems.map((i) => 
                                i?.category?.name !== 'dynamax-crystals' && i?.category?.name !== 'all-machines' && i?.category?.name !== 'all-mail' && i?.category?.name !== 'unused' && i?.category?.name !== 'data-cards' && i?.category?.name !== 'plot-advancement' && i?.category?.name !== 'species-candies' && i?.category?.name !== 'gameplay' &&
                                    <TRow key={i.name}>
                                        <TNameItems>
                                            <div>
                                                <img src={i.sprites.default} alt='' />
                                                <TLink
                                                    to={`/items/${i.name}`}
                                                    key={i.name}
                                                >
                                                    <span>
                                                        {i.name.replace(/-/g, ' ')}
                                                    </span>
                                                </TLink>
                                            </div>
                                        </TNameItems>
                                        <TCategoryItems>
                                            {i.category.name.replace(/-/g, ' ')}
                                        </TCategoryItems>
                                        <TEffectItems>
                                            {i.effect_entries.map((ie) => (
                                                <span>
                                                    {ie.short_effect}
                                                </span>
                                            ))}
                                        </TEffectItems>
                                    </TRow>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </MainBig>
  )
}

export default Items