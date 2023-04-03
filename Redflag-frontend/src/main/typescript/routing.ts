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
            await import('./features/main/view/main-layout')
        },
        component: 'main-layout',
        children: [
            {
                path: "",
                redirect: "chat/button"
            },
            {
                path: "button",
                action: async () => {
                    await import('./component/test-button')
                },
                component: 'test-button'
            },
        ]
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