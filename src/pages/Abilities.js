import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';

export default function Abilities() {

    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/ability?limit=267")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setAbilities(results.map((res) => res.data));
        });
    }, []);

    console.log(abilities);

  return (
    <div className='wrapper'>
        <Header />
        <Nav />
        <main className='abilities'>
            <table className='abilities_table'>
                <thead className='abilities_table_head'>
                    <tr className='abilities_table_head_row'>
                        <th className='abilities_table_head_row_element'>Name</th>
                        <th className='abilities_table_head_row_element'>Effect</th>
                    </tr>
                </thead>
                <tbody className='abilities_table_body'>
                    {loading ? (
                        <tr>
                            <td>Loading...</td>
                        </tr >
                    ) : (
                        abilities.map((a) => (
                        <tr key={a.name} className='abilities_table_body_row'>
                            <td className='abilities_table_body_row_name'>{a.name}</td>
                            <td className='abilities_table_body_row_effect'>{a.id}</td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
        <Footer />
    </div>
  )
}
