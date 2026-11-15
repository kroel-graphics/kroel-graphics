<p align="center"><a href="https://kroelgraphics.com"><img src="assets/logo.png" alt="Kroel Graphics" width="120"></a></p>

# Kroel Graphics — kit para agentes y terminal

Herramientas públicas para usar [kroelgraphics.com](https://kroelgraphics.com) desde un asistente de software o desde la terminal: consultar servicios y enviar una solicitud de cotización. Kroel Graphics es el estudio creativo de Luis en Tijuana, México: diseño gráfico, portadas para música, flyers, fotografía, edición de video, sitios web, apps y bots, en línea para México y Estados Unidos.

*English: public tools to use kroelgraphics.com from an AI assistant or the terminal — look up services and send a quote request. No account or API key needed.*

## Terminal

Requiere Node 18 o más reciente. Sin instalar nada:

```bash
npx github:kroel-graphics/kroel-graphics servicios
npx github:kroel-graphics/kroel-graphics preguntar "¿hacen portadas de discos?"
npx github:kroel-graphics/kroel-graphics cotizar --nombre "Ana" --contacto "+52 664 000 0000" --detalle "Logo para mi cafetería" --prueba
```

`--prueba` usa el entorno de pruebas: valida todo pero no le envía nada a nadie. Quítalo para enviar la solicitud de verdad. `kroel ayuda` muestra todos los comandos.

## Servidor MCP

```json
{ "mcpServers": { "kroel-graphics": { "type": "http", "url": "https://kroelgraphics.com/mcp" } } }
```

Herramientas: `get_services`, `get_contact`, `prepare_quote`, `send_quote_request`. Hay un segundo servidor para leer la documentación: `https://kroelgraphics.com/docs/mcp`.

## Plugin

`plugin.json` (formato [Agent Plugins](https://agent-plugins.org)) y `.claude-plugin/` empaquetan la habilidad y los dos servidores MCP (`mcp.json`).

## Habilidad para agentes

`skills/cotizar-kroel-graphics/SKILL.md` explica a un agente cuándo y cómo pedir una cotización.

```bash
npx skills add kroel-graphics/kroel-graphics
```

## API

Sin cuenta ni llave. Documentación completa en [kroelgraphics.com/developers](https://kroelgraphics.com/developers) · [OpenAPI](https://kroelgraphics.com/openapi.json) · [llms.txt](https://kroelgraphics.com/llms.txt)

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/v1/servicios` | Lista de servicios |
| GET | `/api/v1/contacto` | Canales de contacto |
| POST | `/api/v1/cotizaciones` | Envía una solicitud de cotización (responde `202`) |
| POST | `/ask` | Pregunta en lenguaje natural |

Entorno de pruebas: `https://kroelgraphics.com/sandbox/api/v1`.

## Importante

No hay precios automáticos: cada proyecto lo cotiza Luis a la medida y contesta él. Envía solo datos de personas que lo autorizaron. Este repositorio no contiene diseños ni archivos de clientes; la licencia MIT cubre únicamente el código.

Contacto: [WhatsApp](https://wa.me/5216641554842) · [kroelgraphics.com](https://kroelgraphics.com)
