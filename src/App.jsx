import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import MainPage from "./components/pages/MainPage";
import ComicsPage from "./components/pages/ComicsPage";

const App = () => {



	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Switch>
						<Route exact path='/'> {/* main page */}
							<MainPage />
						</Route>
						<Route exact path="/comics">
							<ComicsPage />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
