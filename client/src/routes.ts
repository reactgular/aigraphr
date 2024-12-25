import {index, layout, route, type RouteConfig} from '@react-router/dev/routes';

export default [
    layout('routes/layout.tsx', [
        index('routes/index.tsx'),
        route('projects', 'routes/projects/index.tsx')
    ])
] satisfies RouteConfig;
