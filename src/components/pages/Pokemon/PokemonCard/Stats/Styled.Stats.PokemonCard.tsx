import { device } from '@/components/common/styles/Sizing';
import { FullWidthTable } from '@/components/common/styles/Table';
import styled from 'styled-components';

export const PokemonStatsCircles = styled.div`
  margin: 3rem 0 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  height: 15rem;

  & .CircularProgressbar {
    height: 100%;

    &-trail {
      stroke: ${({ theme }) => theme.secondary};
    }

    &-path {
      stroke: ${({ theme }) => theme.red};
    }

    &-text {
      fill: ${({ theme }) => theme.secondary};
      font-size: 1.3rem;
      stroke-width: 0.4;
    }
  }

  @media ${device.lg} {
    height: 30rem;
    row-gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.sm} {
    height: 45rem;
    row-gap: 4rem;
    grid-template-columns: 1fr 1fr;

    & .CircularProgressbar {
      &-text {
        font-size: 2rem;
      }
    }
  }
`;

export const PokemonStatsTotal = styled.p`
  margin: 2rem 0;
  font-size: 1.7rem;
`;

export const PokemonStatsDetails = styled.details`
  & summary {
    width: fit-content;
    font-size: 2.3rem;
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;
  }
`;

export const PokemonCalcTable = styled(FullWidthTable)`
  border-bottom: none;
  & th {
    color: ${({ theme }) => theme.secondary};
    font-size: 1.7rem;
    font-weight: 700;
    text-transform: capitalize;
    background: rgba(130, 130, 130, 0.2);
  }

  & tr:last-of-type {
    & td {
      border-bottom: none;
    }
  }

  & input {
    width: 100%;
    padding: 0.5rem;
    background: transparent;
    color: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.secondary};
      opacity: 1;
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.red};
    }
  }

  & select {
    width: 80%;
    margin: 0 auto;
    padding: 0.5rem;
    text-transform: capitalize;

    & option {
      text-transform: capitalize;
    }
  }
`;
