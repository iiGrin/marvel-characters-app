import { Helmet } from "react-helmet";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import Banner from "../banner/Banner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Marvel comics</title>
            </Helmet>
            <ErrorBoundary>
                <Banner />
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;