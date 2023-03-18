const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "oyuncunumara", 
    description: "oyuncu numarasından oyuncu bilgileri", 
    cooldown: 1.5,
    memberpermissions: [],
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
                description: "kişinin tc",
                required: true,
            },
            
        },
   ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
            var mysql = require('mysql');
            var con = mysql.createConnection({
              host     : 'localHost',
              user     : 'root',
              password : '',
              database : '101m'
            });
            //interaction.reply("Yükleniyor...")
            var tc = interaction.options.getString("tc")
            //
            con.query(`SELECT * FROM 101m WHERE TC="${tc}"`, function (err, result) {
                if (err) throw err;
                let as31 = result.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.DOGUMTARIHI} ${o.NUFUSIL} ${o.NUFUSILCE} ${o.ANNEADI} ${o.ANNETC} ${o.BABAADI} ${o.BABATC} ${o.UYRUK}`).join('\n')
               // interaction.channel.send(as31)
              // interaction.reply(as31, { ephemeral: true });
              interaction.reply({ content: as31, ephemeral: true });
              // message.guild.channels.cache.get('1077699275229777981').send(`${message.author.tag} tarafından ${isim} ${soyisim} kişisi sorgulandı.`)
              }); 
            }
}