import type {WorkspaceDto} from '@/api';
import {UiTable} from '@/components/ui/table/UiTable';
import type {ColumnDef} from '@tanstack/react-table';
import type {FC} from 'react';

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

export const WorkspacesTable: FC = () => {
    return <UiTable columns={COLUMNS} data={[]} />;
};
