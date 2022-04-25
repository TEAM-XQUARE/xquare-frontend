import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Body1 } from '@semicolondsm/ui';

interface PropsType {
    isActive: boolean;
    uri: string;
    title: string;
}

const NavigationItem = ({
    isActive,
    uri,
    title,
}: PropsType) => {
    return (
        <Link href={uri}>
            <Item isActive={isActive}>
                <Body1>{title}</Body1>
            </Item>
        </Link>
    );
}

const Item = styled.a<{ isActive: boolean; }>`
    width: 100%;
    color: ${props => props.theme.colors.black};
    text-decoration: none;
    border-radius: 10px;
    padding: 10px 12px;
    background: ${({ isActive, theme }) => isActive ? theme.colors.gray400 : "transparent"};
    transition: background .07s linear;
    cursor: pointer;
    user-select: none;

    &:hover {
        background: ${props => props.theme.colors.gray400};
    }
`;

export default NavigationItem;