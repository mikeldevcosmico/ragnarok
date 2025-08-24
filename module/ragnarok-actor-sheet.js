import { RAGNAROK } from "./config.js";

/**
 * Represents the actor sheet for the Ragnarok system.
 * Extends the base ActorSheet class to provide specific logic and interaction behavior for Ragnarok actors.
 */
export class RagnarokActorSheet extends ActorSheet {
    /**
     * Gets the default configuration options for the actor sheet.
     * This method merges the base configuration options from the parent class
     * with additional custom options specific to this implementation.
     *
     * @return {Object} An object containing the merged default options, which include
     *                  CSS classes, the HTML template path, and dimensions for the sheet.
     */
    static get defaultOptions() {
        return foundry.utils.mergeObject
(super.defaultOptions, {
            classes: ["ragnarok", "sheet", "actor"],
            template: "systems/ragnarok/module/actor-sheet.html",
            width: 800,
            height: 700,
            submitOnChange: true,
            closeOnSubmit: false
        });
    }

    getData() {
        const data = super.getData();
        data.system = this.actor.system;
        data.config = RAGNAROK;
        data.difficultyMaxIdx = RAGNAROK.DIFICULTIES.length - 1;
        // Agrupar habilidades por atributo para la cuadrícula 3x2
        const ATTR_ORDER = ["INT", "VOL", "REF", "FUE", "RES", "CAR"];
        const skillsByAttr = { INT: [], VOL: [], REF: [], FUE: [], RES: [], CAR: [] };
        for (const [key, value] of Object.entries(this.actor.system.habilidades || {})) {
            const attr = guessAtributo(key);
            if (!skillsByAttr[attr]) skillsByAttr[attr] = [];
            skillsByAttr[attr].push({
                key,
                label: RAGNAROK.SKILLS[key],
                value
            });
        }
        data.skillsByAttr = skillsByAttr;
        data.attrOrder = ATTR_ORDER;

        return data;
    }

    /**
     * Activates event listeners for the associated HTML content, enabling interactions and functionality.
     *
     * @param {jQuery} html - The HTML content passed to this method, used to attach event listeners to specific elements.
     * @return {void} This method does not return a value.
     */
    activateListeners(html) {
        super.activateListeners(html);

        // Tirada al clicar en el nombre de la habilidad
        html.find(".skill-name").on("click", async ev => {
            ev.preventDefault();
            const skill = ev.currentTarget.dataset.skill;
            // Lee el valor actual de la barra de dificultad
            const idxActual = Number(html.find("#rng-dif").val());
            await this.rollSkill(skill, idxActual);
        });

        // Actualiza el actor cuando cambia la dificultad en la barra
        html.find('input[name="system.dificultadSeleccionada"]').on("input change", ev => {
            const value = Number(ev.currentTarget.value);
            this.actor.update({ "system.dificultadSeleccionada": value });
        });
    }



    // 👇 IMPORTANTE: async + evaluate()
    /**
     * Rolls a skill check for a given skill, based on the actor's attributes and skills,
     * and sends the roll result as a chat message.
     *
     * @param {string} skill - The identifier of the skill to be rolled.
     * @param {number} [idxOverride] - Índice de dificultad leído del selector (opcional).
     * @return {Promise<void>} A promise that resolves when the roll result has been sent as a chat message.
     */
    async rollSkill(skill, idxOverride) {
        const actor = this.actor;
        const habilidadValor = actor.system.habilidades[skill] ?? 0;
        const atributoClave = guessAtributo(skill);
        const atributoValor = actor.system.atributos[atributoClave] ?? 0;
        const base = habilidadValor + atributoValor;

        // Dificultad seleccionada: prioriza lo recibido del selector; si no, usa la guardada en el actor; fallback a 2 (Normal)
        const idx = Number.isInteger(idxOverride)
            ? idxOverride
            : (Number.isInteger(actor.system.dificultadSeleccionada) ? actor.system.dificultadSeleccionada : 2);
        const dif = RAGNAROK.DIFICULTIES[idx] ?? RAGNAROK.DIFICULTIES[2];

        const roll = new Roll("1d20");
        await roll.evaluate({ async: true });

        const total = base + roll.total;
        const exito = total >= dif.valor;

        const flavor = `Tirada de ${RAGNAROK.SKILLS[skill]} [${atributoClave}(${atributoValor}) + ${RAGNAROK.SKILLS[skill]}(${habilidadValor}) + d20(${roll.total}) = ${total}]
Dificultad: ${dif.nombre} (DC ${dif.valor}) — ${exito ? "ÉXITO" : "FALLO"}`;

        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor
        });
    }

}

// Atributo asociado por habilidad
/**
 * Determines the atributo (attribute) associated with a given skill.
 *
 * @param {string} skill - The skill for which to guess the corresponding attribute.
 * @return {string} The associated attribute as a string. Defaults to "INT" if the skill is not recognized.
 */
function guessAtributo(skill) {
    const mapping = {
        alerta: "INT", ciencias: "INT", cultura_popular: "INT", informatica: "INT",
        investigacion: "INT", medicina: "INT", ocultismo: "INT", supervivencia: "INT",
        arte: "VOL", empatia: "VOL", mando: "VOL", sigilo: "VOL",
        armas_cortas: "REF", armas_largas: "REF", armas_blancas: "REF",
        atletismo: "REF", conducir: "REF", esquivar: "REF", mecanismos: "REF",
        pelea: "FUE", potencia_fisica: "FUE",
        nadar: "RES", trepar: "RES", tratar_heridas: "RES",
        comercio: "CAR", enganar: "CAR", intimidar: "CAR", persuasion: "CAR"
    };
    return mapping[skill] || "INT";
}
