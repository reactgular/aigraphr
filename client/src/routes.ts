import {
    index,
    layout,
    prefix,
    route,
    type RouteConfig
} from '@react-router/dev/routes';

export default [
    layout('routes/layout.tsx', [
        // path: "/"
        index('routes/index.tsx'),
        ...prefix('projects', [
            // path: "/projects"
            index('routes/projects/index.tsx'),
            layout('routes/projects/layout.tsx', [
                // path: "/projects/:projectId/dashboard"
                route(':projectId/dashboard', 'routes/projects/dashboard.tsx'),
                // path: "/projects/:projectId/workspaces"
                route(
                    ':projectId/workspaces',
                    'routes/projects/workspaces/index.tsx'
                ),
                // path: "/projects/:projectId/workspaces/:workspaceId"
                route(
                    ':projectId/workspaces/:workspaceId',
                    'routes/projects/workspaces/workspace.tsx'
                )
            ])
        ])
    ])
] satisfies RouteConfig;
