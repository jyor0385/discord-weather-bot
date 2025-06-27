
# Discord Weather Bot

A simple Discord bot that provides the current weather for a given US zipcode.  This was a simple experiment with Gemini-CLI.  Building the bot took no more than 3 or 4 minutes.  I take no credit as I have practically no experience with node.js or building discord bots.  Gemini did all the work of building.  The most challenging part for me was installing it.  Isn't AI wonderful? (I'm scared...)

## Features

- Fetches current weather data using the OpenWeatherMap API.
- Responds to `/weather` and `/forecast` slash commands to provide current or forcasted weather respectively.
- Can take a zipcode as an argument.
- If no zipcode is provided, the bot will prompt the user to enter one.

## Installation

1. **Prerequisites:**
   - [Node.js](https://nodejs.org/) (v16.6.0 or newer)
   - A Discord Bot Token. You can create a bot and get a token from the [Discord Developer Portal](https://discord.com/developers/applications).
   - An API key from [OpenWeatherMap](https://openweathermap.org/api).

2. **Clone the repository or download the files:**
   ```bash
   git clone https://github.com/your-username/discord-bot.git
   cd discord-bot
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Configuration:**
   Create a file named `config.json` in the root directory of the project and add the following content. Replace the placeholder values with your actual credentials.

   ```json
   {
       "token": "YOUR_DISCORD_TOKEN",
       "openweathermap_api_key": "YOUR_OPENWEATHERMAP_API_KEY",
       "clientId": "YOUR_BOTS_CLIENT_ID",
       "guildId": "YOUR_TEST_SERVER_ID"
   }
   ```
   - `token`: Your Discord bot's token.
   - `openweathermap_api_key`: Your OpenWeatherMap API key.
   - `clientId`: Your bot's application/client ID.
   - `guildId`: The ID of the Discord server where you want to test the commands instantly. This is optional for global commands but recommended for development.

5. **Register Slash Commands:**
   Run the following command once to register the `/weather` command with Discord.
   ```bash
   node deploy-commands.js
   ```

## Usage

1. **Start the bot:**
   ```bash
   node index.js
   ```

2. **Use the command in Discord:**
   In a channel where the bot has permissions, type:
   - `/weather zipcode: 12345`
   - `/weather` (The bot will then ask you to provide a zipcode).
   - `/forecast zipcode: 12345`
   - `/forecast` (The bot will then ask you to provide a zipcode).

## Dependencies

- [discord.js](https://discord.js.org/): A powerful Node.js module for interacting with the Discord API.
- [axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
- [@discordjs/builders](https://www.npmjs.com/package/@discordjs/builders): A utility package for creating slash command builders.
- [@discordjs/rest](https://www.npmjs.com/package/@discordjs/rest): A utility package for making REST API requests to Discord.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
