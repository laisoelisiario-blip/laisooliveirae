// Gera a autorização para o navegador enviar o arquivo direto ao Vercel Blob
// (assim vídeos grandes não passam pelo limite de tamanho das funções).
import { handleUpload } from '@vercel/blob/client';
import { ESPACOS, TIPOS, senhaConfere } from './_comum.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  try {
    const resposta = await handleUpload({
      request: req,
      body: req.body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let senha = null;
        try { senha = JSON.parse(clientPayload || '{}').senha; } catch {}
        if (!process.env.UPLOAD_PASSWORD) throw new Error('A senha do painel ainda não foi cadastrada na Vercel (UPLOAD_PASSWORD).');
        if (!senhaConfere(senha)) throw new Error('Senha incorreta.');
        const espaco = pathname.replace(/^slots\//, '');
        const tipo = ESPACOS[espaco];
        if (!pathname.startsWith('slots/') || !tipo) throw new Error('Espaço inválido.');
        return {
          allowedContentTypes: TIPOS[tipo],
          maximumSizeInBytes: tipo === 'video' ? 500 * 1024 * 1024 : 25 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true,
          cacheControlMaxAge: 60,
        };
      },
    });
    return res.status(200).json(resposta);
  } catch (erro) {
    return res.status(400).json({ error: erro.message || 'Falha no envio.' });
  }
}
