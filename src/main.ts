import * as server from "@minecraft/server";
import SystemIntervalManager from "managers/SystemIntervalManager";
import ChatHelper from "utils/ChatHelper";
import GrassGrowTick from "./intervals/GrassGrowTick";

server.world.afterEvents.worldInitialize.subscribe(() => {
	ChatHelper.broadcastMessage("Reloaded!");
});

SystemIntervalManager.registerIntervals([new GrassGrowTick()]);
