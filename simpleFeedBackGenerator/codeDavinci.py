from typing import Optional
import requests
import json


class GPTResponse:
    def __init__(self, hasError: bool, message: str):
        self.hasError = hasError
        self.message = message


class codeDavinci():
    def __init__(self):
        self.url = "https://api.openai.com/v1/edits"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        }

    def ask(self, input: str):
        data = {
            "model": "code-davinci-edit-001",
            "input": str(input['code']),
            "instruction": "optimize this python code"
        }
        print(str(input))
        response = requests.post(self.url, headers=self.headers, data=json.dumps(data))
        result = response.json()
        if "error" in result:
            return GPTResponse(True, result["error"]["message"])

        return GPTResponse(False, result['choices'][0]['text'])


