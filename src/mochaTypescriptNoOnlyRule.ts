import { IRuleMetadata, RuleFailure, Rules, RuleWalker } from "tslint";
import {
    ClassDeclaration,
    Decorator,
    MethodDeclaration,
    Node,
    SourceFile,
} from "typescript";

export class Rule extends Rules.AbstractRule {
    public static metadata: IRuleMetadata = {
        description: "Disallows @only suites and tests with mocha-typescript",
        options: null,
        optionsDescription: "Not configurable.",
        ruleName: "mocha-typescript-no-only",
        type: "maintainability",
        typescriptOnly: true,
    };

    public apply(sourceFile: SourceFile): RuleFailure[] {
        return this.applyWithWalker(
            new NoOnlyWalker(sourceFile, this.getOptions()),
        );
    }
}

function isTestOnlyDecorator(decoratorNode: Decorator): boolean {
    const nodeText = decoratorNode.getText();
    return (
        nodeText === "@only" ||
        nodeText === "@test.only" ||
        nodeText.startsWith("@test.only(")
    );
}

function isSuiteOnlyDecorator(decoratorNode: Decorator): boolean {
    const nodeText = decoratorNode.getText();
    return (
        nodeText === "@only" ||
        nodeText === "@suite.only" ||
        nodeText.startsWith("@suite.only(")
    );
}

class NoOnlyWalker extends RuleWalker {
    protected visitClassDeclaration(node: ClassDeclaration): void {
        if (Array.isArray(node.decorators)) {
            node.decorators
                .filter(isSuiteOnlyDecorator)
                .forEach(this.failAtNode);
        }
        super.visitClassDeclaration(node);
    }

    protected visitMethodDeclaration(node: MethodDeclaration): void {
        if (Array.isArray(node.decorators)) {
            node.decorators
                .filter(isTestOnlyDecorator)
                .forEach(this.failAtNode);
        }
        super.visitMethodDeclaration(node);
    }

    private failAtNode: (node: Node) => void = node => {
        this.addFailureAt(
            node.getStart(),
            node.getWidth(),
            "@only tests are not allowed",
        );
    };
}
