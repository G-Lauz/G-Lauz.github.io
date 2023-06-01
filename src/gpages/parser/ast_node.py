"""
The ASTNode class, which is used to represent the
abstract syntax tree of a markdown document.
"""


class ASTNode:
    def __init__(self, node_type, content=None):
        self.type = node_type
        self.content = content
        self.children = []

    def __repr__(self):
        return self._repr_helper(self, 0)

    def _repr_helper(self, node, level):
        indent = " " * 4 * level
        if not node.children:
            return f"{indent}ASTNode({node.type}, {node.content}, [])"
        else:
            children = [self._repr_helper(child, level + 1) for child in node.children]
            children_str = ",\n".join(children)
            return f"{indent}ASTNode({node.type}, {node.content}, [\n{children_str}\n{indent}])"

    def add_child(self, child):
        self.children.append(child)
