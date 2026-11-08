// GET /api/hello?name=Ana — Reto 1 (Parte 9): nueva función con trigger HTTP.
const { app } = require('@azure/functions');
const { sanitizeName } = require('../lib/quiz');

app.http('hello', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'hello',
  handler: async (request, context) => {
    const name = sanitizeName(request.query.get('name')) || 'mundo';
    context.log(`Invocación ${context.invocationId}: saludando a ${name}`);
    return {
      headers: { 'Cache-Control': 'no-store' },
      jsonBody: { message: `¡Hola, ${name}! Este saludo lo generó una Azure Function.`, invocationId: context.invocationId }
    };
  }
});
