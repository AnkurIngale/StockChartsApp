import requests
headers = {
        'Content-Type': 'application/json'
        }
requestResponse = requests.get("https://api.tiingo.com/api/test?token=bc636b840068de7cefebde50762aa45fb89c7743",
                                    headers=headers)
print(requestResponse.json())