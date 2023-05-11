/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 661:
/***/ ((module) => {

module.exports = eval("require")("./utils/fileHelpers/changelog");


/***/ }),

/***/ 674:
/***/ ((module) => {

module.exports = eval("require")("./utils/fileHelpers/packageFile");


/***/ }),

/***/ 245:
/***/ ((module) => {

module.exports = eval("require")("./utils/git");


/***/ }),

/***/ 549:
/***/ ((module) => {

module.exports = eval("require")("./utils/version");


/***/ }),

/***/ 921:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 536:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 304:
/***/ ((module) => {

module.exports = eval("require")("moment");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(921);
const github = __nccwpck_require__(536);
const Version = __nccwpck_require__(549);
const ChangeLog = __nccwpck_require__(661);
const PackageFile = __nccwpck_require__(674);
const Git = __nccwpck_require__(245);
const moment = __nccwpck_require__(304);

const main = async () => {
    const gitHelper = new Git();
    try {
        const token = core.getInput('slack-webhook-url', { required: true });

        const { 
            context: { payload: contextPayload, eventName },
            event
        } = github;

        const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');

        if (eventName !== 'pull_request' || contextPayload.pull_request === undefined || contextPayload.action !== 'closed' || contextPayload.pull_request.merged !== true || contextPayload.pull_request.draft === true) {
            console.log('ERROR :: This action should only be run on a closed pull request that has been merged');
            process.exit(1);
        }

        const { number: pullRequestNumber, title: pullRequestTitle, body: pullRequestBody } = contextPayload.pull_request;

        console.log(`Context >> `, JSON.stringify(contextPayload));
        console.log(`Event >> `, JSON.stringify(event));

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
})();

module.exports = __webpack_exports__;
/******/ })()
;