import React from 'react';
import styled from '@emotion/styled';
import { Body1 } from '@semicolondsm/ui';
import { StudentType } from '../../../apis/types';

interface PropsType {
    onClick: (id: string) => void;
    isActive: boolean;
}

const PointListItem = ({
    id,
    num,
    name,
    good_point,
    bad_point,
    penalty_level,
    penalty_training_status,
    isActive,
    onClick,
}: StudentType & PropsType) => {
    const createText = (children: React.ReactNode) => {
        return (
            <BodyWrapper isActive={isActive} onClick={() => onClick(id)}>
                <Body1>{children}</Body1>
            </BodyWrapper>
        );
    }

    return (
        <>
            {createText(306)}
            {createText(num)}
            {createText(name)}
            {createText(good_point)}
            {createText(bad_point)}
            {
                [...Array(5)].map((_v, i) => {
                    if(i < penalty_level - 1) return createText("완료");
                    else if(i === penalty_level - 1) {
                        if(penalty_training_status) return createText("미완료");
                        else return createText("완료");
                    } else return createText("");
                })
            }
        </>
    );
}

const BodyWrapper = styled.div<{ isActive: boolean; }>`
    width: 100%;
    height: 100%;
    background: ${props => props.isActive ? props.theme.colors.gray400 : "transparent"};
    cursor: pointer;
`;

export default PointListItem;