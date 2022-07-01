import { instance } from '../utils/axios';
import { queryKeys } from '../utils/queryKeys';
import { StayStatus, StayCodeList, WeekendMealParams, WeekendMealStatus } from './types';

export const getStayStatus = async () => {
    const path = queryKeys.getStayStatus();
    const { data } = await instance.get<StayStatus>(path, {
        headers: {
            userId: '422f2483-804c-4286-b96f-923e4910e402', //테스트용
        },
    });
    return data;
};

export const getStayList = async () => {
    const path = queryKeys.getStayList();
    const { data } = await instance.get<StayCodeList>(path);
    return data;
};

export const getWeekMealStatus = async () => {
    const path = queryKeys.getWeekMeal();
    const { data } = await instance.get<WeekendMealStatus>(path);
    return data;
};

export const putStayStatus = async (param: StayStatus) => {
    await instance.put(queryKeys.getStayStatus(), param);
};

export const postWeekendMeal = async (param: WeekendMealParams) => {
    await instance.post(queryKeys.getWeekMeal(), param);
};
