import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import MainPage from "./components/pages/MainPage";
import ComicsPage from "./components/pages/ComicsPage";
import ComicInfoPage from "./components/pages/ComicInfoPage";
import Page404 from "./components/pages/404";

const App = () => {



	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Routes>
						<Route path='/' element={<MainPage />} /> {/* main page */}
						<Route path="/comics" element={<ComicsPage />} />
						<Route path="/comics/:comicId" element={<ComicInfoPage />} />
						<Route path='*' element={<Page404 />} /> {/* Компонент для несуществующей страницы */}
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
