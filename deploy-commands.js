
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('weather').setDescription('Replies with the weather for a given zipcode.')
        .addStringOption(option => option.setName('zipcode').setDescription('The zipcode to get the weather for').setRequired(true)),
    new SlashCommandBuilder().setName('forecast').setDescription('Replies with the 5-day forecast for a given zipcode.')
        .addStringOption(option => option.setName('zipcode').setDescription('The zipcode to get the forecast for').setRequired(true)),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
