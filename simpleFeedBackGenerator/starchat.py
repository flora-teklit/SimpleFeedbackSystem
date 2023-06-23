from typing import Optional
import requests
import json


class GPTResponse:
    def __init__(self, hasError: bool, message: str):
        self.hasError = hasError
        self.message = message


class starChat():
    def __init__(self):
        self.url = "https://dieju4xy92oub1j8.us-east-1.aws.endpoints.huggingface.cloud"
        self.token="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"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+self.token
        }


    def ask(self, input: str):
        data = {
            "inputs": f"write the following code in a better idiomatic way:\n\n{input['code']}\n\nAlternative code:",
            "parameters": {"max_new_tokens": 100, "temprature": 0.2, "top_k": 50, "top_p": 0.95,
                           "repetition_penalty": 1.2},
        }

        response = requests.post(self.url, headers=self.headers, json=data)
        print(f"startchat:{response.json()}")

        result = response.json()
        if "error" in result:
            return GPTResponse(True, result["error"]["message"])

        return GPTResponse(False, result[0]['generated_text'])


