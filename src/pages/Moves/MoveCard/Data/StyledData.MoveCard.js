import styled from 'styled-components';
import { Table } from '../../../../components/BaseStyles/Table';
import { DamageClass, Type } from '../../../../components/BaseStyles/Themes';

export const MoveCardDataSection = styled.section`
    padding: 5rem 0;
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    column-gap: 3rem;
`

export const MoveCardDataTable = styled(Table)`
    & th {
        background: rgba(130, 130, 130, 0.2);
    }

    & td {
        font-size: 1.7rem;
        font-weight: 700;
        text-align: center;
        text-transform: capitalize;
    }
`

export const MoveCardDataType = styled(Type)`
    display: inline;
    padding: 1rem 2rem;
    border-radius: 5px;
    cursor: pointer;

    & img {
        height: 2rem;
        vertical-align: middle;
        cursor: pointer;
    }

    & span {
        padding-left: 0.5rem;
        vertical-align: middle;
        cursor: pointer;
    }
`

export const MoveCardDataCategory = styled(DamageClass)`
    & div {
        display: inline;
        padding: 0.5rem 1.5rem;

        & img {
        height: 3.5rem;
        vertical-align: middle;
        }

        & span {
            padding-left: 0.5rem;
            vertical-align: middle;
        }
    }
`

export const MoveCardDataList = styled.ul`
    margin-top: 2rem;

    & li {
        margin: 0 0 2rem;
    }
`

export const MoveCardDataText = styled.p`
    font-size: 1.7rem;
    text-transform: lowercase;
`

export const MoveCardDataMeta = styled.ul`
    margin-top: 1rem;
    font-size: 1.5rem;
`

export const MoveCardDataStat = styled.ul`
    margin-left: 2rem;
	font-size: 1.5rem;
`

export const MoveCardDataTarget = styled.p`
    text-transform: capitalize;
    margin-left: 2rem;
	font-size: 1.5rem;
`