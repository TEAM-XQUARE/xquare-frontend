export const queryKeys = {
    getStudyRoomList: () => '/study-room',
    getStudyRoomStatus: () => '/study-room/status',
    getWeekMeal: () => '/weekend-meal',
    getStayStatus: () => '/stay',
    getStayList: () => '/stay/codes/status',
    getPicnic: () => '/picnic',
    getClassroomList: (floor: string, type: string) => `/class-room?floor=${floor}&type=${type}`,
    getTodayType: (date: string) => `/admin?date=${date}`,
    getTimeTables: (date: string) => `/${date}`,
    getWeekOutTime: () => '/picnic/time',
};
