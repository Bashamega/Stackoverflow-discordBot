import { EmbedBuilder } from "discord.js"
import axios from "axios"
import he from 'he';
export default async function users(interaction){
    axios.get('https://api.stackexchange.com/2.3/users?pagesize=25&order=desc&sort=reputation&site=stackoverflow').then((response)=>{
        const res = response.data.items;
        const latest = new EmbedBuilder()
        .setTitle('Stackoverflow members')
        .setColor("#e5721f")
        .setFooter({text:'Created By Adam Basha'})
        res.forEach((user, index) => {
            latest.addFields({
                name:`${index + 1}. ${he.decode(user.display_name)}`,
                value: `[View Profile](${user.link})`
            })
        });
        interaction.reply({embeds: [latest], ephemeral: true})

    }).catch(e=>{
        interaction.reply("An error has occured please try again later");
        console.log(e)
    })
}