from backend.language.Python.toolbox import PyToolbox

class Router:
    def __init__(self):
        self.tools = {
            "Python": PyToolbox()
        }

    def get_toolbox(self, language: str):
        if language not in self.tools:
            raise ValueError(f"Unsupported Language : {language}")

        return self.tools[language]