import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

ENV_FILE = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ENV_FILE)

FEATHERLESS_API_KEY = os.getenv("FEATHERLESS_API_KEY")

if not FEATHERLESS_API_KEY:
    raise ValueError("API Key isn't set")

client = OpenAI(
    api_key=FEATHERLESS_API_KEY,
    base_url="https://api.featherless.ai/v1"
)


class LLM_model:
    def __init__(self, model: str):
        self.model = model

    def ask(self, prompt: str) -> str:
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content


if __name__ == "__main__":
    llm = LLM_model("zai-org/GLM-5.2")

    print("Calling Featherless...")
    print(llm.ask("Say exactly: Hello Apricity!"))