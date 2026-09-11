
import { Navigate, Outlet } from 'react-router';
import { useAuth } from './hooks/useAuth';
import Loading from './pages/loading/Loading';


const ProtectedRoutes = () => {

    const { loading, user } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    return <Outlet />;
}

export default ProtectedRoutes