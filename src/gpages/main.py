"""
The entrypoint for the GPages CLI.
"""
from gpages import parser

SYNTAX_RULE = [
    # parser.ParagraphSyntaxRule(),
    parser.HeadingSyntaxRule(),
    parser.EmphasisSyntaxRule(),
    parser.StrongEmphasisSyntaxRule(),
    parser.UnorderedListSyntaxRule(),
    parser.BlockquoteSyntaxRule(),
    parser.CodeBlockSyntaxRule(),
]


def main():
    """
    The main function for the GPages CLI.
    """
    markdown = "# Hello World\n\nThis is a test\n\n* This is a list\n* This is another item\n\n> This is a blockquote\n\n```\nThis is a code block\n```\n\n```Bash\nThis is a code block with language\n```\n"
    ast_parser = parser.ASTParser(SYNTAX_RULE)
    ast = ast_parser.parse(markdown)
    print(ast)
