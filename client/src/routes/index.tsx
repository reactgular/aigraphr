import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router';
import type {Route} from './+types/index';

export default function Index({params}: Route.LoaderArgs) {
    const nav = useNavigate();
    useEffect(() => {
        nav('/projects');
    }, [nav]);
    return <Outlet />;
}
