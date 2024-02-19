import { GameMode, PlayerPlaceBlockBeforeEvent, world } from "@minecraft/server";
import Event from "types/Event";
import Misc from "utils/Misc";
import { grassGrowTick } from "../main";

export default class BlockPlaceRestriction implements Event {
	public name: string = "block_place_restriction";
	public eventSignal = world.beforeEvents.playerPlaceBlock;
	public execute = (event: PlayerPlaceBlockBeforeEvent) => {
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
