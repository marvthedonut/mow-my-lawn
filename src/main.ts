import * as server from "@minecraft/server";
import EventManager from "managers/EventManager";
import SystemIntervalManager from "managers/SystemIntervalManager";
import ChatHelper from "utils/ChatHelper";
import Matrix from "utils/Matrix";
import { Vector } from "wrappers/Vector";
import BlockBreakRestriction from "./events/BlockBreakRestriction";
import BlockPlaceRestriction from "./events/BlockPlaceRestriction";
import GrassGrowTick from "./intervals/GrassGrowTick";
import HungerDisable from "./intervals/HungerDisable";

server.world.afterEvents.worldInitialize.subscribe(() => {
	ChatHelper.broadcastMessage("Reloaded!");
});

const grassGrowTick = new GrassGrowTick();

SystemIntervalManager.registerIntervals([grassGrowTick, new HungerDisable()]);
EventManager.registerEvents([new BlockBreakRestriction(), new BlockPlaceRestriction()]);

server.system.runInterval(() => {
	let vec = new Vector(0.5, 0, 0);
	let origin = new Vector(65.5, -59.0, -11.5);

	const colors: server.RGB[] = [
		{ red: 68 / 255, green: 1, blue: 68 / 255 },
		{ red: 78 / 255, green: 147 / 255, blue: 49 / 255 },
		{ red: 194 / 255, green: 1, blue: 102 / 255 },
	];

	let mat = new Matrix().createRotationMatrix((server.system.currentTick % 90) * 4, (server.system.currentTick % 90) * 8, 0);
	let molang = new server.MolangVariableMap();

	for (let i = 0; i < 10; i++) {
		molang.setColorRGB("variable.color", colors[Math.round(Math.random() * (colors.length - 1))]);

		server.world.getDimension("overworld").spawnParticle("minecraft:mobspell_ambient", origin.add(mat.transformVector(vec)), molang);
	}
}, 3);

export { grassGrowTick };
