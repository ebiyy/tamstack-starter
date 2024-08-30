import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { createHonoOpenApiRouter } from '@blgc/openapi-router';
import { zValidator } from 'validation-adapters/zod';
import * as z from 'zod';
import { cors } from 'hono/cors'

import { paths } from '@repo/openapi'; // OpenAPI-generated types

const app = new Hono()
app.use(etag(), logger())
app.use('/*', cors())

app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

export const openApiRouter = createHonoOpenApiRouter<paths>(app);

// GET /pet/{petId}
openApiRouter.get('/pet/{petId}', {
  pathValidator: zValidator(
    z.object({
      petId: z.number() // Validate that petId is a number
    })
  ),
  handler: (c) => {
    const { petId } = c.req.valid('param'); // Access validated params
    return c.json({ name: 'Falko', photoUrls: [] }); 
  },
},);

// POST /pet
openApiRouter.post('/pet', {
  bodyValidator: zValidator(
    z.object({
        name: z.string(), // Validate that petId is a number
        photoUrls: z.array(z.string())
      })
  ), // Validate request body using PetSchema
  handler: (c) => {
    const { name, photoUrls } = c.req.valid('json'); // Access validated body data
    return c.json({ name, photoUrls }); 
  }
});

export default app
