// Remove a foto ou vídeo enviado para um espaço (o site volta a usar o arquivo original).
import { del } from '@vercel/blob';
import { ESPACOS, senhaConfere } from './_comum.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  if (!senhaConfere(req.headers['x-senha'])) return res.status(401).json({ error: 'Senha incorreta.' });
  const espaco = req.body && req.body.espaco;
  if (!ESPACOS[espaco]) return res.status(400).json({ error: 'Espaço inválido.' });
  try {
    await del('slots/' + espaco);
    return res.status(200).json({ ok: true });
  } catch (erro) {
    return res.status(500).json({ error: 'Não consegui remover agora.' });
  }
}
