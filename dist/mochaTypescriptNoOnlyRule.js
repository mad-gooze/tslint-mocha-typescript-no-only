"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tslint_1 = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoOnlyWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        description: "Disallows @only suites and tests with mocha-typescript",
        options: null,
        optionsDescription: "Not configurable.",
        ruleName: "mocha-typescript-no-only",
        type: "maintainability",
        typescriptOnly: true,
    };
    return Rule;
}(tslint_1.Rules.AbstractRule));
exports.Rule = Rule;
function isTestOnlyDecorator(decoratorNode) {
    var nodeText = decoratorNode.getText();
    return (nodeText === "@only" ||
        nodeText === "@test.only" ||
        nodeText.startsWith("@test.only("));
}
function isSuiteOnlyDecorator(decoratorNode) {
    var nodeText = decoratorNode.getText();
    return (nodeText === "@only" ||
        nodeText === "@suite.only" ||
        nodeText.startsWith("@suite.only("));
}
var NoOnlyWalker = /** @class */ (function (_super) {
    __extends(NoOnlyWalker, _super);
    function NoOnlyWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failAtNode = function (node) {
            _this.addFailureAt(node.getStart(), node.getWidth(), "@only tests are not allowed");
        };
        return _this;
    }
    NoOnlyWalker.prototype.visitClassDeclaration = function (node) {
        if (Array.isArray(node.decorators)) {
            node.decorators
                .filter(isSuiteOnlyDecorator)
                .forEach(this.failAtNode);
        }
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    NoOnlyWalker.prototype.visitMethodDeclaration = function (node) {
        if (Array.isArray(node.decorators)) {
            node.decorators
                .filter(isTestOnlyDecorator)
                .forEach(this.failAtNode);
        }
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    return NoOnlyWalker;
}(tslint_1.RuleWalker));
