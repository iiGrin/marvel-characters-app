import { useState } from "react";
import Header from "./components/header/Header";
import RandomChar from "./components/randomChar/RandomChar";
import CharList from "./components/charList/CharList";
import CharInfo from "./components/charInfo/CharInfo";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

import decoration from "./resources/img/vision.png"

const App = () => {

	const [selectedChar, setChar] = useState(null);

	const onCharSelected = (id) => { // функция получения id выбранного char
		setChar(id);
	}

	return (
		<div className="app">
			<Header />
			<main>
				<ErrorBoundary>
					<RandomChar />
				</ErrorBoundary>
				<div className="char__content">
					<ErrorBoundary>
						<CharList onCharSelected={onCharSelected} /> {/*получаем id шз списка*/}
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} /> {/* передаем полученный id в info */}
					</ErrorBoundary>
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	);
}

export default App;
