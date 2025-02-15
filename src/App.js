import React from "react";
import Header from "./components/header";
import stream from './img/149209.png'
import Content from "./components/content";
import Content1 from "./components/content1";
import FiveDay from "./components/fiveDay";
import FiveDay1 from "./components/fiveDay1";
import axios from "axios";
import api from "./api";




class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_code : null,
            error_mes : null,
            latitude : null,
            longitude : null,
            form : null,
            counter: 0
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
                error_mes: err.message,
                counter: 0
            }
        )
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.success.bind(this),
            this.error.bind(this)
        );
    }

    checkcity(event) {
        event.preventDefault();
        const value = event.target.entercity.value;
        if (value.length > 0) {
            axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${api}`
            ).catch((error) => {
                this.setState(
                    {
                        error_code: error.response?.status || "Ошибка",
                        error_mes: error.message,
                        counter: 0
                    }
                )
            }).then(
                (resp) => {
                    const data = resp.data;
                    if (data.length === 0) {
                        this.setState({
                            error_code: 404,
                            error_mes: "Данного города не существует",
                            counter: 0
                        })
                    } else {
                        let counter = this.state.counter + 1;
                        this.setState({
                            form: {
                                latitude: data[0].lat,
                                longitude: data[0].lon
                            },
                            error_mes: null,
                            error_code: null,
                            latitude: null,
                            longitude: null,
                            counter: counter
                        })
                    }
                }
            )
        }
    }


    render() {
        const {error_code, error_mes, latitude, longitude, form, counter} = this.state;
        console.log(this.state);
        const city = <div className="city">
                    <h2>Введите название города</h2>
                    <form onSubmit={this.checkcity.bind(this)}>
                        <input type="text" name="entercity" placeholder="Пожалуйста, введите искомый город" />
                        <button type="submit"
                                onMouseOver={(event) => {
                                    event.target.style.backgroundColor = 'grey';
                                    event.target.style.cursor = 'pointer';
                                }
                                }
                                onMouseOut={(event) => {
                                    event.target.style.backgroundColor = 'black';
                                    event.target.style.cursor = 'none';
                                }}>
                            Найти
                        </button>
                    </form>
                </div>


        if (error_code || error_mes) {
            return (
                <div id="app">
                    <Header title={stream}/>
                    <main>
                        {city}
                        <h1>Ошибка {error_code} <br/>
                            {error_mes}
                        </h1>
                    </main>
                </div>
            )
        }

        if (!latitude && !longitude && !form) {
            return (
                <div id="app">
                    <Header title={stream}/>
                    <main>
                        {city}
                        <h1>Загружается...</h1>
                    </main>
                </div>
            )
        }

        if (!form) {
            return (
                <div id="app">
                    <Header title={stream}/>
                    <main>
                        {city}
                        {counter % 2 === 0 ? <Content latitude={latitude} longitude={longitude}/> : <Content1 latitude={latitude} longitude={longitude}/>}
                        {counter % 2 === 0 ? <FiveDay latitude={latitude} longitude={longitude}/> : <FiveDay1 latitude={latitude} longitude={longitude}/>}
                    </main>
                </div>
            )
        }

        return (
                <div id="app">
                    <Header title={stream}/>
                    <main>
                        {city}
                        {counter % 2 === 0 ? <Content latitude={form.latitude} longitude={form.longitude}/> : <Content1 latitude={form.latitude} longitude={form.longitude}/>}
                        {counter % 2 === 0 ? <FiveDay latitude={form.latitude} longitude={form.longitude}/> : <FiveDay1 latitude={form.latitude} longitude={form.longitude}/>}
                    </main>
                </div>
            )
    }
}

export default App;