// ==========================
// Puerto
// ==========================

process.env.PORT = process.env.PORT || 3000;

// =========================
// Seed Token
// =========================

process.env.SEED = "seed-de-desarrollo" ||  process.env.SEED;


// =========================
// Caducidad
// =========================

process.env.CADUCIDAD = 60 * 60 * 24 * 30;

db = 'mongodb://alexzam1:alexzam1@ds115154.mlab.com:15154/dbrivka'