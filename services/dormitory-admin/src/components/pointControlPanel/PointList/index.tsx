import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PointListItem from './PointListItem';
import MainSectionTitle from '../../common/MainSectionTitle';
import StudentList from '../../common/StudentList';
import { usePointQuery } from '../../../apis/points';
import { useSort } from '../../../contexts/sort';
import { sortedStudents } from '../../../libs/utils';
import { SelectedUserIds, Student } from '../../../apis/types';
interface PropsType {
    onClick: (id: string, secondParam: boolean | Student[]) => void;
    id: SelectedUserIds;
    setId: React.Dispatch<React.SetStateAction<SelectedUserIds>>;
}

const PointList = ({
    onClick,
    id,
    setId,
}: PropsType) => {
    const { data, isLoading, error } = usePointQuery();
    const nonUndefinedData = data ?? [];
    const { sortType } = useSort();

    useEffect(() => {
        setId(Object.fromEntries(nonUndefinedData.map(student => [student.id, false])));
    }, [sortType]);
    
    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sortedStudentsList = sortedStudents(sortType, nonUndefinedData);
        if(e.currentTarget.checked) setId(Object.fromEntries(sortedStudentsList.map(student => [student.id, true])));
        else setId(Object.fromEntries(sortedStudentsList.map(student => [student.id, false])));
    }

    const columns = [
        <input 
            type="checkbox" 
            checked={Object.values(id).length !== 0 && Object.values(id).indexOf(false) === -1} 
            onChange={toggleSelectAll} 
        />, 
        "호실", "학번", "이름", "상점", "벌점", "1단계", "2단계", "3단계", "1Out", "2Out"
    ];

    return (
        <MainContainer>
            <MainSectionTitle>학생 리스트</MainSectionTitle>
            <StudentList columns={columns}>
                {
                    sortedStudents(sortType, nonUndefinedData).map(student => <PointListItem 
                        key={student.id} 
                        onClick={(id: string, isCheckbox?: boolean) => onClick(id, isCheckbox ?? nonUndefinedData)} 
                        isActive={id[student.id]} 
                        {...student} 
                    />)
                }
            </StudentList>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export default PointList;