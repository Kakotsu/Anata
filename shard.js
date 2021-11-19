const { ShardingManager } = require("discord.js")
require('dotenv').config();

const shards = new ShardingManager("./anata.js", {
    token: process.env.TOKEN,
    totalShards: "auto"
});

shards.on("shardCreate", async (shard) => {
    console.log("Preparing Shard...")
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] New Anata Shard Launched #${shard.id}`);
});

shards.spawn({amount: shards.totalShards, timeout: 10000});
