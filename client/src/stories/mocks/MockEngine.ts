import type {
    EdgeDto,
    EdgesGetResponses,
    EdgesPaginateResponses,
    GrNodeDefDto,
    GrNodeDefGetNodeDefGroupsResponses,
    NodeDto,
    NodesGetResponses,
    NodesPaginateResponses,
    ProjectDto,
    ProjectsGetResponses,
    ProjectsPaginateResponses,
    WorkspaceDto,
    WorkspacesGetResponses,
    WorkspacesPaginateResponses
} from '@/api';
import {mockGrNodeDefDto} from '@/stories/mocks/MockGrNodeDefDto';
import {mockNodeDto} from '@/stories/mocks/MockNodeDto';
import {mockProjectDto} from '@/stories/mocks/MockProjectDto';
import {mockWorkspaceDto} from '@/stories/mocks/MockWorkspaceDto';
import {faker} from '@faker-js/faker';

faker.seed(123);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface MockApi<TResponse = any> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

    response: TResponse | (() => Promise<TResponse>);

    status: number;

    url: string;
}

interface MockProject {
    edges: EdgeDto[];

    nodes: NodeDto[];

    project: ProjectDto;

    workspaces: WorkspaceDto[];
}

const base = 'http://localhost:6006/api';

class MockEngine {
    private readonly grNodeDefs: GrNodeDefDto[];

    private readonly projects: MockProject[];

    public constructor() {
        this.grNodeDefs = [
            mockGrNodeDefDto('core:mock'),
            mockGrNodeDefDto('core:no-outputs', 5, 0),
            mockGrNodeDefDto('core:no-inputs', 0, 5),
            mockGrNodeDefDto('core:no-params', 0, 0),
            mockGrNodeDefDto('core:too-many', 12, 12)
        ];

        const project1: MockProject = {
            project: mockProjectDto({projectId: 1}),
            workspaces: [
                mockWorkspaceDto({workspaceId: 1}),
                mockWorkspaceDto({workspaceId: 2}),
                mockWorkspaceDto({workspaceId: 3}),
                mockWorkspaceDto({workspaceId: 4}),
                mockWorkspaceDto({workspaceId: 5}),
                mockWorkspaceDto({workspaceId: 6})
            ],
            nodes: [
                mockNodeDto({workspaceId: 1, nodeId: 1, type: 'core:mock'}),
                mockNodeDto({
                    workspaceId: 1,
                    nodeId: 2,
                    type: 'core:no-outputs'
                }),
                mockNodeDto({
                    workspaceId: 1,
                    nodeId: 3,
                    type: 'core:no-inputs'
                }),
                mockNodeDto({
                    workspaceId: 1,
                    nodeId: 4,
                    type: 'core:no-params'
                }),
                mockNodeDto({workspaceId: 1, nodeId: 5, type: 'core:too-many'})
            ],
            edges: []
        };

        this.projects = [project1];
    }

    public getMockData(): Array<MockApi> {
        const eachWorkspace = (
            mock: MockProject,
            workspaceId: number
        ): Array<MockApi> => [
            this.apiWorkspace(mock.project.id, workspaceId),
            this.apiNodes(mock.project.id, workspaceId),
            this.apiEdges(mock.project.id, workspaceId),
            ...mock.nodes
                .map((node) =>
                    this.apiNode(mock.project.id, node.workspaceId, node.id)
                )
                .flat(),
            ...mock.edges
                .map((edge) =>
                    this.apiEdge(mock.project.id, edge.workspaceId, edge.id)
                )
                .flat()
        ];

        const eachProject = (mock: MockProject): Array<MockApi> => [
            this.apiProject(mock.project.id),
            this.apiWorkspaces(mock.project.id),
            ...mock.workspaces.map((w) => eachWorkspace(mock, w.id)).flat()
        ];

        return [
            this.apiNodeDefs(),
            this.apiProjects(),
            ...this.projects.map((mock) => eachProject(mock)).flat()
        ];
    }

    public getNode(projectId: number, nodeId: number): NodeDto {
        const project = this.getProject(projectId);
        const response = project.nodes.find((n) => n.id === nodeId);
        if (!response) {
            throw new Error(`Node ${nodeId} not found`);
        }
        return response;
    }

    private apiEdge(
        projectId: number,
        workspaceId: number,
        edgeId: number
    ): MockApi<EdgesGetResponses['200']> {
        const project = this.getProject(projectId);
        const response = project.edges.find((n) => n.id === edgeId);
        if (!response) {
            throw new Error(`Edge ${edgeId} not found`);
        }
        return {
            url: `${base}/projects/${projectId}/workspaces/${workspaceId}/edges/${edgeId}`,
            method: 'GET',
            status: 200,
            response
        };
    }

    private apiEdges(
        projectId: number,
        workspaceId: number
    ): MockApi<EdgesPaginateResponses['200']> {
        const project = this.getProject(projectId);
        return {
            url: `${base}/projects/${projectId}/workspaces/${workspaceId}/edges`,
            method: 'GET',
            status: 200,
            response: project.edges
        };
    }

    private apiNode(
        projectId: number,
        workspaceId: number,
        nodeId: number
    ): MockApi<NodesGetResponses['200']> {
        const project = this.getProject(projectId);
        const response = project.nodes.find((n) => n.id === nodeId);
        if (!response) {
            throw new Error(`Node ${nodeId} not found`);
        }
        return {
            url: `${base}/projects/${projectId}/workspaces/${workspaceId}/nodes/${nodeId}`,
            method: 'GET',
            status: 200,
            response
        };
    }

    private apiNodeDefs(): MockApi<GrNodeDefGetNodeDefGroupsResponses['200']> {
        return {
            url: `${base}/node-def/groups`,
            method: 'GET',
            status: 200,
            response: [
                {
                    description: 'Core nodes',
                    name: 'core',
                    nodes: this.grNodeDefs
                }
            ]
        };
    }

    private apiNodes(
        projectId: number,
        workspaceId: number
    ): MockApi<NodesPaginateResponses['200']> {
        const project = this.getProject(projectId);
        return {
            url: `${base}/projects/${projectId}/workspaces/${workspaceId}/nodes`,
            method: 'GET',
            status: 200,
            response: project.nodes
        };
    }

    private apiProject(
        projectId: number
    ): MockApi<ProjectsGetResponses['200']> {
        const project = this.getProject(projectId);
        return {
            url: `${base}/projects/${projectId}`,
            method: 'GET',
            status: 200,
            response: project.project
        };
    }

    private apiProjects(): MockApi<ProjectsPaginateResponses['200']> {
        return {
            url: `${base}/projects`,
            method: 'GET',
            status: 200,
            response: this.projects.map((project) => project.project)
        };
    }

    private apiWorkspace(
        projectId: number,
        workspaceId: number
    ): MockApi<WorkspacesGetResponses['200']> {
        const project = this.getProject(projectId);
        const response = project.workspaces.find((w) => w.id === workspaceId);
        if (!response) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }
        return {
            url: `${base}/projects/${projectId}/workspaces/${workspaceId}`,
            method: 'GET',
            status: 200,
            response
        };
    }

    private apiWorkspaces(
        projectId: number
    ): MockApi<WorkspacesPaginateResponses['200']> {
        const project = this.getProject(projectId);
        return {
            url: `${base}/projects/${projectId}/workspaces`,
            method: 'GET',
            status: 200,
            response: project.workspaces
        };
    }

    private getProject(projectId: number): MockProject {
        const project = this.projects.find((p) => p.project.id === projectId);
        if (!project) {
            throw new Error(`Project ${projectId} not found`);
        }
        return project;
    }
}

export const mockEngine = new MockEngine();

export const mockData = mockEngine.getMockData();

console.log('*'.repeat(80));
console.log(mockData);
console.log('*'.repeat(80));
