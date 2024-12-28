import type {WorkspaceDto} from '@/api';
import {UiBanner} from '@/components/ui/UiBanner';
import {UiContainer} from '@/components/ui/UiContainer';
import {UiTable} from '@/components/ui/UiTable';
import type {ColumnDef} from '@tanstack/react-table';
import type {Route} from './+types/index';

export const COLUMNS: ColumnDef<WorkspaceDto>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'engine',
        header: 'Engine'
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'description',
        header: 'Description'
    }
];

export default function Index({params}: Route.LoaderArgs) {
    return (
        <UiContainer>
            <UiBanner
                title="Workspaces"
                description="Here's a list of your workspaces for this project!"
            />
            <UiTable columns={COLUMNS} data={[]} />
        </UiContainer>
    );
}
