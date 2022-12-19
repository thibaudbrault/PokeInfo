import React from 'react';
import Link from 'next/link';

import { H1 } from '@/components/common/styles/Headings';
import {
  HeaderBtnContainer,
  HeaderBtnFavorites,
  HeaderBtnTheme,
  HeaderContainer,
} from './Styled.Header';
import { RiMoonClearLine } from '@meronex/icons/ri';
import { RiSunLine } from '@meronex/icons/ri';

type Props = {
  themeToggler: () => void;
  theme: string;
};

function Header({ themeToggler, theme }: Props) {
  return (
    <HeaderContainer id="header">
      <H1>PokéRef</H1>
      <HeaderBtnContainer>
        <HeaderBtnTheme
          onClick={themeToggler}
          aria-label="Switch Theme"
          data-testid="themeBtn"
        >
          {theme === `dark` ? (
            <RiSunLine data-testid="sun" />
          ) : (
            <RiMoonClearLine data-testid="moon" />
          )}
        </HeaderBtnTheme>
        <HeaderBtnFavorites>
          <Link href="/favorites">Your PC</Link>
        </HeaderBtnFavorites>
      </HeaderBtnContainer>
    </HeaderContainer>
  );
}

export default Header;
