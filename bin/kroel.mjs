#!/usr/bin/env node
// kroel — consulta servicios de Kroel Graphics y envía solicitudes de cotización desde la terminal.
// Sin dependencias. Usa la API pública de https://kroelgraphics.com (no requiere cuenta ni llave).
const BASE = process.env.KROEL_API || 'https://kroelgraphics.com';
const [, , comando, ...resto] = process.argv;
const opciones = {}; const libres = [];
for (let i = 0; i < resto.length; i++) { const a = resto[i]; if (a.startsWith('--')) { const k = a.slice(2); const v = resto[i + 1] && !resto[i + 1].startsWith('--') ? resto[++i] : true; opciones[k] = v; } else libres.push(a); }
const json = async (ruta, init) => { const r = await fetch(BASE + ruta, { ...init, headers: { 'Content-Type': 'application/json', 'User-Agent': 'kroel-cli/1.0', ...(init && init.headers) } }); const t = await r.text(); let d; try { d = JSON.parse(t); } catch { d = { detail: t.slice(0, 200) }; } return { ok: r.ok, estado: r.status, d }; };
const falla = (m) => { console.error('Error: ' + m); process.exit(1); };

const AYUDA = `kroel — Kroel Graphics desde la terminal

Uso:
  kroel servicios                         Lista los servicios y cómo se cotizan
  kroel contacto                          Canales de contacto
  kroel preguntar "¿hacen portadas?"      Pregunta en lenguaje natural
  kroel cotizar --nombre "Ana" --contacto "+52 664 000 0000" --detalle "Logo para mi cafetería"
                [--servicio "Identidad de marca"] [--fecha "diciembre"] [--presupuesto "..."] [--prueba]
  kroel estado <id> [--prueba]            Estado de una solicitud enviada

  --prueba   usa el entorno de pruebas: valida pero no envía nada a nadie
  --json     imprime la respuesta completa en JSON

No hay precios automáticos: cada proyecto lo cotiza Luis y contesta él.
Documentación: https://kroelgraphics.com/developers`;

const imprime = (d, texto) => console.log(opciones.json ? JSON.stringify(d, null, 2) : texto);
try {
  if (!comando || comando === 'ayuda' || comando === 'help' || opciones.help) console.log(AYUDA);
  else if (comando === 'servicios') { const { ok, d } = await json('/api/v1/servicios'); if (!ok) falla(d.detail); imprime(d, d.data.map((s) => `• ${s.nombre}\n  ${s.detalle}`).join('\n') + `\n\n${d.precios}`); }
  else if (comando === 'contacto') { const { ok, d } = await json('/api/v1/contacto'); if (!ok) falla(d.detail); imprime(d, Object.entries(d).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n')); }
  else if (comando === 'preguntar') { const texto = libres.join(' ').trim(); if (!texto) falla('escribe la pregunta entre comillas.'); const { d } = await json('/ask', { method: 'POST', body: JSON.stringify({ query: { text: texto } }) }); if (d.error) falla(d.error.message || d.error.code); imprime(d, (d.results || []).map((r) => r.text || `• ${r.name}: ${r.description || ''}`).join('\n')); }
  else if (comando === 'cotizar') {
    for (const k of ['nombre', 'contacto', 'detalle']) if (typeof opciones[k] !== 'string') falla(`falta --${k}. Mira: kroel ayuda`);
    const cuerpo = { nombre: opciones.nombre, contacto: opciones.contacto, detalle: opciones.detalle, servicio: opciones.servicio || '', fecha: opciones.fecha || '', presupuesto: opciones.presupuesto || '', agente: 'kroel-cli' };
    const cab = typeof opciones.llave === 'string' ? { 'Idempotency-Key': opciones.llave } : {};
    const { estado, d } = await json((opciones.prueba ? '/sandbox' : '') + '/api/v1/cotizaciones', { method: 'POST', headers: cab, body: JSON.stringify(cuerpo) });
    if (estado !== 202) falla((d.detail || 'no se pudo enviar') + (d.errors ? '\n' + d.errors.map((e) => `  - ${e.campo}: ${e.error}`).join('\n') : ''));
    imprime(d, `${opciones.prueba ? 'PRUEBA (no se envió nada). ' : 'Solicitud enviada. '}Id: ${d.id}\n${d.siguiente_paso}`);
  }
  else if (comando === 'estado') { if (!libres[0]) falla('falta el id.'); const { ok, d } = await json((opciones.prueba ? '/sandbox' : '') + '/api/v1/cotizaciones/' + encodeURIComponent(libres[0])); if (!ok) falla(d.detail); imprime(d, `Estado: ${d.status}${d.sandbox ? ' (prueba)' : ''}`); }
  else falla(`comando desconocido "${comando}". Mira: kroel ayuda`);
} catch (e) { falla('no pude conectar con ' + BASE + ' (' + e.message + ')'); }
