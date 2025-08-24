# Ragnarok (3ª edición) para Foundry VTT
Sistema de rol de terror contemporáneo para Foundry VTT basado en Ragnarok 3ª edición. Incluye hoja de actor personalizada, atributos, habilidades y selector de dificultad.
- Compatible con Foundry VTT v10+ (probado en v12.331)
- Idioma: Español
- Autor: Barakataka

## Instalación
1. Copia esta URL de manifiesto:

- Manifest URL: [https://raw.githubusercontent.com/mikeldevcosmico/ragnarok/main/system.json](https://raw.githubusercontent.com/mikeldevcosmico/ragnarok/main/system.json)

1. En Foundry VTT:

- Setup → Systems → Install System
- Pega la URL de manifiesto y confirma.

Alternativa manual:
- Descarga el ZIP de la última release y descomprímelo dentro de Data/systems.
- Última versión: [https://github.com/mikeldevcosmico/ragnarok/releases/download/v0.1.2/ragnarok-v0.1.2.zip](https://github.com/mikeldevcosmico/ragnarok/releases/download/v0.1.2/ragnarok-v0.1.2.zip)

## Requisitos
- Foundry Virtual Tabletop 10 o superior (recomendado 12.331).
- Navegador compatible con Foundry.

## Características
- Hoja de actor con:
    - Atributos principales.
    - Habilidades agrupadas por atributo.
    - Retrato editable.
    - Selector de dificultad con indicadores visuales.

- Localización al español.

## Estructura del proyecto
``` 
ragnarok/
├─ system.json
├─ lang/
│  └─ es.json
└─ module/
   ├─ actor-sheet.html
   ├─ styles.css
   ├─ config.js
   ├─ ragnarok-actor-sheet.js
   └─ ragnarok.js
```
Coloca recursos adicionales (imágenes/sonidos) dentro de module/assets o assets/ en la raíz del sistema, usando rutas absolutas en Foundry, por ejemplo:
- systems/ragnarok/module/assets/mi-imagen.png

## Uso rápido
- Crea un mundo nuevo o abre uno existente.
- Activa el sistema Ragnarok en la configuración del mundo.
- Crea un nuevo Actor y asigna valores de atributos/habilidades.
- Haz clic en el nombre de una habilidad para tirar contra la dificultad seleccionada.

## Actualización
- Foundry detectará nuevas versiones a través del manifiesto. Solo pulsa “Update” cuando aparezca.
- Si actualizas manualmente, reemplaza la carpeta systems/ragnarok con el contenido del ZIP más reciente.

## Desarrollo
Clona el repositorio:
``` bash
git clone https://github.com/mikeldevcosmico/ragnarok.git
```
