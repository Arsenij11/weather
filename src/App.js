import React from "react";
import Header from "./components/header";
import stream from './img/149209.png'
import Content from "./components/content";
import FiveDay from "./components/fiveDay";






class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_code : null,
            error_mes : null,
            latitude : null,
            longitude : null
        }
    }



    success(pos) {
        const { latitude, longitude } = pos.coords;
        this.setState(
            {
                latitude: latitude,
                longitude: longitude
            }
        )
    }

    error(err) {
        this.setState(
            {
                error_code: err.code,
                error_mes: err.message
            }
        )
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.success.bind(this),
            this.error.bind(this)
        );
    }



    render() {
        const {error_code, error_mes, latitude, longitude} = this.state;

        if (error_code || error_mes) {
            return (
                <div id="app">
                    <Header title={stream} />
                    <main>
                        <h1>Ошибка {error_code} <br/>
                            {error_mes}
                        </h1>
                    </main>
                </div>
            )
        }

        if (!latitude || !longitude) {
            return (
                <div id="app">
                    <Header title={stream} />
                    <main>
                        <h1>Загружается...</h1>
                    </main>
                </div>
            )
        }

        return (
            <div id="app">
                <Header title={stream} />
                <main>
                    <Content latitude = {latitude} longitude = {longitude} />
                    <FiveDay latitude = {latitude} longitude = {longitude} />
                </main>
            </div>
        )
    }
}

export default App;