import ast
from typing import Any


class PyParser:
    def __init__(self):
        pass

    def parse(self, code: str) -> ast.AST:
        return ast.parse(code)

    def check_syntax(self, code: str) -> dict:
        try:
            ast.parse(code)

            return {
                "valid": True,
                "error": None
            }

        except SyntaxError as e:
            return {
                "valid": False,
                "error": {
                    "type": "SyntaxError",
                    "message": e.msg,
                    "line": e.lineno,
                    "column": e.offset
                }
            }

    def get_nodes(self, code: str) -> list[ast.AST]:
        tree = ast.parse(code)
        return list(ast.walk(tree))

    def get_definitions(self, code: str) -> dict:
        tree = ast.parse(code)

        functions = []
        classes = []
        imports = []

        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                functions.append(node.name)

            if isinstance(node, ast.ClassDef):
                classes.append(node.name)

            if isinstance(node, ast.Import):
                for name in node.names:
                    imports.append(name.name)

        return {
            "functions": functions,
            "classes": classes,
            "imports": imports
        }

    def get_locations(self, code: str) -> list[dict]:
        tree = ast.parse(code)

        locations = []

        for node in ast.walk(tree):
            if hasattr(node, "lineno"):
                locations.append({
                    "type": type(node).__name__,
                    "line": node.lineno,
                    "column": node.col_offset
                })

        return locations