import {Outlet} from 'react-router';

export default function Index() {
    return (
        <div>
            <h1>Project Dashboard</h1>
            <div>This page shows the dashboard for a project</div>
            <Outlet />
        </div>
    );
}
