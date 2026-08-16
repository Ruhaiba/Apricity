import json
import subprocess
import ast

class PyAnalyzer:
    def analyze(self, code: str) -> list[dict]:
        result = subprocess.run(
            ["ruff", "check", "--stdin-filename", "code.py", "--output-format", "json", "-"],
            input=code,
            text=True,
            capture_output=True
        )

        if not result.stdout:
            return []

        findings = json.loads(result.stdout)

        return [
            {
                "code": finding["code"],
                "message": finding["message"],
                "line":finding["location"]["row"],
                "column": finding["location"]["column"],
                "severity": finding["severity"],
                "fix": finding.get("fix")
            }
            for finding in findings
        ]


    def analyze_structure(self, code: str) -> dict:
        tree = ast.parse(code)

        functions = []
        classes = []
        imports = []

        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                functions.append(node.name)

            elif isinstance(node, ast.ClassDef):
                classes.append(node.name)

            elif isinstance(node, ast.Import):
                for name in node.names:
                    imports.append(name.name)

            elif isinstance(node, ast.ImportFrom):
                imports.append(node.module)

        return {
            "functions": functions,
            "classes": classes,
            "imports": imports
        }