const pogger = require("pogger");
const colors = require("colors");
const { guildId, clientId } = require("../config.json")

module.exports = async (client) => {
    	console.log(` ✔ `.bold.brightGreen + '[Client]: '.yellow + `Ready!`.bold.brightGreen + `${client.user.tag}`.grey);

if(guildId === "" || null){
      
  console.log(` ✖ `.bold.red + `[Error]: `.bold.red + `Guild ID is Required for Slash Commands Handler!`.underline.red);
  console.log(` ✖ `.bold.red + `[Error]: `.bold.red + `Missing Value in: ./config.json => "guildId": ""`);
  console.log(` ✖ `.bold.red + `[Error]: `.bold.red + `Repl.it has been Stopped.`), process.exit();

  } else {

     if(clientId === "" || null){
      
        console.log(` ✖ `.bold.red + `[Error]: `.bold.red + `Client ID is Required for Slash Commands Handler!`.underline.red);
        console.log(` ✖ `.bold.red + `[Error]: `.bold.red + `Missing Value in: ./config.json => "clientId": ""`);
        console.log(` ✖ `.bold.red + `[Error]: `.bold.red + `Repl.it has been Stopped.`), process.exit();

  }
}
};
console.log(` ✔ `.bold.brightGreen + "[Event]: ".yellow + "ready.js ".blue + "(Loaded)".grey)