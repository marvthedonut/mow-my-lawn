import { BlockPermutation, BoundingBoxUtils, MolangVariableMap, Vector, system, world } from "@minecraft/server";
import Interval from "types/Interval";
import VectorHelper from "utils/VectorHelper";

export default class GrassGrowTick implements Interval {
	public name: string = "grass_grow_tick";
	public delay: number = 1;

	private cuboid = BoundingBoxUtils.createValid({ x: 64, y: -60, z: -14 }, { x: 56, y: -58, z: -2 });

	public execute = async () => {
		let x = this.cuboid.max.x - this.cuboid.min.x;
		let z = this.cuboid.max.z - this.cuboid.min.z;
		let y = this.cuboid.max.y - this.cuboid.min.y;
		let overworld = world.getDimension("overworld");

		if (system.currentTick % 10 == 0)
			for (let i = 0; i < x; i++) {
				for (let j = 0; j < z; j++) {
					if (Math.random() * 100 < 0.5) {
						let bottomBlock = overworld.getBlock(Vector.add(this.cuboid.min, { x: i, y: 0, z: j }));
						if (bottomBlock?.typeId == "minecraft:tallgrass") {
							bottomBlock?.setType("minecraft:double_plant");
							bottomBlock?.setPermutation(BlockPermutation.resolve("minecraft:double_plant", { double_plant_type: "grass" }));
						} else if (bottomBlock?.typeId != "minecraft:double_plant") bottomBlock?.setType("minecraft:tallgrass");
					}
				}
			}

		// Grow region

		let corner1 = this.cuboid.min;
		let corner2 = Vector.add(this.cuboid.min, { x: 0, y: 0, z: z });
		let corner3 = Vector.add(this.cuboid.min, { x: x, y: 0, z: z });
		let corner4 = Vector.add(this.cuboid.min, { x: x, y: 0, z: 0 });

		let corner5 = Vector.add(this.cuboid.min, { x: 0, y: y, z: 0 });
		let corner6 = Vector.add(this.cuboid.min, { x: 0, y: y, z: z });
		let corner7 = Vector.add(this.cuboid.min, { x: x, y: y, z: z });
		let corner8 = Vector.add(this.cuboid.min, { x: x, y: y, z: 0 });

		let t = (system.currentTick % 20) / 20;
		const particleName = "minecraft:colored_flame_particle";
		let molang = new MolangVariableMap();
		molang.setColorRGB("variable.color", { red: 0.2, green: 0.6, blue: 0.2 });

		overworld.spawnParticle(particleName, VectorHelper.lerp(corner1, corner2, t), molang);
		overworld.spawnParticle(particleName, VectorHelper.lerp(corner2, corner3, t), molang);
		overworld.spawnParticle(particleName, VectorHelper.lerp(corner3, corner4, t), molang);
		overworld.spawnParticle(particleName, VectorHelper.lerp(corner4, corner1, t), molang);

		overworld.spawnParticle(particleName, VectorHelper.lerp(corner5, corner6, t), molang);
		overworld.spawnParticle(particleName, VectorHelper.lerp(corner6, corner7, t), molang);
		overworld.spawnParticle(particleName, VectorHelper.lerp(corner7, corner8, t), molang);
		overworld.spawnParticle(particleName, VectorHelper.lerp(corner8, corner5, t), molang);

		if (system.currentTick % 3 == 0) {
			overworld.spawnParticle(particleName, VectorHelper.lerp(corner1, corner5, t), molang);
			overworld.spawnParticle(particleName, VectorHelper.lerp(corner2, corner6, t), molang);
			overworld.spawnParticle(particleName, VectorHelper.lerp(corner3, corner7, t), molang);
			overworld.spawnParticle(particleName, VectorHelper.lerp(corner4, corner8, t), molang);
		}
		return 0;
	};
}
