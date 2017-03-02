## DEMO LINK
https://dpmango.github.io/uala/dist/

## Getting stated
__Development:__
- Install node.js and npm
- Run `npm i`
- Run `gulp` (default task)
- Work with `/src` folder and get the processing result in /dist

__Production__
- Run `gulp build`
- Check compiled result in `/dist` folder

## Tasks
- `postcss` - including sass like plugins, autoprefixer, SugarSS
- `pug` - compile pug templates
- `useref` - optimize .css and .js
- `cssnano` - minify css in dest folder
- `images` - imagemin for graphics optimization
- `browserSync` - serve assets with hot reload from `./src` folder
- `clean:dist` - clean dist folder to prevent conflicts before build
