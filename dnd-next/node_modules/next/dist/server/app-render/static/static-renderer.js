"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ServerRenderer: null,
    createStaticRenderer: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ServerRenderer: function() {
        return ServerRenderer;
    },
    createStaticRenderer: function() {
        return createStaticRenderer;
    }
});
class StaticRenderer {
    async render(children, streamOptions) {
        const { prelude, postponed } = await this.prerender(children, streamOptions);
        return {
            stream: prelude,
            postponed
        };
    }
    constructor(){
        // this is for tree shaking. Couldn't find a better way to do it for some reason
        this.prerender = process.env.__NEXT_EXPERIMENTAL_REACT ? require("react-dom/static.edge").prerender : null;
    }
}
class StaticResumeRenderer {
    constructor(postponed){
        this.postponed = postponed;
        this.resume = require("react-dom/server.edge").resume;
    }
    async render(children, streamOptions) {
        // TODO: Refactor StreamOptions because not all options apply to all React
        // functions so this factoring of trying to reuse a single render() doesn't
        // make sense. This is passing multiple invalid options that React should
        // error for.
        const stream = await this.resume(children, this.postponed, streamOptions);
        return {
            stream
        };
    }
}
class ServerRenderer {
    async render(children, options) {
        const stream = await this.renderToReadableStream(children, options);
        return {
            stream
        };
    }
    constructor(){
        this.renderToReadableStream = require("react-dom/server.edge").renderToReadableStream;
    }
}
function createStaticRenderer({ ppr, isStaticGeneration, postponed }) {
    if (ppr) {
        if (isStaticGeneration) {
            return new StaticRenderer();
        }
        if (postponed) {
            return new StaticResumeRenderer(postponed);
        }
    }
    return new ServerRenderer();
}

//# sourceMappingURL=static-renderer.js.map