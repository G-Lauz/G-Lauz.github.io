"""
The AST parser for the GPages language.
"""
from .ast_node import ASTNode
from .markdown_syntax_rule import MarkdownSyntaxRule


class ASTParser:
    """
    The ASTParser class is used to parse a markdown document
    into an abstract syntax tree.
    """

    def __init__(self, syntax_rules: list[MarkdownSyntaxRule]):
        self.syntax_rules = syntax_rules
        self.root = ASTNode("root")

    def parse(self, markdown: str) -> ASTNode:
        current_node = self.root
        lines = markdown.splitlines()
        # return self._parse_line(lines, current_node)

        while len(lines) > 0:
            line = lines[0]
            node = None

            for rule in self.syntax_rules:
                if rule.matches(line):
                    if rule.is_block():
                        node = self._parse_block(lines, rule)
                    else:
                        node = self._parse_line(line, rule)
                    break

            if node is None:
                node = ASTNode("paragraph", {"text": line})

            if len(lines) > 0:
                lines.pop(0)

            current_node.add_child(node)
        return current_node

    def _parse_block(self, lines: list[str], rule: MarkdownSyntaxRule) -> ASTNode:
        node = rule.parse(lines[0])

        lines.pop(0)
        while len(lines) > 0 and not self._is_new_block(lines[0]):
            for rule in self.syntax_rules:
                child_node = None
                if rule.matches(lines[0]):
                    if rule.is_block():
                        child_node = self._parse_block(lines, rule)
                    else:
                        child_node = self._parse_line(lines[0], rule)
                    break

            if child_node is None:
                child_node = ASTNode("paragraph", {"text": lines[0]})

            node.add_child(child_node)
            lines.pop(0)

        return node

    def _parse_line(self, line: str, rule: MarkdownSyntaxRule) -> ASTNode:
        return rule.parse(line)

    def _is_new_block(self, line: str) -> bool:
        return any(
            rule.matches(line) for rule in self.syntax_rules if rule != self.syntax_rules[0]
        )
