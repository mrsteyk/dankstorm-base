const memTool = require('../tool/mem.js');
const offsets = require('../offsets.json');
const mem = require('memoryjs');

var entity = {
    getEntity: (id) => mem.readMemory(memTool.client_dll + offsets.signatures.dwEntityList + ((id) * 0x10), 'int'),
    getTeam: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_iTeamNum, 'int'),
    //isDormant: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_bDormant, 'bool'),
    getFlags: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_fFlags, 'int'),
    getHealth: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_iHealth, 'int'),
    getOrigin: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_vecOrigin, 'int'),
    getLifeState: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_lifeState, 'int'),
    isDormant: (id) => !(entity.getLifeState(id)!=0&&entity.getHealth()>0),
    //getGlowEnabled: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_bGlowEnabled, 'int'),
    EnableGlow: (id) => mem.writeMemory(entity.getEntity(id) + offsets.netvars.m_bGlowEnabled, true, 'bool'),
    //EnableGlow: (id) => 0,
    //setGlowColor: (id) => mem.writeMemory(getEntity(id) + offsets.netvars.m_bGlowEnabled, true, 'bool'),
    getCloak: (id) => mem.readMemory(entity.getEntity(id) + offsets.netvars.m_iCloaked, 'int'),
    getBoneMatrix: (id) =>  mem.readMemory(entity.getEntity(id) + offsets.netvars.m_iCloaked, 'int')
}

module.exports = entity;