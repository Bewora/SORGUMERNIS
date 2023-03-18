const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "tc-gsm", //the command name for the Slash Command
    description: "oyuncu numarasından den telefon numarası bulma", //the command description for Slash Command Overview
    cooldown: 1.5,
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: ["1073502689067028581"], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!	
        //INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
        //{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
        //{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
        //{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
        //{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
        //{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
        //{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
        {
            "String":
            {
                name: "tc",
                description: "kişinin tcsi",
                required: true,
            },
            
        },
        
        //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
    ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
            var mysql = require('mysql');
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "illegalplatform_hackerdede1_gsm"
              });
            //interaction.reply("Yükleniyor...")
            var tc = interaction.options.getString("tc")
            //
            con.query(`SELECT * FROM illegalplatform_hackerdede1_gsm WHERE TC="${tc}"`, function (err, result) {
                let data = JSON.parse(JSON.stringify(result))
              if (err) throw err;
              data.map((o) => console.log(o.GSM))
              //message.reply(require('util').inspect(result));
    
              if(data.length < 1) return interaction.reply({ content: "Görünüşe göre bir sonuç bulunamadı bunun sebebi aşağıdaki maddelerden biri olabilir. \n ・ Sorguladığınız kişinin yaşı küçükse telefon numarası kişinin anne veya babasına kayıtlı olabilir \n ・ Eğer kişi telefon numarasını yakın bir zamanda almış ise sistemlerimizde kayıtlı olmayabilir", ephemeral: true })
              if(tc.startsWith('0')) return interaction.reply(`Eksik veya Hatalı Kullanım`)
              let arr = []
              for ( const obj of result) {
                arr.push(obj.TC)

              }
    //data.map((o) => interaction.channel.send(`:tada: ${tc}'ye ait bilgiyi buldum. \n ${o.GSM}`))
   // interaction.reply({ content: `:tada: ${tc}'ye ait bilgiyi buldum. \n ${o.GSM}`, ephemeral: true });
   data.map((o) => interaction.user.send({ content: `:tada: ${tc}'ye ait bilgiyi buldum. \n ${o.GSM}`, ephemeral: true }))
   interaction.reply({ content: "**Başarılı**, DM Adresine Gönderildi (dm adresiniz kapalı ise bot mesaj gönderemez)", ephemeral: true })
    // message.guild.channels.cache.get('1086588175801135205').send(`${message.author.tag} tarafından ${isim} ${soyisim} kişisi sorgulandı.`)
              }); 
            }
}