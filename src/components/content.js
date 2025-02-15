import React from "react";
import axios from "axios";
import day from './icons/daysign.png'
import night from './icons/nightsign.png'
import API_KEY from "./api"




class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            temp: null,
            icon : null,
            feels_like: null,
            error_code: null,
            error_mes: null,
            time: null,
            daynight: null,
        };
    }


    componentDidMount() {
        const latitude  = this.props.latitude;
        const longitude = this.props.longitude;
        console.log('Content', latitude, longitude);
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            )
            .then((resp) => {
                const currenttime = new Date();
                this.setState({
                    name: resp.data.name,
                    temp: resp.data.main.temp,
                    icon : `https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`,
                    feels_like: resp.data.main.feels_like,
                    time : currenttime.getHours() >= 5 && currenttime.getHours() < 17 ? 'weatherinfoday' : 'weatherinfonight',
                    daynight : currenttime.getHours() >= 5 && currenttime.getHours() < 17 ? 'day' : 'night',
                });
            })
            .catch((error) => {
                this.setState({
                    error_code: error.response?.status || "Ошибка",
                    error_mes: error.message,
                });
            });
    }

    render() {
        const { name, temp, icon, feels_like, error_code, error_mes, time, daynight } = this.state;

        if (error_code || error_mes) {
            return (
                <div className="weathererror">
                    <p>Ошибка: {error_code}</p>
                    <p>{error_mes}</p>
                </div>
            );
        }

        if (!name || !temp || !icon || !feels_like || !time) {
            return <p>Загружается...</p>;
        }

        return (
            <div className={time}>
                <p className="temp">{temp}°C</p>
                <p className="feels_like">Ощущается как {feels_like}</p>
                <p className="icon"><img  src = {icon}/></p>
                <p className="sign">{name} <img src={daynight === 'day' ? day : night} id="geopos"/></p>
            </div>
        );
    }
}

export default Content;
