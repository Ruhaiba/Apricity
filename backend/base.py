class Workflow:
    def __init__(self, llm, toolbox):
        self.llm = llm
        self.toolbox = toolbox

    def run(self, code: str, intent: str) -> dict:
        prompt = f"""
You're Apricity. a Python programming assistant.

Intent: {intent}

Analyze this code:

{code}

Provide the improved code and a SHORT explanation.
Do not add unnecessary text.
Do not repeat the users code.
Greet the user and adress the problem, then provide a solution. Quick.
"""

        solution = self.llm.ask(prompt)

        return {
            "intent": intent,
            "solution": solution
        }