from backend.models.intent_classifier import IntentClassifier

class Classifier:
    def __init__(self):
        self.intent_classifier = IntentClassifier()

    def classify(self, code: str, query: str = "") -> dict:
        intent = self.intent_classifier.classify(code, query)

        return {
            "language": "Python",
            "intent": intent
        } 
 

