
import { Navigate, Outlet } from 'react-router';
import { useAuth } from './hooks/useAuth';
import Loading from './pages/loading/Loading';
import Header from './components/Header';


const ProtectedRoutes = () => {

    const { loading, user } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <div className="min-h-screen bg-[#090d12]">
            <Header />
            <Outlet />
        </div>
    );
}

export default ProtectedRoutes
