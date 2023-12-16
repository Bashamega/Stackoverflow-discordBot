import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import axios from "axios";
import he from 'he'
export default async function userInfo(interaction, id) {
        if (id) {
            const url = `https://api.stackexchange.com/2.3/users/${id}?order=desc&sort=reputation&site=stackoverflow`;
            axios.get(url).then((response) => {
                const user = response.data.items[0];
                const date = new Date(user.creation_date * 1000);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
                const day = date.getDate().toString().padStart(2, '0');
                const formattedDate = `${month}/${day}/${year}`;
                const result = new EmbedBuilder()
                    .setTitle(he.decode(user.display_name))
                    .setThumbnail(user.profile_image)
                    .addFields(
                        { name: 'Name:', value: user.display_name },
                        {name:'Location:', value: user.location ? user.location : "null"},
                        { name: 'Reputation:', value: `${user.reputation}` },
                        { name: "Website:", value: user.website_url ? user.website_url : "null" },
                        { name: 'User Creation Date:', value: `${formattedDate}` },
                    )
                    .setFooter({text:'Created By Adam Basha'});
                const button = new ButtonBuilder()
                    .setLabel('Open')
                    .setStyle(ButtonStyle.Link)
                    .setURL(user.link);
                const row = new ActionRowBuilder()
                    .addComponents(button);
                interaction.reply({ embeds: [result], components: [row], ephemeral: true });
            }).catch(e => {
                interaction.reply('Invalid id. Please enter a valid id')
            });
        } else {
        interaction.reply("Please provide an id");
        }

    
}
