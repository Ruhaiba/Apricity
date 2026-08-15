import subprocess
import os
import sys
import tempfile


class PyTester:
    def test(self, code: str, tests: str, timeout: int = 10) -> dict:
        code_path = None
        test_path = None

        try:
            with tempfile.TemporaryDirectory() as temp_dir:
                code_path = os.path.join(temp_dir, "solution.py")
                test_path = os.path.join(temp_dir, "test_solution.py")

                with open(code_path, "w", encoding="utf-8") as file:
                    file.write(code)

                with open(test_path, "w", encoding="utf-8") as file:
                    file.write(tests)

                env = os.environ.copy()
                env["PYTHONPATH"] = temp_dir

                result = subprocess.run(
                    [sys.executable, "-m", "pytest", test_path, "-q"],
                    capture_output=True,
                    text=True,
                    timeout=timeout,
                    cwd=temp_dir,
                    env=env
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
                "stderr": "Testing timed out.",
                "return_code": None
            }


if __name__ == "__main__":
    tester = PyTester()

    code = """
def add(a, b):
    return a + b
"""

    tests = """
from solution import add

def test_add():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-2, 2) == 0
"""

    result = tester.test(code, tests)

    print(result)