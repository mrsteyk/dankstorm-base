const aks = require('asynckeystate');
const sleep = require('sleep');
const robot = require('robotjs');
const local = require('./prop/local.js');
const entity = require('./prop/entity.js');
const glow = require('./prop/glow.js');
const mem = require('memoryjs');

function GESP() {
    for(var i=1; i<=64; i++) {
        if(entity.getEntity(i)>=512 && !entity.isDormant(i) && (entity.getTeam(i)==2 || entity.getTeam(i)==3) && entity.getHealth(i)>0) {
            entity.EnableGlow(i);
            //console.log("GLOW!!!");
        };
    };
    /*if(mem.readMemory(glow.getGlowManager(), 'int')!=4294967295) {
        for(var i=1; i<=64; i++) {
            //if(glow.isInUse(i)==-2)
            //    continue;
            if(glow.getGlowId(i)>0 && glow.getGlowId(i)<=64 && entity.getEntity(glow.getGlowId(i))>=512 && !entity.isDormant(glow.getGlowId(i)) && (entity.getTeam(glow.getGlowId(i))==2 || entity.getTeam(glow.getGlowId(i))==3) && entity.getHealth(glow.getGlowId(i))>0) {
                if(entity.getTeam(glow.getGlowId(i))==local.getTeam()) {
                    glow.setGlowColor(i, {x: 1.0, y:1.0, z:1.0});
                } else {
                    glow.setGlowColor(i, {x: 0.0, y:0.0, z:0.0});
                };
                glow.setGlowAlpha(i, 1.0);
                glow.setRenderWhenOccluded(i, true);
                glow.setRenderWhenUnoccluded(i, true);
            }
    //        console.log(glow.getGlowColor(i));
        }
    }*/
}

function tBot() {
    var inCrossId = local.getInCross();
    if (inCrossId > 0 && inCrossId <= 64 && entity.getTeam(inCrossId - 1) !== local.getTeam() && !entity.isDormant(inCrossId)) {
        robot.mouseClick();
        sleep.usleep(50);
        //var i=inCrossId;
    };
}

while(1) {
    if(local.getInGame()) {
        if(aks.getAsyncKeyState(0x10)) {
            tBot();
        };
        GESP();
    }
    sleep.usleep(10);
}