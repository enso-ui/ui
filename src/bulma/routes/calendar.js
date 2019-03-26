const CalendarIndex = () => import('@pages/calendar/Index.vue');

export default {
    name: 'core.calendar.events.index',
    path: '/calendar',
    component: CalendarIndex,
    meta: {
        breadcrumb: 'calendar',
        title: 'Calendar',
    },
};
