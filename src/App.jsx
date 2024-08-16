import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import PendingLoad from '@/pages/PendingLoad';
import routes from '@/routes';


const router = createBrowserRouter(routes);

function App() {
    return (
        <Suspense fallback={<PendingLoad />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
