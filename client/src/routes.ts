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
                ),

                // path: "/projects/:projectId/databases"
                route(
                    ':projectId/databases',
                    'routes/projects/databases/index.tsx'
                ),
                // path: "/projects/:projectId/databases/:databaseId"
                route(
                    ':projectId/databases/:databaseId',
                    'routes/projects/databases/database.tsx'
                ),

                // path: "/projects/:projectId/media"
                route(':projectId/media', 'routes/projects/media/index.tsx'),
                // path: "/projects/:projectId/media/:mediaId"
                route(
                    ':projectId/media/:mediaId',
                    'routes/projects/media/media.tsx'
                )
            ])
        ])
    ])
] satisfies RouteConfig;
