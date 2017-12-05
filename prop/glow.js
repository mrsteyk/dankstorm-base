const memTool = require('../tool/mem.js');
const offsets = require('../offsets.json');
const mem = require('memoryjs');

var glow = {
    getGlowManager: () => memTool.client_dll + offsets.signatures.dwGlowObjectManager,
    getGlowObjectArray: () => mem.readMemory(getGlowManager.getGlowManager(), 'int'),
    getMaxId: () => mem.readMemory(glow.getGlowManager() + 4, 'int'), // obtained by own compiliation tests
    getGlowEntityPtr: (id) => (mem.readMemory(glow.getGlowManager(), 'int')+32*id), // sizeof returned 32
    isInUse: (id) => mem.readMemory(glow.getGlowEntityPtr(id)+28, 'int'),
    getGlowId: (id) => (mem.readMemory(glow.getGlowEntityPtr(id),'int')&4095), // converting from handle to id
    getGlowColor: (id) => mem.readMemory(glow.getGlowEntityPtr(id)+4, 'vector3'), // own compiling again
    getGlowAlpha: (id) => mem.readMemory(glow.getGlowEntityPtr(id)+16, 'float'),
    getRenderWhenOccluded: (id) => mem.readMemory(glow.getGlowEntityPtr(id)+16, 'bool'),
    getRenderWhenUnoccluded: (id) => mem.readMemory(glow.getGlowEntityPtr(id)+17, 'bool'),
    //---
    setGlowColor: (id, vec3) => mem.writeMemory(glow.getGlowEntityPtr(id)+4, vec3, 'vector3'), // own compiling again
    setGlowAlpha: (id, a) => mem.writeMemory(glow.getGlowEntityPtr(id)+16, a, 'float'),
    setRenderWhenOccluded: (id, b) => mem.writeMemory(glow.getGlowEntityPtr(id)+16, b, 'bool'),
    setRenderWhenUnoccluded: (id, b) => mem.writeMemory(glow.getGlowEntityPtr(id)+17, b, 'bool')
}

module.exports = glow;