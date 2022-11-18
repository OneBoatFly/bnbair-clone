import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';

export default function useSearchFetch(query, setShowDropDown) {
    const [loading, setLoading] = useState(true);
    const [getSpotsErrors, setGetSpotsErrors] = useState({});

    const dispatch = useDispatch();
    const sendQuery = useCallback(async () => {
        setLoading(true)
        setGetSpotsErrors({});
        dispatch(spotsActions.getAllSpotsWithQuery(query))
            .then(() => {
                setLoading(false);
                setShowDropDown(false);
            })
            .catch((e) => {
                setGetSpotsErrors(e.errors)
            });
        
    }, [query, dispatch]);

    useEffect(() => {
        sendQuery(query);
    }, [query, sendQuery]);

    return { loading, getSpotsErrors };
}