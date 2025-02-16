import React from "react";
import axios from "axios";
import API_KEY from "./api"

class FiveDay1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city : null,
            error_code: null,
            error_mes: null,
            weather : null
        }
    }
    componentDidMount() {
        const {latitude, longitude} = {latitude : this.props.latitude, longitude : this.props.longitude };
        console.log('Fiveday1', latitude, longitude);
        axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        ).
        catch((error) => {
            this.setState({
                error_code: error.response?.status || "Ошибка",
                error_mes: error.message,
            });
        }).
        then((response) => {
            const data = response.data;
            this.setState({
                city: data.city.name,
                weather: data.list.filter((item) => {
                    const date = new Date(item["dt_txt"]);
                    return [12, 21].includes(date.getHours());
                })
            })
        })
    }


    render () {
        const {city, error_code, error_mes, weather } = this.state;

        function getday (num) {
            let day;
            switch (num) {
                case (0):
                    day = 'Воскресенье';
                    break;
                case (1):
                    day = 'Понедельник';
                    break;
                case (2):
                    day = 'Вторник';
                    break;
                case (3):
                    day = 'Среда';
                    break;
                case (4):
                    day = 'Четверг';
                    break;
                case (5):
                    day = 'Пятница';
                    break;
                case (6):
                    day = 'Суббота';
                    break;
            }

            return day;
        }

        if (error_code || error_mes) {
            return (
                <div id="fivedays">
                    <h2>Ошибка</h2>
                    <span id="fivedaysinfo">
                        <span className="day">Ошибка {error_code} {error_mes}</span>
                    </span>
                </div>
            )
        }
        if (!city || !weather) {
            return (<div id="fivedays">
                <h2>Прогноз на 5 дней</h2>
                <span id="fivedaysinfo">
                    <span className="day">Загружается...</span>
                </span>
            </div>)
        }
        return (
            <div id="fivedays">
                <h2>Прогноз на 5 дней в городе {city}</h2>
                <span id="fivedaysinfo">
                    <span className="day">
                        Сегодня <img src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`} />
                        <img src={`https://openweathermap.org/img/wn/${weather[1].weather[0].icon}@2x.png`} />
                        {weather[0].main.temp} {weather[1].main.temp}
                    </span>
                    <span className="day">
                        Завтра <img src={`https://openweathermap.org/img/wn/${weather[2].weather[0].icon}@2x.png`} />
                        <img src={`https://openweathermap.org/img/wn/${weather[3].weather[0].icon}@2x.png`} />
                        {weather[2].main.temp} {weather[3].main.temp}
                    </span>
                    <span className="day">
                        {getday(new Date(weather[4]['dt_txt']).getDay())} <img src={`https://openweathermap.org/img/wn/${weather[4].weather[0].icon}@2x.png`} />
                        <img src={`https://openweathermap.org/img/wn/${weather[5].weather[0].icon}@2x.png`} />
                        {weather[4].main.temp} {weather[5].main.temp}
                    </span>
                    <span className="day">
                        {getday(new Date(weather[6]['dt_txt']).getDay())} <img src={`https://openweathermap.org/img/wn/${weather[6].weather[0].icon}@2x.png`} />
                        <img src={`https://openweathermap.org/img/wn/${weather[7].weather[0].icon}@2x.png`} />
                        {weather[6].main.temp} {weather[7].main.temp}
                    </span>
                    <span className="day">
                        {getday(new Date(weather[8]['dt_txt']).getDay())} <img src={`https://openweathermap.org/img/wn/${weather[8].weather[0].icon}@2x.png`} />
                        <img src={`https://openweathermap.org/img/wn/${weather[9].weather[0].icon}@2x.png`} />
                        {weather[8].main.temp} {weather[9].main.temp}
                    </span>
                </span>
            </div>
        )
    }
}

export default FiveDay1;