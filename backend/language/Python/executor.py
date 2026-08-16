import subprocess
import sys
import tempfile
import os

class PyExecuter:
    def execute(self, code:str, timeout: int = 5) -> dict:
        file_path = None

        try:
            with tempfile.NamedTemporaryFile(
                mode="w",
                suffix=".py",
                delete=False,
                encoding="utf-8"
            ) as file:
                file.write(code)
                file_path = file.name

            result = subprocess.run(
                [sys.executable, file_path],
                capture_output=True,
                text=True,
                timeout=timeout
            )

            return {
                "success": result.returncode == 0,
                "stdout": result.stdout,
                "stderr": result.stderr,
                "return_code": result.returncode
            }

        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "stdout": "",
                "stderr": "Execution timed out.",
                "return_code": None
            }

        finally:
            if file_path and os.path.exists(file_path):
                os.remove(file_path)

