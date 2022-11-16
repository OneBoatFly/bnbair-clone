import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';

export default function useSearchFetch(query) {
    const [loading, setLoading] = useState(true);
    const [getSpotsErrors, setGetSpotsErrors] = useState({});
    
    // const spots = useSelector(state => state.spots.allSpots);
    const pagination = useSelector(state => state.spots.pagination);

    const dispatch = useDispatch();
    const sendQuery = useCallback(async () => {
        setLoading(true)
        setGetSpotsErrors({});
        dispatch(spotsActions.getAllSpotsWithQuery(query))
            .then(() => {
                setLoading(false);
            })
            .catch((e) => {
                setGetSpotsErrors(e.errors)
            });
        
    }, [query, dispatch]);

    useEffect(() => {
        sendQuery(query);
    }, [query, sendQuery]);

    let hasMore = false;
    if (pagination) hasMore = pagination.spotsFound - pagination.page * pagination.size > 0;

    return { loading, getSpotsErrors, hasMore };
}