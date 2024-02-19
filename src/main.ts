import * as server from "@minecraft/server";
import EventManager from "managers/EventManager";
import SystemIntervalManager from "managers/SystemIntervalManager";
import ChatHelper from "utils/ChatHelper";
import BlockBreakRestriction from "./events/BlockBreakRestriction";
import BlockPlaceRestriction from "./events/BlockPlaceRestriction";
import GrassGrowTick from "./intervals/GrassGrowTick";

server.world.afterEvents.worldInitialize.subscribe(() => {
	ChatHelper.broadcastMessage("Reloaded!");
});

const grassGrowTick = new GrassGrowTick();

SystemIntervalManager.registerIntervals([grassGrowTick]);
EventManager.registerEvents([new BlockBreakRestriction(), new BlockPlaceRestriction()]);

export { grassGrowTick };
