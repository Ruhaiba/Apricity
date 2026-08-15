import json
import subprocess

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

analyzer = PyAnalyzer()

code = """
import os

def add(a, b):
    return a + b
"""

print(analyzer.analyze(code))