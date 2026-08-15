import subprocess

class PyFormatter:
    def format(self, code:str) -> str:
        result = subprocess.run(
            ["ruff", "format", "--stdin-filename", "code.py", "-"],
            input=code,
            text=True,
            capture_output=True
        )

        if result.returncode != 0:
            raise ValueError(result.stderr.strip())
        
        return result.stdout