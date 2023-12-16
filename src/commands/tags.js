import { EmbedBuilder } from "discord.js"
import axios from "axios"

export default async function tags(interaction){
    axios.get('https://api.stackexchange.com/2.3/tags?pagesize=5&order=desc&sort=popular&site=stackoverflow').then((response)=>{
        const questions = response.data.items;
        const latest = new EmbedBuilder()
        .setTitle('The top 5 tags on Stack overflow')
        .setColor("#e5721f")
        .setFooter({text:'Created By Adam Basha'})
        questions.forEach((question, index) => {
            latest.addFields({
                name:`${index + 1}. ${question.name}`,
                value: `[View](https://stackoverflow.com/questions/tagged/${question.name})`
            })
        });
        interaction.reply({embeds: [latest], ephemeral: true})

    }).catch(e=>{
        interaction.reply("An error has occured please try again later");
        console.log(e)
    })
}