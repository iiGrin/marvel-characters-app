import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import Banner from "../banner/Banner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <>
            <Banner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;