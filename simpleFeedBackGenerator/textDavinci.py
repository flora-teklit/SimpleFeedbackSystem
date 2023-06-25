from typing import Optional
import requests
import json
import openai
openai.api_key = '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'
class GPTResponse:
    def __init__(self, hasError: bool, message: str):
        self.hasError = hasError
        self.message = message


class GPTOpenAI():
    def __init__(self):
        self.url = "https://api.openai.com/v1/edits"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        }

    def ask(self, input: str):
        prompt1 = f"Given this code:\n{input['code']}\n write it in a more idiomatic way ."
        prompt2 = f"Give suggestions on how to improve this code: \n{input['code']}"

        responseCode = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt1,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
            presence_penalty=0.5,
            frequency_penalty=0.5,
            best_of=1,
        )
        responseText = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt2,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
            presence_penalty=0.5,
            frequency_penalty=0.5,
            best_of=1,
        )

        if "error" in responseCode:
            return GPTResponse(True, responseCode["error"]["message"])
        if "error" in responseText:
            return GPTResponse(True, responseText["error"]["message"])

        result= responseCode['choices'][0]['text'] + responseText['choices'][0]['text']
        return GPTResponse(False, result)


