import {Route} from '@vaadin/router'

export const routes: Route[] = [
    {
        path: "/",
        redirect: "/main"
    },
    {
        path: "",
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
    }
];