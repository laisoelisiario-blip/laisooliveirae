# Portfólio UGC

Site estático (só HTML e CSS), publicado na Vercel com a pasta `portfolio` como raiz.

## Como trocar fotos e vídeos

Basta salvar o arquivo com o nome certo. Enquanto o arquivo não existir, aparece um quadro listrado com o nome esperado.

| Onde aparece | Arquivo |
| --- | --- |
| Capa (foto recortada, sem fundo, PNG) | `img/foto-capa.png` |
| Sobre | `img/foto-sobre.jpg` |
| Polaroid | `img/polaroid.jpg` |
| Fotografia (6 fotos) | `img/foto-1.jpg` a `img/foto-6.jpg` |
| Vídeos UGC (verticais 9:16) | `videos/video-1.mp4` a `videos/video-4.mp4` |
| Imagem ao compartilhar o link | `img/foto-perfil.jpg` |

Textos, nichos, serviços, e-mail e links de TikTok/WhatsApp estão no `index.html`.

## Começando sem marcas?

Grave vídeos de exemplo com produtos que você já tem em casa (get ready with me, review, tutorial, antes e depois) e use nos espaços de vídeo e foto. Quando fechar a primeira parceria, dá para voltar com uma seção de marcas.

## Painel de fotos (`/painel`)

Página só sua para trocar fotos e vídeos pelo celular, sem mexer no código.

- Endereço: `https://lais-ugc-portfolio.vercel.app/painel`
- Os arquivos vão para o Vercel Blob (armazenamento da Vercel), então vídeos grandes funcionam (até 500 MB).
- O que é enviado pelo painel aparece no lugar do arquivo original do mesmo espaço. "Remover" volta ao original.
- A senha fica na variável `UPLOAD_PASSWORD` do projeto na Vercel (Settings → Environment Variables). Depois de criar ou trocar a senha, é preciso publicar de novo (Redeploy).

Arquivos: `painel/index.html` (página), `painel/blob-client.js` (biblioteca `@vercel/blob/client` 2.8.2 empacotada para o navegador), `api/*.js` (rotas de envio, lista e remoção).
