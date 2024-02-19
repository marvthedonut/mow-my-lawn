import { GameMode, PlayerBreakBlockBeforeEvent, world } from "@minecraft/server";
import Event from "types/Event";
import Misc from "utils/Misc";
import { grassGrowTick } from "../main";

export default class BlockBreakRestriction implements Event {
	public name: string = "block_break_restriction";
	public eventSignal = world.beforeEvents.playerBreakBlock;
	public execute = (event: PlayerBreakBlockBeforeEvent) => {
		let player = event.player;
		// Jayly method ???
		if (
			Object.values(GameMode).find((g) => [...world.getPlayers({ name: player.name, gameMode: g })].length) != GameMode.creative &&
			!Misc.isInside(grassGrowTick.cuboid, event.block.location)
		)
			event.cancel = true;

		return 0;
	};
}
