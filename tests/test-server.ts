import http from 'http';
import fs from 'fs';
import path from 'path';
import { AddressInfo } from 'net';

export class TestServer {
  private server: http.Server;
  public baseUrl: string = '';

  constructor(private fixtureDir: string) {
    this.server = http.createServer((req, res) => {
      const filePath = path.join(this.fixtureDir, req.url === '/' ? 'index.html' : req.url || '');
      
      // Basic security to prevent directory traversal
      if (!filePath.startsWith(this.fixtureDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end('Not Found');
          return;
        }
        
        const ext = path.extname(filePath);
        let contentType = 'text/plain';
        if (ext === '.html') contentType = 'text/html';
        if (ext === '.css') contentType = 'text/css';
        
        res.setHeader('Content-Type', contentType);
        res.end(data);
      });
    });
  }

  start(): Promise<string> {
    return new Promise((resolve) => {
      this.server.listen(0, '127.0.0.1', () => {
        const address = this.server.address() as AddressInfo;
        this.baseUrl = `http://127.0.0.1:${address.port}`;
        resolve(this.baseUrl);
      });
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
