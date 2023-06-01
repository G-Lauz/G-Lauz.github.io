"""
Base class for all tokens.
"""


class Token:
    """
    Base class for all tokens.
    """

    def __repr__(self):
        return self._repr_helper(self, 0)

    def _repr_helper(self, token, level):
        indent = " " * 4 * level
        if not token.children:
            return f"{indent}ASTNode({token.type}, {token.content}, [])"
        else:
            children = [self._repr_helper(child, level + 1) for child in token.children]
            children_str = ",\n".join(children)
            return (
                f"{indent}ASTNode({token.type}, {token.content}, ["
                f"\n{children_str}\n"
                f"{indent}])"
            )
