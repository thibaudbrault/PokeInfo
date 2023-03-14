import { Input } from '@/components/common/styles/Inputs';
import { TLink } from '@/components/common/styles/Table';
import styled from 'styled-components';
import { device } from '@/components/common/styles/Sizing';

export const AutocompleteInput = styled(Input)`
  min-width: 25rem;

  & input {
    width: 100%;
    height: 100%;
    padding: 0 1rem;

    &::placeholder {
      font-size: 1.3rem;
      color: ${({ theme }) => theme.secondary};
    }
  }

  @media ${device.md} {
    grid-area: search;
  }

  @media ${device.xs} {
    min-width: 0;
  }
`;

export const AutocompleteContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;

  & ul {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.main};
    border-radius: 5px;

    & li {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.5rem 0;
    }
  }
`;

export const AutocompleteLink = styled(TLink)`
  font-size: 1.7rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const AutocompleteId = styled.span`
  font-size: 1.7rem;
`;
