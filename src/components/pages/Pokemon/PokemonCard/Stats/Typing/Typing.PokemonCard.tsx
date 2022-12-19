import React, { useState } from 'react';
import { H3 } from '@/components/common/styles/Headings';
import { MethodNav } from '@/components/common/styles/Navbars';
import { PokemonTypesContainer } from '../Styled.Stats.PokemonCard';
import { Pokemon } from '@/types/types';
import Table from './Table.Typing.PokemonCard';

type Props = {
  pokemon: Pokemon.Pokemon;
  types: Pokemon.Types;
  toggleType: number;
  toggleTypeTable: (arg0: number) => void;
};

function Typing({ pokemon, types, toggleType, toggleTypeTable }: Props) {
  const [toggle, setToggle] = useState(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <Table target="to" />;
    } else if (toggle === 2) {
      return <Table target="from" />;
    }
  };

  return (
    <PokemonTypesContainer>
      <H3>Types relations</H3>
      <MethodNav>
        <button
          className={toggle === 1 ? `button_active` : ``}
          onClick={() => setToggle(1)}
        >
          <p>Attack</p>
        </button>
        <button
          className={toggle === 2 ? `button_active` : ``}
          onClick={() => setToggle(2)}
        >
          <p>Defense</p>
        </button>
      </MethodNav>
      {pageShown()}
    </PokemonTypesContainer>
  );
}

export default Typing;
