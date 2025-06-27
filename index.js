
const { Client, GatewayIntentBits } = require('discord.js');
const { token, openweathermap_api_key } = require('./config.json');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'weather') {
        await interaction.deferReply();
        const zipcode = interaction.options.getString('zipcode');

        try {
            const { lat, lon, name } = await getCoordsFromZip(zipcode);
            const weather = await getWeather(lat, lon);
            await interaction.editReply(`The weather in ${name} is ${weather.weather[0].main} with a temperature of ${weather.main.temp}°F.`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Could not retrieve weather for that zipcode. Please try again.');
        }
    }

    if (commandName === 'forecast') {
        await interaction.deferReply();
        const zipcode = interaction.options.getString('zipcode');

        try {
            const { lat, lon, name } = await getCoordsFromZip(zipcode);
            const forecast = await getForecast(lat, lon);
            const forecastMessage = formatForecast(forecast, name);
            await interaction.editReply(forecastMessage);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Could not retrieve forecast for that zipcode. Please try again.');
        }
    }
});

async function getCoordsFromZip(zipcode) {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${openweathermap_api_key}`;
    const response = await axios.get(url);
    return { lat: response.data.lat, lon: response.data.lon, name: response.data.name };
}

async function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweathermap_api_key}&units=imperial`;
    const response = await axios.get(url);
    return response.data;
}

async function getForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openweathermap_api_key}&units=imperial`;
    const response = await axios.get(url);
    return response.data;
}

function formatForecast(forecast, locationName) {
    const dailyForecasts = forecast.list.filter(reading => reading.dt_txt.includes("12:00:00"));

    let message = `5-Day Forecast for ${locationName}:\n`;
    dailyForecasts.forEach(reading => {
        const date = new Date(reading.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        message += `**${day}**: ${reading.weather[0].main}, ${reading.main.temp}°F\n`;
    });
    return message;
}

client.login(token);
