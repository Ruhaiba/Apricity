class IntentClassifier:
    def classify(self, code: str, query: str = "") -> str:
        text = query.lower()

        if any(word in text for word in ["test", "testing", "pytest", "unit test"]):
            return "Test"

        if any(word in text for word in ["refactor", "clean up", "clean", "restructure"]):
            return "Refactor"

        if any(word in text for word in ["faster", "optimize", "optimization", "efficient", "performance", "better"]):
            return "Optimize"

        return "Debug"