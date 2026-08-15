import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

FEATHERLESS_API_KEY = os.getenv("FEATHERLESS_API_KEY")

if not FEATHERLESS_API_KEY:
    raise ValueError("API Key isn't set")

client = OpenAI(
    api_key=FEATHERLESS_API_KEY,
    base_url="https://api.featherless.ai/v1"
)

class LLM_model:
    def __init__(self, model:str):
        self.model = model

    def ask(self, prompt:str) -> str:
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role":"user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content

if __name__ == "__main__":
    llm = LLM_model("zai-org/GLM-5.2")

    response = llm.ask("Say exactly: Hello Apricity!")

    print(response)