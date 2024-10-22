import { Component } from "react";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, errorInfo) {
        console.log(err, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// предохранители ловят ошибки которые есть в методе render(), в методах жизненного цикла и в дочерних компонентах
// не ловят ошибки из: обработчиков событий, асинхронного кода, в самом предохранителе 