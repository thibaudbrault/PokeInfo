import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const SiteNav = styled.nav`
    max-width: 1700px;
    margin: 0 auto;

    & ul {
        display: flex;
		justify-content: space-around;
    }

    & a {
        padding-bottom: 0.2rem;
        position: relative;
        white-space: nowrap;
        font-size: 1.5rem;
        font-weight: 700;
        transition: 0.3s ease-in-out;
        &::before {
            position: absolute;
            width: 100%;
            height: 1px;
            background: ${props => props.theme.colors.dark};
            top: 100%;
            left: 0;
            pointer-events: none;
            opacity: 0;
            transform-origin: 50% 0%;
            transform: translate3d(0, 3px, 0);
            transition-property: transform, opacity;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.2, 1, 0.8, 1);
        }
        &::after {
            position: absolute;
            width: 100%;
            height: 1px;
            background: ${props => props.theme.colors.dark};
            top: 100%;
            left: 0;
            pointer-events: none;
            opacity: 0;
            transform-origin: 50% 0%;
            transform: translate3d(0, 3px, 0);
            transition-property: transform, opacity;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.2, 1, 0.8, 1);
        }
        &:hover::before {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition-timing-function: cubic-bezier(0.2, 0, 0.3, 1);
        }
        &:hover::after {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition-timing-function: cubic-bezier(0.2, 0, 0.3, 1);
        }
        &::before {
            content: '';
        }
        &::after {
            content: '';
            top: calc(100% + 4px);
            width: 70%;
            left: 15%;
        }
        &::before,
        &:hover::after {
            transition-delay: 0.1s;
        }
        &:hover::before {
            transition-delay: 0s;
        }
    }
`


const Nav = () => {
    return (
        <SiteNav>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Pokémon
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/moves"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Moves
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/abilities"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Abilities
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/types"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Types
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/items"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Items
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/machines"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Machines
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/locations"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#cc0000" : ""
                            };
                        }}
                    >
                        Locations
                    </NavLink>
                </li>
            </ul>
        </SiteNav>
    )
}

export default Nav