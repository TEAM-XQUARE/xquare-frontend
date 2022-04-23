import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';

interface Item {
    title: string;
    uri: string;
}

interface PropsType {
    items: Item[];
}

const Navigation = ({
    items,
}: PropsType) => {
    const router = useRouter();

    return (
        <NavigationWrapper>
            {
                items.map(item => (
                    <NavigationItem
                        isActive={router.asPath === item.uri}
                        {...item} 
                    />
                ))
            }
        </NavigationWrapper>
    );
}

const NavigationWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    grid-gap: 20px;
    margin-top: 150px;
`;

export default Navigation;