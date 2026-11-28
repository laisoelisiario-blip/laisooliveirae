// Funções compartilhadas entre as rotas do painel.
import { timingSafeEqual } from 'node:crypto';

// Espaços do site que podem receber foto ou vídeo.
export const ESPACOS = {
  'foto-capa': 'imagem', 'foto-sobre': 'imagem', 'polaroid': 'imagem',
  'foto-1': 'imagem', 'foto-2': 'imagem', 'foto-3': 'imagem',
  'foto-4': 'imagem', 'foto-5': 'imagem', 'foto-6': 'imagem',
  'video-1': 'video', 'video-2': 'video', 'video-3': 'video', 'video-4': 'video',
};

export const TIPOS = {
  imagem: ['image/jpeg', 'image/png', 'image/webp'],
  video: ['video/mp4', 'video/quicktime', 'video/webm'],
};

export function senhaConfere(senha) {
  const certa = process.env.UPLOAD_PASSWORD;
  if (!certa || typeof senha !== 'string') return false;
  const a = Buffer.from(senha), b = Buffer.from(certa);
  return a.length === b.length && timingSafeEqual(a, b);
}
