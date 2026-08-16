from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 

from backend.core.classifier import Classifier
from backend.core.llm import LLM_model
from backend.core.router import Router
from backend.core.verifier import Verifier
from backend.base import Workflow

app = FastAPI(title="Apricity")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://apricity-teal.vercel.app",
    "https://apricity-ndmwsdo6r-ruhaiba1.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    code: str
    query: str = ""

llm = LLM_model("zai-org/GLM-5.2")
classifier = Classifier()
router = Router()
verifier = Verifier(router.get_toolbox("Python"))
workflow = Workflow(llm, router.get_toolbox("Python"))

@app.post("/analyze")
def analyze(request: Query):
    classification = classifier.classify(
        request.code,
        request.query
    )

    toolbox = router.get_toolbox(
        classification["language"]
    )

    workflow_result = workflow.run(
        request.code,
        classification["intent"]
    )

    verification = verifier.verify(
        request.code
    )

    return {
        "language": classification["language"],
        "intent": classification["intent"],
        "solution": workflow_result["solution"],
        "verification": verification
    }