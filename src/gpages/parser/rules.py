"""
This module contains the rule that are used by the parser.
The rules are describe as classes that inherit from the MarkdownSyntaxRule class.
Each rule use regular expressions to match the markdown syntax.

The following rule are implemented:
- Paragraph
- Headings
- Emphasis
- Strong emphasis
- Lists
- Ordered lists
- Blockquotes
- Code blocks
"""

import re

from .ast_node import ASTNode
from .markdown_syntax_rule import MarkdownSyntaxRule


class HeadingSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing headings.
    """

    def is_block(self) -> bool:
        return False

    def matches(self, line: str) -> bool:
        return re.match(r"^#+\s", line)

    def parse(self, line: str) -> ASTNode:
        heading_level = len(re.findall(r"^#+", line)[0])
        heading_content = re.sub(r"^#+\s", "", line)
        return ASTNode("heading", {"level": heading_level, "text": heading_content})


class EmphasisSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing emphasis.
    """

    def is_block(self) -> bool:
        return False

    def matches(self, line: str) -> bool:
        return re.match(r"(\*{1,2})(?=\S)(.*?)\1", line)

    def parse(self, line: str) -> ASTNode:
        emphasis_content = re.sub(r"\*", "", line)
        return ASTNode("emphasis", {"text": emphasis_content})


class StrongEmphasisSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing strong emphasis.
    """

    def is_block(self) -> bool:
        return False

    def matches(self, line: str) -> bool:
        return re.match(r".*__.*", line)

    def parse(self, line: str) -> ASTNode:
        strong_emphasis_content = re.sub(r"__", "", line)
        return ASTNode("strong_emphasis", {"text": strong_emphasis_content})


class UnorderedListSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing unordered lists.
    """

    def is_block(self) -> bool:
        return False

    def matches(self, line: str) -> bool:
        return re.match(r"^\s*[\*\-]\s", line)

    def parse(self, line: str) -> ASTNode:
        list_content = line.strip()[2:]
        return ASTNode("unordered_list", {"text": list_content})


class OrderedListSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing ordered lists.
    """

    def is_block(self) -> bool:
        return False

    def matches(self, line: str) -> bool:
        return re.match(r"^\s*\d+\.\s", line)

    def parse(self, line: str) -> ASTNode:
        list_content = line.strip()[3:]
        return ASTNode("ordered_list", {"text": list_content})


class BlockquoteSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing blockquotes.
    """

    def is_block(self) -> bool:
        return False

    def matches(self, line: str) -> bool:
        return re.match(r"^\s*>", line)

    def parse(self, line: str) -> ASTNode:
        blockquote_content = line[1:].strip()
        return ASTNode("blockquote", {"text": blockquote_content})


class CodeBlockSyntaxRule(MarkdownSyntaxRule):
    """
    Rule for parsing code blocks.
    """

    pattern = re.compile(r"^\s*```(.*)$")

    def is_block(self) -> bool:
        return True

    @classmethod
    def matches(cls, line: str) -> bool:
        return cls.pattern.match(line)

    def parse(self, line: str) -> ASTNode:
        match_obj = self.pattern.match(line)

        language = ""
        if match_obj:
            language = match_obj.group(1)

        return ASTNode("code_block", {"language": language, "code": ""})
