"""
MarkdownSyntaxRule is an abstract class that defines the interface for
implementing a rule for parsing a markdown syntax.
"""
import abc

from gpages import parser


class MarkdownSyntaxRule(abc.ABC):
    """
    Abstract class that defines the interface for
    implementing a rule for parsing a markdown syntax.
    """

    @abc.abstractmethod
    def is_block(self) -> bool:
        pass

    @abc.abstractmethod
    def matches(self, line: str) -> bool:
        pass

    @abc.abstractmethod
    def parse(self, line: str) -> parser.ASTNode:
        pass
