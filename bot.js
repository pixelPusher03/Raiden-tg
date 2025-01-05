const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const { Client } = require('ssh2'); 
const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');

const token = config.token;
const adminId = config.admin;
const bot = new TelegramBot(token, { polling: true });

const sendMessage = (chatId, text) => bot.sendMessage(chatId, text);
function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
function getRandom() {
  return Math.random().toString(36).substring(2, 10);
}
function getRuntime(startTime) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours} Jam ${minutes} Menit ${seconds} Detik`;
}
const nama = 'DanzyDev - Assisten';
const author = 'DanzyDev - Assisten';
const donasiData = {
   pesan: 'BOT THEY TURNED ON 🤓\nDO NOT BUY THIS SC BECAUSE THIS SC IS FREE!!, DO YOU KNOW HOW TO BUY IT? 50K FINE\nOWNER SCRIPT @sacatechincbot'
};
const startTime = Date.now();
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const me = await bot.getMe();
    const url = 'https://t.me/sacatechincbot'; 

    await bot.sendChatAction(chatId, 'upload_photo');
    await delay(3000); 
    
    const menuText = `
Hello, This is ${me.username ? `@${me.username}` : `[${me.first_name}](tg://user?id=${me.id})`}, Bot Telegram UltramenUbot v1.0

- I N F O F I T U R
• /installpanel (V20)
• /installpanelv2 (V22/24)
• /wingsstart

Developer : <a href='${url}'>sacatechincbot</a>
TestiDeveloper : <a href='https://whatsapp.com/channel/0029VahIMBs5kg7Eu2Dhtw1y'>𝗠𝗬 𝗧𝗘𝗦𝗧𝗜</a>
Room Public : <a href='https://chat.whatsapp.com/KKszwKfksZd8Ks48mTK8M8'>𝗠𝗬 𝗥𝗢𝗢𝗠</a>
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'TestiMoni', url: 'https://t.me/testimonifahrioffic' }, { text: 'Owner', url: 'https://t.me/sacatechincbot' }]
            ]
        }
    };
    const imageUrl = 'https://img100.pixhost.to/images/843/542248152_skyzopedia.jpg';
    await bot.sendPhoto(chatId, imageUrl, {
        caption: menuText,
        parse_mode: 'HTML',
        reply_markup: keyboard.reply_markup
    });
});
//<!======== Fitur Install Panel =========!>//
bot.onText(/^(\.|\#|\/)installpanel$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Fomati isiriyo!\nKushandisa:/installpanel ipvps,password,domainpnl,domainnode,ramvps (example: 8000 = ram 8\nscript by @sacatechincbot`);
  });
bot.onText(/\/installpanel (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const t = text.split(',');
  if (config.admin.includes(String(msg.from.id))) {
  if (t.length < 3) {
    return bot.sendMessage(chatId, 'Format salah!\nPenggunaan: /installpanel ipvps,password,domainpnl,domainnode,ramvps ( contoh : 8000 = ram 8\nscript by @sacatechincbot');
  }
  const ipvps = t[0];
  const passwd = t[1];
  const subdomain = t[2];
  const domainnode = t[3];
  const ramvps = t[4];
  const connSettings = {
    host: ipvps,
    port: 22,
    username: 'root',
    password: passwd
  };
 let password = generateRandomPassword();
 const command = 'bash <(curl -s https://pterodactyl-installer.se)';
 const commandWings = 'bash <(curl -s https://pterodactyl-installer.se)';  
 const conn = new Client();

  conn.on('ready', () => {
    sendMessage(chatId, `THE INSTALLATION PROCESS IS IN PROGRESS PLEASE WAIT 5-10 MINUTES\nscript by @sacatechincbot`);
    conn.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on('close', (code, signal) => {
        console.log(`Stream closed with code ${code} and signal ${signal}`);
        installWings(conn, domainnode, subdomain, password, ramvps);
      }).on('data', (data) => {
        handlePanelInstallationInput(data, stream, subdomain, password);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(connSettings);
  
  async function installWings(conn, domainnode, subdomain, password, ramvps) {
        sendMessage(chatId, `PROSES PENGINSTALLAN WINGS SEDANG BERLANGSUNG MOHON TUNGGU 5 MENIT\nscript by @sacatechincbot`);
        conn.exec(commandWings, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Wings installation stream closed with code ${code} and signal ${signal}');
                createNode(conn, domainnode, ramvps, subdomain, password);
            }).on('data', (data) => {
                handleWingsInstallationInput(data, stream, domainnode, subdomain);
        }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }

    async function createNode(conn, domainnode, ramvps, subdomain, password) {
        const command = 'bash <(curl -s https://raw.githubusercontent.com/Fahrihosting1/thema/main/install.sh)';
        sendMessage(chatId, `MEMULAI CREATE NODE & LOCATION\nscript by @sacatechincbot`);     
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Node creation stream closed with code ${code} and ${signal} signal');
                conn.end();
                sendPanelData(subdomain, password);
            }).on('data', (data) => {
                handleNodeCreationInput(data, stream, domainnode, ramvps);
        }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }
        
   // Func Handler 'sendPanelData' 
    function sendPanelData(subdomain, password) {
        sendMessage(chatId,`DATA PANEL ANDA\n\nUSERNAME: admin\nPASSWORD: ${password}\nLOGIN: ${subdomain}\n\nNote: All installations have been completed. Please create an allocation on the node created by the bot and take the configuration token and type .startwings (token) \nNote: PLEASE WAIT 1-5 MINUTES FOR THE WEB TO BE IN  @sacatechincbot`);
    }
    
   // Func Handler 'handlePanelInstallationInput' 
   function handlePanelInstallationInput(data, stream, subdomain, password) {
        if (data.toString().includes('Input')) {
            stream.write('0\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1248\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('Asia/Jakarta\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('adm\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('adm\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${password}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write(`${subdomain}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('yes\n');
        }
        if (data.toString().includes('Please read the Terms of Service')) {
            stream.write('A\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1\n');
        }
        console.log('STDOUT: ' + data);
    }
    
    // Func Handler 'handleWingsInstallationInput'
    function handleWingsInstallationInput(data, stream, domainnode, subdomain) {
        if (data.toString().includes('Input')) {
            stream.write('1\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${subdomain}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('user\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1248\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${domainnode}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        console.log('STDOUT: ' + data);
    }

    function handleNodeCreationInput(data, stream, domainnode, ramvps) {
        stream.write('fahristock\n');
        stream.write('4\n');
        stream.write('SGP\n');
        stream.write('Autonode WannFyy\n');
        stream.write(`${domainnode}\n`);
        stream.write('NODES\n');
        stream.write(`${ramvps}\n`);
        stream.write(`${ramvps}\n`);
        stream.write('1\n');
        console.log('STDOUT: ' + data);
    }
  } else {
      bot.sendMessage(chatId, 'This feature is specifically for my owners!!!');
    }
});
bot.onText(/^(\.|\#|\/)installpanelv2$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Incorrect format!\nUsage: /installpanelv2 ipvps,password,domainpnl,domainnode,ramvps ( contoh : 8000 = ram 8\nscript by @sacatechincbot`);
  });
bot.onText(/\/installpanelv2 (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const t = text.split(',');
  if (config.admin.includes(String(msg.from.id))) {
  if (t.length < 3) {
    return bot.sendMessage(chatId, 'Incorrect format!\nUsage: /installpanelv2 ipvps,password,domainpnl,domainnode,ramvps ( contoh : 8000 = ram 8\nscript by @sacatechincbot');
  }
  const ipvps = t[0];
  const passwd = t[1];
  const subdomain = t[2];
  const domainnode = t[3];
  const ramvps = t[4];
  const connSettings = {
    host: ipvps,
    port: 22,
    username: 'root',
    password: passwd
  };
 let password = generateRandomPassword();
 const command = 'bash <(curl -s https://pterodactyl-installer.se)';
 const commandWings = 'bash <(curl -s https://pterodactyl-installer.se)';  
 const conn = new Client();

  conn.on('ready', () => {
    sendMessage(chatId, `THE INSTALLATION PROCESS IS IN PROGRESS PLEASE WAIT 5-10 MINUTES\nscript by @sacatechincbot`);
    conn.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on('close', (code, signal) => {
        console.log(`Stream closed with code ${code} and signal ${signal}`);
        installWings(conn, domainnode, subdomain, password, ramvps);
      }).on('data', (data) => {
        handlePanelInstallationInput(data, stream, subdomain, password);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });
  }).connect(connSettings);
  
  async function installWings(conn, domainnode, subdomain, password, ramvps) {
        sendMessage(chatId, `THE WINGS INSTALLATION PROCESS IS IN PROGRESS PLEASE WAIT 5 MINUTES\nscript by @sacatechincbot`);
        conn.exec(commandWings, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Wings installation stream closed with code ${code} and signal ${signal}');
                createNode(conn, domainnode, ramvps, subdomain, password);
            }).on('data', (data) => {
                handleWingsInstallationInput(data, stream, domainnode, subdomain);
        }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }

    async function createNode(conn, domainnode, ramvps, subdomain, password) {
        const command = 'bash <(curl -s https://raw.githubusercontent.com/Fahrihosting1/thema/main/install.sh)';
        sendMessage(chatId, `START CREATE NODE & LOCATION\nscript by @sacatechincbot`);     
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Node creation stream closed with code ${code} and ${signal} signal');
                conn.end();
                sendPanelData(subdomain, password);
            }).on('data', (data) => {
                handleNodeCreationInput(data, stream, domainnode, ramvps);
        }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }
        
   // Func Handler 'sendPanelData' 
    function sendPanelData(subdomain, password) {
        sendMessage(chatId,`DATA PANEL ANDA\n\nUSERNAME: admin\nPASSWORD: ${password}\nLOGIN: ${subdomain}\n\nNote: All installations have been completed. Please create an allocation on the node created by the bot and take the configuration token and type .startwings (token) \nNote: PLEASE WAIT 1-5 MINUTES FOR THE WEBSITE TO OPEN\nscript by @sacatechincbot`);
    }
    
   // Func Handler 'handlePanelInstallationInput' 
   function handlePanelInstallationInput(data, stream, subdomain, password) {
        if (data.toString().includes('Input')) {
            stream.write('0\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1248\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('Asia/Jakarta\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('adm\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('adm\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${password}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write(`${subdomain}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('yes\n');
        }
        if (data.toString().includes('Please read the Terms of Service')) {
            stream.write('Y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1\n');
        }
        console.log('STDOUT: ' + data);
    }
    
    // Func Handler 'handleWingsInstallationInput'
    function handleWingsInstallationInput(data, stream, domainnode, subdomain) {
        if (data.toString().includes('Input')) {
            stream.write('1\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${subdomain}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('user\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('1248\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write(`${domainnode}\n`);
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('admin@gmail.com\n');
        }
        if (data.toString().includes('Input')) {
            stream.write('y\n');
        }
        console.log('STDOUT: ' + data);
    }

    function handleNodeCreationInput(data, stream, domainnode, ramvps) {
        stream.write('fahristock\n');
        stream.write('4\n');
        stream.write('SGP\n');
        stream.write('Autonode WannFyy\n');
        stream.write(`${domainnode}\n`);
        stream.write('NODES\n');
        stream.write(`${ramvps}\n`);
        stream.write(`${ramvps}\n`);
        stream.write('1\n');
        console.log('STDOUT: ' + data);
    }
  } else {
      bot.sendMessage(chatId, 'This feature is specifically for my owners!!!');
    }
});
bot.onText(/^(\.|\#|\/)wingsstart$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Incorrect format!\nUsage: /wingsstart ipvps,password,token\nscript by @sacatechincbot`);
  });
bot.onText(/\/wingsstart (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const t = text.split(',');
  if (config.admin.includes(String(msg.from.id))) {
  if (t.length < 3) {
    return bot.sendMessage(chatId, 'Incorrect format!\nUsage: /wingsstart ipvps,password,token\nscript by @sacatechincbot');
  }
  const ipvps = t[0];
  const passwd = t[1];
  const token = t[2];
  const connSettings = {
    host: ipvps,
    port: 22,
    username: 'root',
    password: passwd
  };
    const conn = new Client();
    const command = 'bash <(curl -s https://raw.githubusercontent.com/wndrzzka/installer-pterodactlty/main/install.sh)'
 
    conn.on('ready', () => {
        isSuccess = true; // Set flag menjadi true jika koneksi berhasil
        sendMessage(chatId,'✅️Process of Configure Wings Please be patient\nscript by @sacatechincbot')
        
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream closed with code ${code} and ${signal} signal');
         sendMessage(chatId, '✅️Success in starting Wings on your panel. Please definitely check IJO\nscript by @sacatechincbot');
                conn.end();
            }).on('data', (data) => {
            stream.write('iniwannbroku\n');
                stream.write('3\n');
                stream.write(`${token}\n`)
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        sendMessage(chatId, 'Invalid password or IP');
    }).connect(connSettings);
} else {
    bot.sendMessage(chatId, 'This feature is specifically for my owners!!!', {
        reply_markup: {
            inline_keyboard: [
                [{ 
                    text: 'Contact the owner', 
                    url: 'https://wa.me/+256709824720'  // Ubah URL ke tautan yang sesuai
                }],
                [{ 
                    text: 'Back to Main Menu', 
                    callback_data: 'main_menu'  // Callback untuk mengarahkan pengguna ke menu utama
                }]
            ]
        }
    });
}
});