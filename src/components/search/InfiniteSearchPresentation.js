import useInfiniteScroll from "../../containers/InfiniteScroll";

const InfiniteSearchPresentation = ({ loadMore, hasMore, children }) => {
    const moreData = () => {
        loadMore();
        setIsFetching(false);
    };
    const [setIsFetching] = useInfiniteScroll(moreData, hasMore);

    return children;
};

export default InfiniteSearchPresentation;
