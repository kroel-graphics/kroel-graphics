# AGENTS.md — Kroel Graphics

Guía para agentes de código y asistentes que trabajen con este repositorio o con https://kroelgraphics.com.

## Qué es esto

Kit público de Kroel Graphics, el estudio creativo de Luis en Tijuana, México (diseño gráfico, portadas para música, flyers, fotografía, edición de video, sitios web, apps y bots). Contiene una herramienta de terminal (`bin/kroel.mjs`), una habilidad para agentes (`skills/`) y los datos de conexión al servidor MCP. No contiene diseños ni archivos de clientes.

## Cómo usar el servicio

- API (sin cuenta ni llave): `https://kroelgraphics.com/api/v1` · descripción en `https://kroelgraphics.com/openapi.json`
- Servidor MCP: `https://kroelgraphics.com/mcp` (acciones) y `https://kroelgraphics.com/docs/mcp` (documentación)
- Pruebas: `https://kroelgraphics.com/sandbox/api/v1` valida pero no guarda ni avisa a nadie. Úsalo siempre antes de enviar algo real.
- Índice para agentes: `https://kroelgraphics.com/llms.txt` · autenticación: `https://kroelgraphics.com/auth.md` (no hay cuentas)

## Reglas

1. No inventes precios, tiempos de entrega, descuentos ni clientes. Los únicos precios que puedes citar son los de arranque de https://kroelgraphics.com/pricing.md; el precio final lo cotiza Luis.
2. Envía una solicitud de cotización real solo con datos de una persona que lo autorizó. Para ensayar usa `--prueba` o el sandbox.
3. Estados Unidos: solo trabajo en línea. No ofrezcas sesiones presenciales allá.
4. No se atienden marcas del giro de cannabis.
5. No pidas ni envíes contraseñas, llaves o datos de pago: nada aquí los necesita.

## Trabajar en este repositorio

- Requiere Node 18 o más reciente. No hay dependencias ni paso de compilación.
- Probar: `node bin/kroel.mjs servicios` y `node bin/kroel.mjs cotizar --nombre "Prueba" --contacto "+52 664 000 0000" --detalle "Logo de prueba" --prueba`
- Mantén la herramienta sin dependencias y los textos en español claro.
