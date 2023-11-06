const keepalive = require('./keep_alive.js');
const express = require('express');
const app = express();
app.get("/", (req, res) => {
  res.send("Hello world!");
})


const { Client, GatewayIntentBits, ActivityType, Routes, CommandInteraction, PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const schedule = require('node-schedule');
require('dotenv/config');

const { REST } = require('@discordjs/rest');
const token = (process.env.token);
const clientid = (process.env.client_id);
const guildid = (process.env.guild_id);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(token)

client.on('ready', () => {
  console.log('running');
  client.user.setActivity("Sub to Grand priest YT", { type: ActivityType.Watching });
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === "ping") {
    message.reply("pong");
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.commandName === "ping") {
    interaction.reply("pong")
  }
  else if (interaction.commandName === "about") {
    interaction.reply("The bot is currently in development")
  }
  else if (interaction.commandName === "membercount") {
    let serverInfoEmb = new EmbedBuilder()
      .setTitle(`Server member count for ${interaction.guild.name}`)
      .setFields(
        {
          name: "Server owner:", value: "Ahmed dragon ball(Ultra vegito)",
        },
        {
          name: "Created at:", value: `${interaction.guild.createdAt}`,
        },
      )
      .setDescription(`Server member count ${interaction.guild.memberCount}`)
      .setThumbnail(`${interaction.guild.iconURL()}`)
      .setColor('Random');
    interaction.reply({ embeds: [serverInfoEmb] })
  }

  else if (interaction.commandName === "userinfo") {
    const useri = client.users.fetch(interaction.options.getUser('user'), { force: true });
    const userb = interaction.options.getUser('user');
    let userEmb = new EmbedBuilder()
      .setTitle("User info")
      .setDescription(`Selected user ${userb}`)
      .setThumbnail(userb.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
      })
      .addFields(
        {
          name: "Username:", value: `${userb.tag}`
        },
        {
          name: "ID(this is not the user token):", value: `${userb.id}`
        },
      )
    interaction.reply({ embeds: [userEmb] });
  }
  else if (interaction.commandName === "report") {
    const user_reported = interaction.options.getUser('user');
    const user_report_reason = interaction.options.getString('reason');
    const reportembed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
      .setColor('Red')
      .setTitle(`New user reported (${user_reported.tag})`)
      .addFields(
        {
          name: "User", value: `${user_reported.tag}`, inline: true,
        },
        {
          name: "Reason", value: `${user_report_reason}`, inline: true,
        }
      )
    const reported_1_embd = new EmbedBuilder()
      .setTitle(":white_check_mark: User has been reported")
      .setColor("Green")

    client.channels.fetch('1042813335701307552').then(channel => channel.send({ embeds: [reportembed] }))
    interaction.reply({ embeds: [reported_1_embd], ephemeral: true });
  }
  else if (interaction.commandName === "coinflip") {
    let coinimg = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png"
    let coin = ["Heads", "Tails"];
    let side = coin[Math.floor(Math.random() * coin.length)];
    const side_embd_1 = new EmbedBuilder()
      .setTitle("Coin flip")
      .setDescription(`You got ${side}`)
      .setColor('#e1b530')
      .setThumbnail(coinimg)
    interaction.reply({ embeds: [side_embd_1] });
  }
  else if (interaction.commandName === "lol") {
    interaction.reply({ ephemeral: true, content: "it actually doesn't do anything lol" })
  }
  else if (interaction.commandName === "schedule2023") {
    let message = interaction.options.getString('message');
    let channel = interaction.options.getChannel('channel');
    let time = 1932000000;
    let date = new Date(new Date().getTime() + time)
    interaction.reply(`message scheduled for ${date}`)
    schedule.scheduleJob(date, () => {
      channel.send({ content: message })
    })
  }
  else if (interaction.commandName == "User info") {
    const userb = interaction.targetMember;
    let userEmb = new EmbedBuilder()
      .setTitle("User info")
      .setDescription(`Selected user ${userb}`)
      .setThumbnail(userb.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
      })
      .addFields(
        {
          name: "Username:", value: `${userb.user.tag}`
        },
        {
          name: "ID(this is not the user token):", value: `${userb.id}`
        },
      )
    interaction.reply({ embeds: [userEmb] });
  }
  else if (interaction.commandName == "Report user") {
    const reportmodalapp = new ModalBuilder()
      .setCustomId('reportusermodal')
      .setTitle('Report user')
      .setComponents(
        new ActionRowBuilder().setComponents(
          new TextInputBuilder().setCustomId('reportreason').setLabel('Report reason').setStyle(TextInputStyle.Paragraph).setRequired(true)
        )
      )
    await interaction.showModal(reportmodalapp)
    const reportmodalsubmit = await interaction.awaitModalSubmit({
      filter: (i) => {
        return true;
      },
      time: 120000
    });
    const user_reported = interaction.targetUser;
    const user_report_reason = reportmodalsubmit.fields.getTextInputValue('reportreason');
    const reportembed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
      .setColor('Red')
      .setTitle(`New user reported (${user_reported.tag})`)
      .addFields(
        {
          name: "User", value: `${user_reported.tag}`, inline: true,
        },
        {
          name: "Reason", value: `${user_report_reason}`, inline: true,
        }
      )
    const reported_1_embd = new EmbedBuilder()
      .setTitle(":white_check_mark: User has been reported")
      .setColor("Green")
    client.channels.fetch('1042813335701307552').then(channel => channel.send({ embeds: [reportembed] }))
    reportmodalsubmit.reply({ embeds: [reported_1_embd], ephemeral: true });
  }
});
async function main() {
  const commands = [{
    name: 'ping',
    description: 'says pong',
    dm_permission: true
  },
  {
    name: "about",
    description: "about the bot",
    dm_permission: true
  },
  {
    name: "lol",
    description: "does literally nothing lol",
    dm_permission: false
  },
  {
    name: "membercount",
    description: "member count of the server",
    dm_permission: false
  },
  {
    name: "userinfo",
    description: "Gives info of the selected user",
    options: [
      {
        type: 6,
        required: true,
        name: "user",
        description: "users"
      },
    ],
    dm_permission: false
  },
  {
    name: "report", description: "report a user",
    dm_permission: false,
    options: [
      {
        type: 6,
        required: true,
        name: 'user',
        description: 'user',
      },
      {
        type: 3,
        required: true,
        name: 'reason',
        description: 'reason',
      },
    ],
  },
  {
    name: "coinflip",
    description: "flip a coin",
    dm_permission: false
  },
  // {
  //   name: "schedule2023",
  //   dm_permission: false,
  //   description: "schedule a message",
  //   permissions: true,
  //   default_member_permissions: 0x0000000000000008,
  //   options: [
  //     {
  //       type: 3,
  //       required: true,
  //       name: 'message',
  //       description: 'message'
  //     },
  //     {
  //       type: 7,
  //       required: true,
  //       name: 'channel',
  //       description: 'channel'
  //     },
  //     {
  //       type: 3,
  //       required: true,
  //       name: 'date',
  //       description: 'date'
  //     },
  //   ]
  // },
  {
    name: 'User info',
    type: 2
  },
  {
    name: 'Report user',
    type: 2
  },
  {
    name: 'Report message',
    type: 3
  },
  ];
  try {
    Routes.applicationCommands
    await rest.put(Routes.applicationCommands(clientid), {
      body: commands
    })
  } catch (err) {
    console.log(err)
  }
}

main();

client.login(token);