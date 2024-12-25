import {
    index,
    layout,
    prefix,
    route,
    type RouteConfig
} from '@react-router/dev/routes';

export default [
    layout('routes/layout.tsx', [
        index('routes/index.tsx'),
        ...prefix('projects', [
            index('routes/projects/index.tsx'),
            layout('routes/projects/layout.tsx', [
                route(':projectId/dashboard', 'routes/projects/dashboard.tsx')
            ])
        ])
    ])
] satisfies RouteConfig;
