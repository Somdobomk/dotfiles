'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
let highlightDecoration;
let currentDecoration;
let omitLanguages;
var TAB_SIZE = 4;
// Table never gets deallocated, potential leak
var lineTable = new Map(); // Line dict 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "indented-block-highlighting" is now active! (var ts)');
    let config = vscode.workspace.getConfiguration("blockhighlight");
    omitLanguages = config.get("omit", ["plaintext"]);
    let blockHighlighter = new BlockHL;
    let blockHighlighterController = new BHLController(blockHighlighter);
    blockHighlighter.updateLine();
    context.subscriptions.push(blockHighlighter);
    context.subscriptions.push(blockHighlighterController);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
class BlockHL {
    updateLine() {
        var start = new Date().getTime(); // Timing
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        // Omit languages
        if (omitLanguages.indexOf(editor.document.languageId) > -1) {
            return;
        }
        // Handle Single Line 
        if (editor.selection.isSingleLine) {
            let topLine = this.findTop(editor);
            let botLine = this.findBot(editor, topLine);
            let HLRange;
            // Handle Significant Whitespace
            // TODO: Add config setting for this instead of hardcoding in python
            if (editor.document.languageId === 'python') {
                botLine = this.pruneTrailingWhitespace(editor, botLine);
            }
            // If top level statement that doesn't start a block the entire file is in it's context
            // if(editor.document.lineAt(editor.selection.active).firstNonWhitespaceCharacterIndex === 0
            if (this.getIndentLevel(editor, editor.document.lineAt(editor.selection.active)) === 0
                && !editor.document.lineAt(editor.selection.active).isEmptyOrWhitespace) {
                // Do nothing for now
                this.unhighlightAll(editor);
            }
            else {
                HLRange = new vscode.Range(topLine.lineNumber + 1, 0, botLine.lineNumber - 1, Number.MAX_VALUE);
                this.highlightRange(editor, HLRange);
            }
        }
        // Handle Multiple Lines
        // Right now just doesn't highlight anything
        else {
            this.unhighlightAll(editor);
        }
        // Timing
        var end = new Date().getTime();
        //#region [rgba(255, 255, 255, 0.1)] Timing Output 
        console.log("Update Time: ".concat(String(end - start)));
        console.log("Selected Line Level: " +
            this.getIndentLevel(editor, editor.document.lineAt(editor.selection.active)));
        //#endregion
    }
    findTop(editor) {
        let line = editor.document.lineAt(editor.selection.active);
        //If whitespace selected process closest nonwhitespace above it
        while (line.isEmptyOrWhitespace && line.lineNumber > 0) {
            line = editor.document.lineAt(line.lineNumber - 1);
        }
        if (line.lineNumber < editor.document.lineCount - 1 && !line.isEmptyOrWhitespace) {
            let nextLine = editor.document.lineAt(line.lineNumber + 1);
            // Find first nonwhitespace line
            while (nextLine.isEmptyOrWhitespace && nextLine.lineNumber < editor.document.lineCount - 1) {
                nextLine = editor.document.lineAt(nextLine.lineNumber + 1);
            }
        }
        let indentLevel = NaN;
        while (line.lineNumber > 0) {
            if (!line.isEmptyOrWhitespace) {
                let nextLevel = this.getIndentLevel(editor, line);
                if (Number.isNaN(indentLevel)) {
                    indentLevel = nextLevel;
                }
                if (nextLevel === 0) {
                    return line;
                }
                if (nextLevel < indentLevel) {
                    return line;
                }
            }
            line = editor.document.lineAt(line.lineNumber - 1);
        }
        return line;
    }
    findBot(editor, topLine) {
        let line = editor.document.lineAt(topLine.lineNumber + 1);
        let baseLevel = this.getIndentLevel(editor, editor.document.lineAt(editor.selection.active));
        while (line.lineNumber < editor.document.lineCount - 1) {
            if (!line.isEmptyOrWhitespace) {
                let nextLevel = this.getIndentLevel(editor, line);
                if (nextLevel < baseLevel || nextLevel === 0) {
                    //if(nextLevel <= this.getIndentLevel(editor, topLine)){
                    return line;
                }
            }
            line = editor.document.lineAt(line.lineNumber + 1);
        }
        console.log("EOF Reached");
        return line;
    }
    /**
     * Parses a line to get the indentation level manually
     * Assumes line is already non-whitespace
     * @param line Line to parse
     * @returns Number of space-equivalents in the line
     */
    getIndentLevel(editor, line) {
        // Deleet Cache block?
        //if(lineTable.has(line)){
        //   return lineTable.get(line);
        // }else{
        let indentLevel = line.firstNonWhitespaceCharacterIndex;
        let lineText = line.text;
        for (var i = 0; i < indentLevel; i++) {
            if (lineText.charAt(i) === '\t') {
                indentLevel += (TAB_SIZE - 1);
            }
        }
        lineTable.set(line, indentLevel);
        return indentLevel;
        // Cache block end
        // }
    }
    freeCurrentLine() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        lineTable.delete(editor.document.lineAt(editor.selection.active));
    }
    pruneTrailingWhitespace(editor, bot) {
        if (editor.document.lineCount < 2) {
            return bot;
        }
        let newBot = editor.document.lineAt(bot.lineNumber - 1);
        while (newBot.isEmptyOrWhitespace) {
            newBot = editor.document.lineAt(newBot.lineNumber - 1);
        }
        // Up 1 for highlighting range clipping
        newBot = editor.document.lineAt(newBot.lineNumber + 1);
        return newBot;
    }
    setCurrentDocumentTabSize() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let tabs;
        tabs = editor.options.tabSize;
        TAB_SIZE = tabs;
        console.log("Tab size of current document: " + TAB_SIZE);
    }
    changeActive() {
        console.log("Active Window Changed");
        this.setCurrentDocumentTabSize();
    }
    highlightRange(editor, range) {
        if (highlightDecoration) {
            highlightDecoration.dispose();
        }
        if (currentDecoration) {
            currentDecoration.dispose();
        }
        // Hard BG color
        let config = vscode.workspace.getConfiguration("blockhighlight");
        let wholeLine = config.get("isWholeLine", true);
        let accentCurrent = config.get("accentCurrentLine", true);
        let rgbaArray = config.get("background", ["200", "100", "255", ".05"]);
        let rgbaStr = "rgba("
            .concat(rgbaArray[0]).concat(", ")
            .concat(rgbaArray[1]).concat(", ")
            .concat(rgbaArray[2]).concat(", ")
            .concat(rgbaArray[3])
            .concat(")");
        highlightDecoration = vscode.window.createTextEditorDecorationType({
            backgroundColor: rgbaStr,
            isWholeLine: wholeLine
        });
        currentDecoration = vscode.window.createTextEditorDecorationType({
            backgroundColor: rgbaStr,
            isWholeLine: wholeLine
        });
        editor.setDecorations(highlightDecoration, [range]);
        if (accentCurrent) {
            editor.setDecorations(currentDecoration, [editor.selection]);
        }
        //console.log("Highlighting called on " + rgbaStr);
    }
    unhighlightAll(editor) {
        if (highlightDecoration) {
            highlightDecoration.dispose();
        }
        if (currentDecoration) {
            currentDecoration.dispose();
        }
    }
    dispose() {
    }
}
class BHLController {
    constructor(blockHL) {
        this._blockHL = blockHL;
        let subscriptions = [];
        vscode.window.onDidChangeActiveTextEditor(this._onChangeActive, this, subscriptions);
        vscode.window.onDidChangeTextEditorSelection(this._onLineChange, this, subscriptions);
        vscode.window.onDidChangeTextEditorOptions(this._onChangeOptions, this, subscriptions);
        vscode.workspace.onDidChangeTextDocument(this._onChangeText, this, subscriptions);
        this._disposable = vscode.Disposable.from(...subscriptions);
    }
    dispose() {
        this._disposable.dispose();
    }
    _onChangeOptions() {
        this._blockHL.setCurrentDocumentTabSize();
    }
    _onChangeText() {
        this._blockHL.freeCurrentLine();
    }
    _onChangeActive() {
        this._blockHL.changeActive();
    }
    _onLineChange() {
        this._blockHL.updateLine();
    }
}
//# sourceMappingURL=extension.js.map