import { NowRequest, NowResponse } from '@now/node';
import { getImage } from "./chromium";
import { createTemplate } from './template';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (req.query.raw) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?raw=<string></p>`);
  }
}

async function generateImage(req: NowRequest, res: NowResponse) {
  try {
    const raw: string = Array.isArray(req.query.raw) ? req.query.raw.join() : req.query.raw;
    const template = createTemplate(raw);
    const file = await getImage(template);
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}
