Hooks.once("ready", () => {
  console.log("Ragnarok system ready");
});

Hooks.on("renderActorSheet", (app, html, data) => {
  html.find(".roll-skill").click(ev => {
    ev.preventDefault();
    let actor = app.actor;
    let skill = ev.currentTarget.dataset.habilidad;
    let habilidadValor = actor.system.habilidades[skill] || 0;
    let atributoClave = guessAtributo(skill);
    let atributoValor = actor.system.atributos[atributoClave] || 0;
    let total = habilidadValor + atributoValor;
    let roll = new Roll("1d20").roll({async: false});
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor: actor}),
      flavor: `Tirada de ${skill} (${atributoClave}+${skill}) ≤ ${total}`
    });
  });
});

function guessAtributo(skill) {
  const mapping = {
    alerta: "INT",
    ciencias: "INT",
    cultura_popular: "INT",
    informatica: "INT",
    investigacion: "INT",
    medicina: "INT",
    ocultismo: "INT",
    supervivencia: "INT",
    arte: "VOL",
    empatia: "VOL",
    mando: "VOL",
    sigilo: "VOL",
    armas_cortas: "REF",
    armas_largas: "REF",
    armas_blancas: "REF",
    atletismo: "REF",
    conducir: "REF",
    esquivar: "REF",
    mecanismos: "REF",
    pelea: "FUE",
    potencia_fisica: "FUE",
    nadar: "RES",
    trepar: "RES",
    tratar_heridas: "RES",
    comercio: "CAR",
    enganar: "CAR",
    intimidar: "CAR",
    persuasion: "CAR"
  };
  return mapping[skill] || "INT";
}
