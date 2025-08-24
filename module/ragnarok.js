import { RagnarokActorSheet } from "./ragnarok-actor-sheet.js";

Hooks.once("init", function() {
  console.log("Ragnarok | Iniciando sistema...");

  // Registrar hoja de personaje
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ragnarok", RagnarokActorSheet, {
    makeDefault: true
  });
});
