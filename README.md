# svg-add-bg-fn

A vercel serverless function for adding a background to transparent SVG images.

## Usage

Use the following URL structure to make a request:

```
https://svg-add-bg-fn.vercel.app/?svg=<SVG_IMAGE_URL>[&color=<COLOR>]
```

This full URL can be used anywhere as a image source: html, markdown etc.

Default color is white.

## Deploy

Simply run `vercel` at the repository root.

In case you want to test locally:

```
npm install
vercel dev
```

The development server usually runs on `localhost:3000`.
Use the following URL structure for `localhost`:

```
http://localhost:3000/?svg=<SVG_IMAGE_URL>[&color=<COLOR>]
```
## License

This repository is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.
