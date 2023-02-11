import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const detailTop = document.getElementsByClassName('single-spot-wrapper');

    useEffect(() => {
        window.scrollTo(0, 0); // when path changes, scroll to top
        if (detailTop.length) { // window.scrollTo doesnt work on detail page.
            detailTop[0].scrollIntoView();
        }
    }, [pathname]);

    return null;
}