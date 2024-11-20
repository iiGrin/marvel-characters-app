import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import Banner from "../banner/Banner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {

    return (
        <>
            <ErrorBoundary>
                <Banner />
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;