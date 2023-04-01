import {Route, Router} from '@vaadin/router';

export const routes: Route[] = [
    {
        path: "/",
        action: async (context, commands) => {
            console.log("am i here?");
            Router.go("/main");
            return commands.redirect("/main");
        }
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
                action: async (context, commands) => {
                    return commands.redirect("./main/button");
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