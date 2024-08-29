import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Typography } from '@mui/material';
import { fetchUserCurrent, postUserLogin } from '@/redux/UserCurrent';

function Test() {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.userCurrent);

    const user = {
        email: 'admin@retailhub.com',
        password: 'admin123',
    };

    const handleLogin = () => {
        dispatch(postUserLogin(user));
    };

    const handleFetchUserCurrent = () => {
        dispatch(fetchUserCurrent());
    };

    return (
        <div>
            <Button variant="contained" className="m-5" onClick={handleLogin}>
                Test Login
            </Button>
            <Button variant="contained" className="m-5" onClick={handleFetchUserCurrent}>
                Fetch User Current
            </Button>

            {loading && <CircularProgress />}

            {error && <Typography color="error">Error: {error}</Typography>}

            {data && (
                <div>
                    <Typography variant="h6">User Information:</Typography>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Test;
