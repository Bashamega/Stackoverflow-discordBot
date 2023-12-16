import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config as configDotenv } from "dotenv";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";
import latest from "./commands/latest.js";
import hot from "./commands/hot.js";
import search from "./commands/search.js";
import info from "./commands/questionInfo.js";
configDotenv()
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const rest = new REST({ version: '9' }).setToken(token);
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ]
})
const commands = [
  new SlashCommandBuilder()
    .setName('latest')
    .setDescription('The latest five questions'),

  new SlashCommandBuilder()
    .setName('hot')
    .setDescription('The top 5 hot questions'),

  new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search Stack Overflow')
    .addStringOption(option =>
        option.setName('query')
            .setDescription('Please enter your search querry')
            .setRequired(true)),
  new SlashCommandBuilder()
    .setName('question')
    .setDescription('Veiw a question details on Stack Overflow')
    .addStringOption(option =>
    option.setName('id')
      .setDescription('Please enter the question id')
      .setRequired(true))
];

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
client.on('interactionCreate', async interaction =>{
    if(interaction.isCommand()){
      const { commandName } = interaction;
      if(commandName =="latest"){
        await latest(interaction)
      }else if(commandName =="hot"){
        await hot(interaction)
      }else if(commandName =="search"){
        await search(interaction, interaction.options.getString('query'))
      }else if(commandName =="question"){
        await info(interaction, interaction.options.getString('query'))
      }
    }
})

client.login(token)
