import {Route} from '@vaadin/router'

export const routes: Route[] = [
    {
        path: "/",
        redirect: "/main"
    },
    {
        path: "/main",
        action: async () => {
            await import('./features/main/view/main-layout-new')
        },
        component: 'main-layout-new',
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
            console.log("hey");
            await import('./features/error/view/404-page-not-found')
        },
        component: 'page-not-found',
    }
];