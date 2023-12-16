import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js"
import axios from "axios"
import he from 'he'
export default async function search(interaction, query){
    if(query){
        const  url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${query}&site=stackoverflow`
        axios.get(url).then((response)=>{
            const questions = response.data.items;
            if(questions.length == 0 ){
                interaction.reply('No question is found. Please try another search querry')
            }else{
                if(questions.length == 1){
                    const question = questions[0]
                    let tags = ""
                    const date = new Date(question.creation_date * 1000);
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
                    const day = date.getDate().toString().padStart(2, '0');

                    // Format the date as MM/DD/YYYY
                    const formattedDate = `${month}/${day}/${year}`;

                    question.tags.forEach((tag)=>{
                        if(tags ==""){
                            tags = tag
                        }else{
                            tags =`${tags}, ${tag}`
                        }
                    })
                    const result = new EmbedBuilder()
                    .setTitle(he.decode(question.title))
                    .addFields({
                        name:'Author:',
                        value: `[${he.decode(question.owner.display_name)}](${question.owner.link})`
                    })
                    .addFields({
                        name: 'Tags:',
                        value: tags
                    })
                    .addFields({
                        name: "Answered:",
                        value: question.is_answered?"yes":"no"
                    })
                    .addFields({
                        name:'Views:',
                        value: `${question.view_count}`
                    })
                    .addFields({
                        name: 'Creation Date:',
                        value:formattedDate
                    })
                    .setFooter({text:'Created By Adam Basha'})
                    const button = new ButtonBuilder()
                    .setLabel('Open')
                    .setStyle(ButtonStyle.Link)
                    .setURL(question.link)


                    const row = new ActionRowBuilder()
                    .addComponents(button)
                    interaction.reply({embeds: [result], components: [row], ephemeral: true})
                    
                }else{
                    const search = new EmbedBuilder()
                        .setTitle('The top hotest questions on Stack Overflow')
                        .setColor("#e5721f")
                        .setFooter({text:'Created By Adam Basha'})
                    questions.forEach((question, index) => {
                    if(index <25){
                        search.addFields({
                            name:`${index + 1}. ${he.decode(question.title)} #${question.question_id}`,
                            value: `[open](${question.link})`
                            }) 
                        }
                        
                    });
                    interaction.reply({embeds: [search]})
                }

            }
            

        }).catch(e=>{
            interaction.reply("An error has occured please try again later");
            console.log(e)
        })
    }else{
        interaction.reply("Please provide a search querry")
    }
    
}