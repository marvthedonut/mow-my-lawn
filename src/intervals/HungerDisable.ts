import { world } from "@minecraft/server";
import Interval from "types/Interval";

export default class HungerDisable implements Interval {
	public name: string = "hunger_disable";
	public delay: number = 20;
	public execute = async () => {
		world.getPlayers().forEach((player) => {
			player.addEffect("saturation", 40, { amplifier: 20, showParticles: false });
		});
		return 0;
	};
}
