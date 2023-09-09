const fs = require("fs");
const axios = require("axios");
const path = require("path");
const package = require("../package.json");
let mergedCommands = [
  "help",
  "h",
  "menu",
  "sc",
  "support",
  "supportgc",
  "script",
  "system",
  "info",
  "about",
];

module.exports = {
  name: "systemcommands",
  alias: [...mergedCommands],
  uniquecommands: ["script", "support", "help", "system", "about"],
  description: "All system commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const pic = fs.readFileSync("./Assets/rudhra2.jpg");
    switch (inputCMD) {
      case "script":
      case "sc":
      case "git":
        await doReact("🗒️");
        let repoInfo = await axios.get(
          "https://api.github.com/repos/princerudh/rudhra-md"
        );
        let repo = repoInfo.data;
        console.log(repo);
        let txt = `              *${botName}'ꜱ ꜱᴄʀɪᴘᴛ*  \n\n*⿻ Total Forks:* ${
          repo.forks_count
        }\n*⿻ Total Stars:* ${repo.stargazers_count}\n*⿻ License:* ${
          repo.license.name
        }\n*⿻ Repo Size:* ${(repo.size / 1024).toFixed(
          2
        )} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:* ${
          repo.html_url
        }\n`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt }, { quoted: m });
        break;

      case "support":
      case "supportgc":
        await doReact("📱");
        m.reply(`ᴄʜᴇᴄᴋ ʏᴏᴜʀ ᴅᴍ.  *${pushName}* \n\nɪ ʜᴀᴠᴇ ꜱᴇɴᴛ ʏᴏᴜ ꜱᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ʟɪɴᴋ ᴘᴇʀꜱᴏɴᴀʟʟʏ.`)
        let botpic = botImage1
        let txt2 = `            ⦿ *ʀᴜᴅʜʀᴀ ɢʀᴏᴜᴘ ʟɪɴᴋ* ⦿\n\n*Link:* ${suppL}\n\n*ɴᴏᴛᴇ:* ᴘʟᴇᴀꜱᴇ ᴅᴏɴ'ᴛ ꜱᴘᴀᴍ ɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ, ᴀɴᴅ ᴅᴏɴ'ᴛ ᴍᴇꜱꜱᴀɢᴇ *ᴀᴅᴍɪɴꜱ ᴅɪʀᴇᴄᴛʟʏ* ᴡɪᴛʜᴏᴜᴛ ᴘᴇʀᴍɪꜱꜱɪᴏɴ. ᴀꜱᴋ ꜰᴏʀ ʜᴇʟᴘ ɪɴ *ɢʀᴏᴜᴘ*.\n\nᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴜꜱɪɴɢ ʀᴜᴅʜʀᴀ`;
        await Atlas.sendMessage(m.sender,{ image:{url:botpic}, caption: txt2 }, { quoted: m });
        break;

      case "help":
      case "h":
      case "menu":
        await doReact("☃️");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `├┌──❮ *${capitalizedFile}* ❯\n││ \n`;
            formatted += `${commands
              .map((cmd) => `││◦ ${prefix + cmd}`)
              .join("\n")}\n│└───────────⭓\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `┌───❮ *RUDHRA-MD* ❯──•
│┌───────────────◉
││ *Hello*👋 *${pushName}* ,
││ *ʙᴏᴛɴᴀᴍᴇ* : ʀᴜᴅʜʀᴀ-ᴍᴅ
││ *ᴠᴇʀѕɪᴏɴ*      : 𝟹.𝟶.𝟶
││ *ʟᴀɴɢᴜᴀɢᴇ*  : ᴇɴɢʟɪѕʜ
││ *ᴡᴏʀᴋ ᴛʏᴘᴇ* : 
││ *ᴘʀᴇꜰɪx*         :   *${prefix}*
││ 
││       █║▌║▌║║▌║ █
││       © 𝙿𝚁𝙸𝙽𝙲𝙴 𝚁𝚄𝙳𝙷
│└───────────────◉
│    ⦙☰ *ALL MENU LIST*\n${formattedCommands}\n└─────────────◉\n\n*© ᴛᴇᴀᴍ ʀᴜᴅʜʀᴀッ*`;
        await Atlas.sendMessage(
          m.from,
          { image: { url: botImage1 }, caption: helpText },
          { quoted: m }
        );

        break;

      case "system":
      case "info":
      case "about":
        await doReact("🔰");
        let xyz = await axios.get(
          "https://api.github.com/repos/princerudh/rudhra-md/releases"
        );
        let latest = xyz.data[0].tag_name;
        const version2 = package.version;
        let nodeVersion = process.version;
        let os = process.platform;
        let osVersion = process.release.lts;
        let architecture = process.arch;
        let computername = process.env.COMPUTERNAME;
        let os2 = process.env.OS;
        let cpu2 = process.env.PROCESSOR_IDENTIFIER;
        let core = process.env.NUMBER_OF_PROCESSORS;

        let txt4 = `            🧣 *System Info* 🧣


*〄 Node Version:* ${nodeVersion}

*〄 OS:* ${os2}

*〄 Platform:* ${os}

*〄 Os Version:* ${osVersion}

*〄 Computer Name:* ${computername}

*〄 CPU:* ${cpu2}

*〄 CPU Core:* ${core}

*〄 CPU Architecture:* ${architecture}

*〄 Current Bot version:* ${latest}

*〄 Latest Bot version:* ${latest}
`;

        if (latest.includes(version2) || version2.includes(latest)) {
          txt4 += `\n\n*⚠️ Bot Update Available:*`;
        } else txt4 += `\n\n*🔰 Bot is up to date.*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt4 }, { quoted: m });

        break;

      default:
        break;
    }
  },
};
