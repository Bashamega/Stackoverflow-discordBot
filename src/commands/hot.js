import { EmbedBuilder } from "discord.js"
import axios from "axios"
import he from 'he';
export default async function hot(interaction){
    axios.get('https://api.stackexchange.com/2.3/questions?page=1&pagesize=5&order=desc&sort=hot&site=stackoverflow').then((response)=>{
        const questions = response.data.items;
        const latest = new EmbedBuilder()
        .setTitle('The top hotest questions on Stack Overflow')
        .setColor("#e5721f")
        .setFooter({text:'Created By Adam Basha'})
        questions.forEach((question, index) => {
            latest.addFields({
                name:`${index + 1}. ${he.decode(question.title)}`,
                value: `[open](${question.link})`
            })
        });
        interaction.reply({embeds: [latest], ephemeral: true})

    }).catch(e=>{
        interaction.reply("An error has occured please try again later");
        console.log(e)
    })
}