import { Component } from "react";
import Header from "./components/header/Header";
import CharInfo from "./components/charInfo/CharInfo";
import CharList from "./components/charList/CharList";

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
					<div className="char__content">
						<CharList onCharSelected={this.onCharSelected} /> {/* получаем id шз списка */}
						<CharInfo charId={this.state.selectedChar} /> {/* передаем полученный id в info */}
					</div>
				</main>
			</div>
		);
	}
}

export default App;
