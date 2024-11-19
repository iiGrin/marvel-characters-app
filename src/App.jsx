import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Spinner from "./components/spinner/Spinner";

const Page404 = lazy(() => import('./components/pages/404'));
const MainPage = lazy(() => import('./components/pages/MainPage'));
const ComicsPage = lazy(() => import('./components/pages/ComicsPage'));
const ComicInfoPage = lazy(() => import('./components/pages/ComicInfoPage'));



const App = () => {



	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path='/' element={<MainPage />} /> {/* main page */}
							<Route path="/comics" element={<ComicsPage />} />
							<Route path="/comics/:comicId" element={<ComicInfoPage />} />
							<Route path='*' element={<Page404 />} /> {/* Компонент для несуществующей страницы */}
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
}

export default App;

/* TASKS
	- появление карточек с анимацией
	- плавное переключение по путям 
*/ 