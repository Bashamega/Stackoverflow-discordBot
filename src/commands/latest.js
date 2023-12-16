import { EmbedBuilder } from "discord.js"
import axios from "axios"
export default async function latest(interaction){
    axios.get('https://api.stackexchange.com/2.3/questions?page=1&pagesize=5&order=desc&sort=creation&site=stackoverflow').then((response)=>{
        const questions = response.data.items;
        const latest = new EmbedBuilder()
        .setTitle('Latest Stack Overflow Questions')
        .setColor("#e5721f")
        .setFooter({text:'Created By Adam Basha'})
        questions.forEach((question, index) => {
            latest.addFields({
                name:`${index + 1}. ${question.title}`,
                value: `[open](${question.link})`
            })
        });
        interaction.reply({embeds: [latest]})

    }).catch(e=>{
        interaction.reply("An error has occured please try again later");
        console.log(e)
    })
}