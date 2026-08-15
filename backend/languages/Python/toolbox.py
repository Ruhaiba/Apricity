from .parser import PyParser
from .analyzer import PyAnalyzer
from .executor import PyExecuter
from .tester import PyTester
from .formatter import PyFormatter

class PyToolbox:
    def __init__(self):
        self.parser = PyParser()
        self.executor = PyExecuter()
        self.formatter = PyFormatter()
        self.tester = PyTester()
        self.analyzer = PyAnalyzer()

