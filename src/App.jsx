import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Spinner from "./components/spinner/Spinner";

const Page404 = lazy(() => import('./components/pages/404'));
const MainPage = lazy(() => import('./components/pages/MainPage'));
const ComicsPage = lazy(() => import('./components/pages/ComicsPage'));
const SinglePage = lazy(() => import('./components/pages/SinglePage'))
const ComicInfoPage = lazy(() => import('./components/pages/ComicInfoPage'));
const SingleCharacter = lazy(() => import('./components/pages/SingleCharacter'));



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
							<Route path="/comics/:id" element={<SinglePage Component={ ComicInfoPage } dataType='comic'/>} />
							<Route path="/characters/:id" element={<SinglePage Component={ SingleCharacter } dataType='character'/>} />
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
	- появление карточек с анимацией(оптимизация одной функцией)
	- плавное переключение по путям 
*/ 