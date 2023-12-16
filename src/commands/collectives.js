import { EmbedBuilder } from "discord.js"
import axios from "axios"

export default async function collectives(interaction){
    axios.get('https://api.stackexchange.com/2.3/collectives?order=desc&max=25&sort=name&site=stackoverflow').then((response)=>{
        const collectives = response.data.items;
        const latest = new EmbedBuilder()
        .setTitle('The top collectives on Stack overflow')
        .setColor("#e5721f")
        .setFooter({text:'Created By Adam Basha'})
        collectives.forEach((collective, index) => {
            latest.addFields({
                name:`${index + 1}. ${collective.name}`,
                value: `[View](https://stackoverflow.com/${collective.link})`
            })
        });
        interaction.reply({embeds: [latest], ephemeral: true})

    }).catch(e=>{
        interaction.reply("An error has occured please try again later");
        console.log(e)
    })
}