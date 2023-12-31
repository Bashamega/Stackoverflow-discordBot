import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import axios from "axios";
import he from 'he'
export default async function info(interaction, id) {
        if (id) {
            const url = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`;
            axios.get(url).then((response) => {
                const questions = response.data.items;
                const question = questions[0];
                let tags = "";
                const date = new Date(question.creation_date * 1000);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
                const day = date.getDate().toString().padStart(2, '0');
                const formattedDate = `${month}/${day}/${year}`;
                question.tags.forEach((tag) => {
                    if (tags === "") {
                        tags = tag;
                    } else {
                        tags = `${tags}, ${tag}`;
                    }
                });
                const result = new EmbedBuilder()
                    .setTitle(he.decode(question.title))
                    .addFields(
                        { name: 'Author:', value: `[${he.decode(question.owner.display_name)}](${question.owner.link})` },
                        { name: 'Tags:', value: tags },
                        { name: "Answered:", value: question.is_answered ? "yes" : "no" },
                        { name: 'Views:', value: `${question.view_count}` },
                        { name: 'Creation Date:', value: formattedDate }
                    )
                    .setFooter({text:'Created By Adam Basha'});
                const button = new ButtonBuilder()
                    .setLabel('Open')
                    .setStyle(ButtonStyle.Link)
                    .setURL(question.link);
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
