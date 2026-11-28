// Lista as fotos e vídeos enviados pelo painel: { "foto-1": "https://...", ... }
import { list } from '@vercel/blob';
import { ESPACOS } from './_comum.js';

export default async function handler(req, res) {
  const mapa = {};
  try {
    let cursor;
    do {
      const pagina = await list({ prefix: 'slots/', cursor, limit: 1000 });
      for (const b of pagina.blobs) {
        const espaco = b.pathname.replace(/^slots\//, '');
        if (ESPACOS[espaco]) mapa[espaco] = b.url + '?v=' + new Date(b.uploadedAt).getTime();
      }
      cursor = pagina.hasMore ? pagina.cursor : undefined;
    } while (cursor);
  } catch (erro) {
    // Sem armazenamento configurado: o site usa as fotos que já estão no código.
  }
  res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=300');
  return res.status(200).json(mapa);
}
