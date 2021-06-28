import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSpinnerVisibility } from '../../reducers/appSlice';

const NotFound = () => {
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(setSpinnerVisibility(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Pagina no encontrada</h1>
        </div>
    );
};

export default NotFound;
