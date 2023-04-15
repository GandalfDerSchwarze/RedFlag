import {Route} from '@vaadin/router'

export const routes: Route[] = [
    {
        path: "/",
        redirect: "/main"
    },
    {
        path: "/main",
        action: async () => {
            await import('./features/main/view/main-layout')
        },
        component: 'main-layout',
    },
    {
        path: "/chat",
        action: async () => {
            await import('./features/chat/view/chat-main-view')
        },
        component: 'chat-main-view'
    },
    {
        path: '(.*)',
        action: async () => {
            await import('./features/error/view/404-page-not-found')
        },
        component: 'page-not-found',
    }
];