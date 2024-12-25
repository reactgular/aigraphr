import {Outlet} from 'react-router';

export default function Layout() {
    return (
        <div>
            <aside>Example sidebar</aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
