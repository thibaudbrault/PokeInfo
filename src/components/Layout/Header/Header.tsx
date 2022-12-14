import React from 'react';
import Link from 'next/link';

import { H1 } from '../../CommonStyles/Headings';
import {
  HeaderBtnConnected,
  HeaderBtnContainer,
  HeaderBtnTheme,
  HeaderContainer,
} from './StyledHeader';
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
        <HeaderBtnTheme onClick={themeToggler} aria-label="Switch Theme" data-testid="themeBtn">
          {theme === `dark` ? <RiSunLine data-testid="sun" /> : <RiMoonClearLine data-testid="moon" />}
        </HeaderBtnTheme>
        <HeaderBtnConnected>
          <Link href="/">Favorites</Link>
        </HeaderBtnConnected>
      </HeaderBtnContainer>
    </HeaderContainer>
  );
}

export default Header;
