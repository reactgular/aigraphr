// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {edges} from './edges';
import {nodes} from './nodes';
import {projects} from './projects';
import {settings} from './settings';
import {workspaces} from './workspaces';

export const apis = {edges, nodes, projects, settings, workspaces};

apis.workspaces()
    .create({projectId: 1}, {name: 'x', engine: 'javascript', description: 'x'})
    .is201()
    .isId(1)
    .isEntity();
