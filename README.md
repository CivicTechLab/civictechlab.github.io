# CivicTech Lab Website

This website is developed using Astro + React + Bootstrap + TinaCMS.

## TinaCMS

TinaCMS with visual editing is integrated into this website for ease of content updates.

To access the CMS, simply visit the `/admin` route. For example, if your site is deployed route at `https://www.example.com`, to open TinaCMS, go to `https://www.example.com/admin`.

On the development server, you may have to access `/admin/index.html` instead.

## For developers

### Getting started

1. Clone this repository
2. Install dependencies
   ```
   yarn install
   ```
3. Run the local development server
   ```
   yarn dev
   ```

### Deployment

1. The environment variables `TINA_CLIENT_ID` and `TINA_TOKEN` are necessary for a successful deployment. See [Tina Cloud Documentation](https://tina.io/docs/tina-cloud/overview/) for more details.
2. Build the website using `yarn build` and deploy the website using the `dist` folder.
