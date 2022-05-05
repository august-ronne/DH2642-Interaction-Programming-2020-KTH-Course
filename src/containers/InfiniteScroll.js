import React, { useState, useEffect } from "react";

const useInfiniteScroll = (callback, hasMore) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    });

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching]);

    function isScrolling() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isFetching ||
            !hasMore
        ) {
            return;
        }

        setIsFetching(true);
    }

    return [setIsFetching];
};

export default useInfiniteScroll;
