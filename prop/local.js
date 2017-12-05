const memTool = require('../tool/mem.js');
const offsets = require('../offsets.json');
const mem = require('memoryjs');

var local = {
    getLocal: () => mem.readMemory(memTool.client_dll + offsets.signatures.dwLocalPlayer, 'int'),
    getTeam: () => mem.readMemory(local.getLocal() + offsets.netvars.m_iTeamNum, 'int'),
    getFlags: () => mem.readMemory(local.getLocal() + offsets.netvars.m_fFlags, 'int'),
    getOrigin: () => mem.readMemory(local.getLocal() + offsets.netvars.m_vecOrigin, 'vector3'),
    getInCross: () => mem.readMemory(local.getLocal() + offsets.netvars.m_iCrosshairID, 'int'),
    getViewAngles: () => mem.readMemory(local.getLocal() + offsets.singatures.dwViewAngles, 'vector3'),
    getInGame: () => mem.readMemory(memTool.client_dll+offsets.signatures.dwIsInGame, 'bool')
}

module.exports = local;