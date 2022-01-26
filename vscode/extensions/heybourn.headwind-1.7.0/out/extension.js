'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
const child_process_1 = require("child_process");
const rustywind_1 = require("rustywind");
const config = vscode_1.workspace.getConfiguration();
const configRegex = config.get('headwind.classRegex') || {};
const sortOrder = config.get('headwind.defaultSortOrder');
const customTailwindPrefixConfig = config.get('headwind.customTailwindPrefix');
const customTailwindPrefix = typeof customTailwindPrefixConfig === 'string'
    ? customTailwindPrefixConfig
    : '';
const shouldRemoveDuplicatesConfig = config.get('headwind.removeDuplicates');
const shouldRemoveDuplicates = typeof shouldRemoveDuplicatesConfig === 'boolean'
    ? shouldRemoveDuplicatesConfig
    : true;
const shouldPrependCustomClassesConfig = config.get('headwind.prependCustomClasses');
const shouldPrependCustomClasses = typeof shouldPrependCustomClassesConfig === 'boolean'
    ? shouldPrependCustomClassesConfig
    : false;
function activate(context) {
    let disposable = vscode_1.commands.registerTextEditorCommand('headwind.sortTailwindClasses', function (editor, edit) {
        const editorText = editor.document.getText();
        const editorLangId = editor.document.languageId;
        const classWrapperRegex = new RegExp(configRegex[editorLangId] || configRegex['html'], 'gi');
        let classWrapper;
        while ((classWrapper = classWrapperRegex.exec(editorText)) !== null) {
            const wrapperMatch = classWrapper[0];
            const valueMatchIndex = classWrapper.findIndex((match, idx) => idx !== 0 && match);
            const valueMatch = classWrapper[valueMatchIndex];
            const startPosition = classWrapper.index + wrapperMatch.lastIndexOf(valueMatch);
            const endPosition = startPosition + valueMatch.length;
            const range = new vscode_1.Range(editor.document.positionAt(startPosition), editor.document.positionAt(endPosition));
            const options = {
                shouldRemoveDuplicates,
                shouldPrependCustomClasses,
                customTailwindPrefix
            };
            edit.replace(range, utils_1.sortClassString(valueMatch, Array.isArray(sortOrder) ? sortOrder : [], options));
        }
    });
    let runOnProject = vscode_1.commands.registerCommand('headwind.sortTailwindClassesOnWorkspace', () => {
        let workspaceFolder = vscode_1.workspace.workspaceFolders || [];
        if (workspaceFolder[0]) {
            vscode_1.window.showInformationMessage(`Running Headwind on: ${workspaceFolder[0].uri.fsPath}`);
            let rustyWindArgs = [
                workspaceFolder[0].uri.fsPath,
                '--write',
                shouldRemoveDuplicates ? '' : '--allow-duplicates'
            ].filter(arg => arg !== '');
            let rustyWindProc = child_process_1.spawn(rustywind_1.rustyWindPath, rustyWindArgs);
            rustyWindProc.stdout.on('data', data => data &&
                data.toString() !== '' &&
                console.log('rustywind stdout:\n', data.toString()));
            rustyWindProc.stderr.on('data', data => {
                if (data && data.toString() !== '') {
                    console.log('rustywind stderr:\n', data.toString());
                    vscode_1.window.showErrorMessage(`Headwind error: ${data.toString()}`);
                }
            });
        }
    });
    context.subscriptions.push(runOnProject);
    context.subscriptions.push(disposable);
    // if runOnSave is enabled organize tailwind classes before saving
    if (config.get('headwind.runOnSave')) {
        context.subscriptions.push(vscode_1.workspace.onWillSaveTextDocument(_e => {
            vscode_1.commands.executeCommand('headwind.sortTailwindClasses');
        }));
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map