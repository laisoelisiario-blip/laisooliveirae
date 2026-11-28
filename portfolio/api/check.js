// Confere a senha do painel.
import { senhaConfere } from './_comum.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  if (!process.env.UPLOAD_PASSWORD) return res.status(503).json({ error: 'A senha do painel ainda não foi cadastrada na Vercel (UPLOAD_PASSWORD).' });
  if (!senhaConfere(req.headers['x-senha'])) return res.status(401).json({ error: 'Senha incorreta.' });
  return res.status(200).json({ ok: true });
}
