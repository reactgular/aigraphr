import {Outlet} from 'react-router';

export default function Index() {
    return (
        <div>
            <h1>Project Index</h1>
            <Outlet />
        </div>
    );
}
