"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSlackConnectionForFlowMode = exports.checkSlackConnection = exports.showModalSignupPrompt = exports.disconnectSlackAuth = exports.disconnectSlackWorkspace = exports.disconectAllSlackIntegrations = exports.connectSlackWorkspace = exports.hasSlackWorkspaces = exports.getSlackWorkspaces = void 0;
const vscode_1 = require("vscode");
const Constants_1 = require("../Constants");
const Util_1 = require("../Util");
const MenuManager_1 = require("../menu/MenuManager");
const HttpClient_1 = require("../http/HttpClient");
const url_1 = require("url");
const DataController_1 = require("../DataController");
// -------------------------------------------
// - public methods
// -------------------------------------------
// get saved slack integrations
function getSlackWorkspaces() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield (0, DataController_1.getCachedSlackIntegrations)()).filter((n) => (0, Util_1.isActiveIntegration)('slack', n));
    });
}
exports.getSlackWorkspaces = getSlackWorkspaces;
function hasSlackWorkspaces() {
    return __awaiter(this, void 0, void 0, function* () {
        return !!(yield (0, DataController_1.getCachedSlackIntegrations)()).length;
    });
}
exports.hasSlackWorkspaces = hasSlackWorkspaces;
// connect slack flow
function connectSlackWorkspace() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, Util_1.getItem)('name')) {
            showModalSignupPrompt('Connecting Slack requires a registered account. Sign up or log in to continue.');
            return;
        }
        const params = new url_1.URLSearchParams();
        params.append('plugin', (0, Util_1.getPluginType)());
        params.append('plugin_uuid', (0, Util_1.getPluginUuid)());
        params.append('pluginVersion', (0, Util_1.getVersion)());
        params.append('plugin_id', `${(0, Util_1.getPluginId)()}`);
        params.append('auth_callback_state', (0, Util_1.getAuthCallbackState)());
        params.append('integrate', 'slack');
        params.append('upgrade_features', 'flow');
        params.append('plugin_token', (0, Util_1.getItem)('jwt'));
        const url = `${Constants_1.api_endpoint}/auth/slack?${params.toString()}`;
        // authorize the user for slack
        (0, Util_1.launchWebUrl)(url);
    });
}
exports.connectSlackWorkspace = connectSlackWorkspace;
function disconectAllSlackIntegrations(showPrompt = true) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const workspaces = yield getSlackWorkspaces();
        if (workspaces === null || workspaces === void 0 ? void 0 : workspaces.length) {
            try {
                for (var workspaces_1 = __asyncValues(workspaces), workspaces_1_1; workspaces_1_1 = yield workspaces_1.next(), !workspaces_1_1.done;) {
                    const workspace = workspaces_1_1.value;
                    yield disconnectSlackAuth(workspace.auth_id, showPrompt);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (workspaces_1_1 && !workspaces_1_1.done && (_a = workspaces_1.return)) yield _a.call(workspaces_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    });
}
exports.disconectAllSlackIntegrations = disconectAllSlackIntegrations;
function disconnectSlackWorkspace() {
    return __awaiter(this, void 0, void 0, function* () {
        // pick the workspace to disconnect
        const selectedTeamDomain = yield showSlackWorkspaceSelection();
        if (selectedTeamDomain) {
            disconnectSlackAuth(selectedTeamDomain.auth_id);
        }
    });
}
exports.disconnectSlackWorkspace = disconnectSlackWorkspace;
// disconnect slack flow
function disconnectSlackAuth(auth_id, showPrompt = true) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // get the domain
        const integration = (yield getSlackWorkspaces()).find((n) => n.auth_id === auth_id);
        if (!integration) {
            vscode_1.window.showErrorMessage('Unable to find selected integration to disconnect');
            vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
            return;
        }
        // ask before disconnecting
        let selection = Constants_1.DISCONNECT_LABEL;
        if (showPrompt) {
            const team_domain = (_b = (_a = integration.meta) === null || _a === void 0 ? void 0 : _a.domain) !== null && _b !== void 0 ? _b : '';
            selection = yield vscode_1.window.showInformationMessage(`Are you sure you would like to disconnect the '${team_domain}' Slack workspace?`, ...[Constants_1.DISCONNECT_LABEL]);
        }
        if (selection === Constants_1.DISCONNECT_LABEL) {
            yield (0, HttpClient_1.softwareDelete)(`/integrations/${integration.id}`, (0, Util_1.getItem)('jwt'));
            // disconnected, remove it from the integrations
            removeSlackIntegration(auth_id);
            vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
        }
    });
}
exports.disconnectSlackAuth = disconnectSlackAuth;
// -------------------------------------------
// - private methods
// -------------------------------------------
function showSlackWorkspaceSelection() {
    return __awaiter(this, void 0, void 0, function* () {
        let menuOptions = {
            items: [],
            placeholder: `Select a Slack workspace`,
        };
        (yield getSlackWorkspaces()).forEach((integration) => {
            menuOptions.items.push({
                label: integration.team_domain,
                value: integration.team_domain,
            });
        });
        menuOptions.items.push({
            label: 'Connect a Slack workspace',
            command: 'musictime.connectSlack',
        });
        const pick = yield (0, MenuManager_1.showQuickPick)(menuOptions);
        if (pick) {
            if (pick.value) {
                return pick.value;
            }
            else if (pick.command) {
                vscode_1.commands.executeCommand(pick.command);
                return null;
            }
        }
        return null;
    });
}
/**
 * Remove an integration from the local copy
 * @param auth_id
 */
function removeSlackIntegration(auth_id) {
    (0, DataController_1.getUser)();
}
function showModalSignupPrompt(msg) {
    vscode_1.window
        .showInformationMessage(msg, {
        modal: true,
    }, Constants_1.SIGN_UP_LABEL)
        .then((selection) => __awaiter(this, void 0, void 0, function* () {
        if (selection === Constants_1.SIGN_UP_LABEL) {
            vscode_1.commands.executeCommand('codetime.registerAccount');
        }
    }));
}
exports.showModalSignupPrompt = showModalSignupPrompt;
function checkSlackConnection(showConnect = true) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield hasSlackWorkspaces())) {
            if (showConnect) {
                vscode_1.window
                    .showInformationMessage('Connect a Slack workspace to continue.', {
                    modal: true,
                }, 'Connect')
                    .then((selection) => __awaiter(this, void 0, void 0, function* () {
                    if (selection === 'Connect') {
                        vscode_1.commands.executeCommand('codetime.connectSlackWorkspace');
                    }
                }));
            }
            return false;
        }
        return true;
    });
}
exports.checkSlackConnection = checkSlackConnection;
function checkSlackConnectionForFlowMode() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield hasSlackWorkspaces())) {
            const selection = yield vscode_1.window.showInformationMessage("Slack isn't connected", { modal: true }, ...['Continue anyway', 'Connect Slack']);
            if (!selection) {
                // the user selected "cancel"
                return { continue: false, useSlackSettings: true };
            }
            else if (selection === 'Continue anyway') {
                // slack is not connected, but continue. set useSlackSettings to FALSE
                // set continue to TRUE
                (0, Util_1.setItem)('vscode_CtskipSlackConnect', true);
                return { continue: true, useSlackSettings: false };
            }
            else {
                // connect was selected
                vscode_1.commands.executeCommand('codetime.manageSlackConnection');
                return { continue: false, useSlackSettings: true };
            }
        }
        return { continue: true, useSlackSettings: true };
    });
}
exports.checkSlackConnectionForFlowMode = checkSlackConnectionForFlowMode;
//# sourceMappingURL=SlackManager.js.map