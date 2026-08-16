class Verifier:
    def __init__(self, toolbox):
        self.toolbox = toolbox

    def verify(self, code:str) -> dict:
        syntax = self.toolbox.parser.check_syntax(code)

        if not syntax["valid"]:
            return {
                "success": False,
                "syntax": syntax,
                "analysis": []
            }

        analysis = self.toolbox.analyzer.analyze(code)

        return {
            "success": True,
            "syntax": syntax,
            "analysis": analysis
        }