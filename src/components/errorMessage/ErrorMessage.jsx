import img from './error.gif';


const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'} /> // путь к папке public (используется редко - здесь показано в качестве примера, лучше использовать src)
        <img style={{
            display: 'block',
            width: '250px',
            height: '250px',
            objectFit: 'contain',
            matgin: "0 auto"
        }} src={img} alt='error' />
    )
}

export default ErrorMessage;