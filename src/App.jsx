import { Component } from "react";
import Header from "./components/header/Header";
import RandomChar from "./components/randomChar/RandomChar";
import CharList from "./components/charList/CharList";
import CharInfo from "./components/charInfo/CharInfo";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

import decoration from "./resources/img/vision.png"

class App extends Component {

	state = { // общий state для передачи
		selectedChar: null
	}

	onCharSelected = (id) => { // функция получения id выбранного char
		this.setState({
			selectedChar: id
		})
	}

	render() {
		return (
			<div className="app">
				<Header />
				<main>
					<ErrorBoundary>
						<RandomChar />
					</ErrorBoundary>
					<div className="char__content">
						<ErrorBoundary>
							<CharList onCharSelected={this.onCharSelected} /> {/* получаем id шз списка */}
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo charId={this.state.selectedChar} /> {/* передаем полученный id в info */}
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		);
	}
}

export default App;
