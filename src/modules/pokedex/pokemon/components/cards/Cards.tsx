import { ICard } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { PokemonCardList, PokemonCardModal } from './Styled.Cards.PokemonCard';

type Props = {
  cards: ICard[];
};

export function Cards({ cards }: Props) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="section" id="cards">
      <h3 className="h3">Cards</h3>
      <PokemonCardList>
        {cards.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => {
                openModal();
                setModalData(c.images.large);
              }}
            >
              <Image src={c.images.small} alt={``} width={220} height={308} />
            </button>
            <p>
              Set:{` `}
              <span className="bold">{c.set.name.replaceAll(`—`, ` `)}</span>
            </p>
          </li>
        ))}
        {modalData && (
          <PokemonCardModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            preventScroll={true}
            closeTimeoutMS={500}
          >
            <Image
              src={modalData}
              alt={``}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: `100%`, height: `auto` }}
            />
          </PokemonCardModal>
        )}
      </PokemonCardList>
    </section>
  );
}
