import {Route} from '@vaadin/router';

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
        children: [
            {
                path: "",
                redirect: "main/card-carousel"
            },
            {
                path: "card-carousel",
                action: async () => {
                    await import('./component/cardcarousel/card-carousel')
                },
                component: 'card-carousel'
            },
        ]
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
                action: async (context, commands) => {
                    return commands.redirect("button");
                },
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