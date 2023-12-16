import { EmbedBuilder } from "discord.js"

export default async function help(interaction){
    const latest = new EmbedBuilder()
        .setTitle('Help')
        .setColor("#e5721f")
        .addFields({
            name: 'latest',
            value: 'Get the latest 5 questions'
        },{
            name: 'hot',
            value: 'The top 5 hot questions'
        },{
            name: 'collectives',
            value: 'Get the first 25 collectives on stack Overflow by alphabetical order'
        },{
            name: 'search',
            value: 'Search on stack Overflow'
        },{name: 'tags',value:'view the top 5 tags'}, {name:'users', value:"View the top 25 users by reputation"}, {name:'userinfo', value:'Get info about a specific user'})
        .setFooter({text:'Created By Adam Basha'})

    interaction.reply({embeds: [latest], ephemeral: true})
}