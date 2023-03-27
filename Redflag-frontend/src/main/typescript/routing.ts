import {Route} from '@vaadin/router';

export const routes: Route[] = [
    {
        path: "/",
        action: async () => {
            await import('./features/app/view/main-layout');
        },
        component: "main-layout",
        children: [
            {
                path: "",
                action: async (context, commands) => {
                    return commands.redirect("kekw");
                },
            },
            {
                path: "kekw",
                action: async () => {
                    await import('./features/app/view/main-layout')
                },
                component: 'main-layout'
            }
        ]
    }
];