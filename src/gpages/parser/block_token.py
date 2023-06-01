"""
Base class for block tokens. A block token is a token that spans over multiple lines.
"""
from .token import Token


class BlockToken(Token):
    """
    Base class for block tokens. A block token is a token that spans over multiple lines.
    It will recursively parse inner tokens.

    Attributes:
        type (str): The type of the token.
        children (list[Token]): The children of the token.
    """

    def __init__(self, token_type):
        self.type = token_type
        self.children = []
