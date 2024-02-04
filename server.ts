import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import bodyParser from 'body-parser';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.use(cors());
  function logRequests(req: any, res: any, next: any) {
    console.log(`${new Date().toISOString()} - ${req.method} Request to ${req.originalUrl}`);
    next(); // Continue to the next middleware or route handler
  }

  // Apply the middleware
  server.use(logRequests);

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(bodyParser.json());
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  const mockUser = {
    username: 'asdf',
    password: 'asdf', // Note: In a real application, use hashed passwords
  };

  server.post('/api/submit-email', async (req, res) => {
    const { email } = req.body;
    // Here, you'd connect to DocumentDB and insert the data.
    console.log(email);
    res.status(200).send('Email submitted successfully!');
  });


  // Login Endpoint
  server.post('/login', (req, res) => {
    console.log('login!');
    const { username, password } = req.body;

    if (username === mockUser.username && password === mockUser.password) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  server.post('/register', (req, res) => {
    console.log('register!');
    const { username, password } = req.body;

    if (username === mockUser.username && password === mockUser.password) {
      res.json({ success: true, message: 'Registration successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
  // Example Express Rest API endpoints
  server.get('/api/**', (req, res) => {
    console.log('here!');
  });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    }),
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  console.log('loading app');
  const server = app();
  console.log('app loaded');
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
