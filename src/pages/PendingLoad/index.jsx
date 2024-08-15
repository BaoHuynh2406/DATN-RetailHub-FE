import CircularProgress from '@mui/material/CircularProgress';

function PendingLoad() {
    return (
        <>
            <div
                className="flex flex-col justify-center 
            items-center h-screen bg-slate-700"
            >
                <CircularProgress className='text-white' />
            </div>
        </>
    );
}

export default PendingLoad;
