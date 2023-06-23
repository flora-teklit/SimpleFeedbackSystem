from flask import Flask, request
from flask_cors import CORS,cross_origin
from flask_restful import Resource, Api
from codeDavinci import codeDavinci
from textDavinci import GPTOpenAI
from starchat import starChat

app = Flask(__name__)
CORS(app)
api = Api(app)


class CodeOptimizerController(Resource):
    @cross_origin()
    def post(self):
        print(request.get_json())
        request_body = request.get_json()
        if not "code" in request_body:
            return "You need to supply a code snippet", 400
        if not "model" in request_body:
            return "You need to supply a model type", 400

        if request_body['model'] == "codeDavinci":
            gpt = codeDavinci()
        if request_body['model'] == "textDavinci":
            gpt = GPTOpenAI()
        if request_body['model'] == "starchat":
            gpt = starChat()

        result = gpt.ask(request_body)
        if result.hasError:
            return result.message, 500
        return {"optimized_code": result.message}


api.add_resource(CodeOptimizerController, '/')

if __name__ == '__main__':
    app.run(port=8081, debug=True)
