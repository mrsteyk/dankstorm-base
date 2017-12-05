const mem = require('memoryjs');
var proc = mem.openProcess('hl2.exe');
var clientModule = mem.findModule('client.dll', proc.th32ProcessID);

module.exports = {
  client_dll: clientModule.modBaseAddr
};