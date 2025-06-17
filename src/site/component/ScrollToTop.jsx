import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
const { pathname } = useLocation();

    useEffect(() => {
    const timeout = setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const main = document.querySelector("main");
    if (main) main.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}