const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60 });

const stats = { hits: 0, misses: 0 };

function recordHit() {
  stats.hits += 1;
}

function recordMiss() {
  stats.misses += 1;
}

function getStats() {
  return { ...stats };
}

module.exports = { cache, recordHit, recordMiss, getStats };
