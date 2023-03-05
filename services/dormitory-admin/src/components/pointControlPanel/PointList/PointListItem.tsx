import React from 'react';
import styled from '@emotion/styled';
import { Body1, Body2, Button } from '@semicolondsm/ui';
import { Student } from '../../../apis/types';
import { useTrainingMutation } from '../../../apis/points';
import { TableCell, TableRow } from '../../common/Table';

interface PropsType {
    onClick: (id: string, isCheckbox?: boolean) => void;
    isActive: boolean;
}

const PointListItem = ({
    id,
    num,
    name,
    good_point,
    bad_point,
    stay_apply,
    meal_apply,
    penalty_level,
    is_penalty_required,
    isActive,
    onClick,
}: Student & PropsType) => {
    const { mutate } = useTrainingMutation();
    const createText = (children: React.ReactNode, index?: number) => {
        return (
            <CustomTableCell
                key={index}
                justify="center"
                align="center"
                onClick={() => onClick(id)}>
                <Body2>{children}</Body2>
            </CustomTableCell>
        );
    };
    const cellSizes = [
        '40px',
        'minmax(11%, 1fr)',
        'minmax(11%, 1fr)',
        'minmax(11%, 1fr)',
        'minmax(11%, 1fr)',
        'minmax(11%, 1fr)',
        'minmax(11%, 2fr)',
    ];

    const penaltyKo = ['-', '1단계', '2단계', '3단계', '1OUT', '2OUT'];

    return (
        <TableRow
            cellSizes={cellSizes}
            isBorder
            customStyle
            isCursor
            style={{ padding: '8px 28px' }}>
            <CustomTableCell onClick={() => onClick(id, true)} justify="center" align="center">
                <input type="checkbox" checked={isActive} />
            </CustomTableCell>
            {createText(num)}
            {createText(name)}
            {createText(good_point)}
            {createText(bad_point)}
            {createText(penaltyKo[penalty_level])}
            {is_penalty_required ? (
                <CustomTableCell onClick={() => onClick(id)} justify="center" align="center">
                    <CustomButton
                        size="sm"
                        onClick={(e) => {
                            mutate({ id });
                        }}>
                        봉사완료
                    </CustomButton>
                </CustomTableCell>
            ) : penalty_level ? (
                createText('완료')
            ) : (
                createText('-')
            )}
        </TableRow>
    );
};

const BodyWrapper = styled.div<{ isActive: boolean }>`
    width: 100%;
    height: 100%;
    background: ${(props) =>
        props.isActive ? props.theme.colors.purple50 : props.theme.colors.gray50};
    cursor: pointer;
`;

const CustomButton = styled(Button)``;
const CustomTableCell = styled(TableCell)`
    height: 40px;
    align-items: center;
`;

export default React.memo(PointListItem);
