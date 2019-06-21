class HelloWorldPlugin {
    apply(compiler) {
      // @see https://webpack.docschina.org/api/compiler-hooks/#src/components/Sidebar/Sidebar.jsx

      compiler.hooks.done.tap('done Plugin', (
        stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
      ) => {
        console.log('完成钩子');
      });

      compiler.hooks.compile.tap('compile plugin', (
        stats,
      ) => {
        console.log('解析钩子');
      });

      compiler.hooks.emit.tapAsync('async plugin', (compilation, callback) => {
        // @see https://webpack.docschina.org/api/compilation-hooks/#src/components/Sidebar/Sidebar.jsx
        console.log('异步钩子\n');
        let filelist = 'In this build:\n\n';

        for (let filename in compilation.assets) {
          filelist += '- ' + filename + '\n';
        }

        compilation.assets['filelist.md'] = {
          source() {
            return filelist;
          },
          size() {
            return filelist.length;
          }
        };

        callback(); // 调用回调，结束插件流程
      });

      compiler.hooks.run.tapPromise('promise plugin', async (source, target, routesList) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('promise 钩子');
      });
    }
  }
  
  module.exports = HelloWorldPlugin;
  