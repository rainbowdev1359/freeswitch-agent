class ReferrerPolicyMiddleware:
    """
    Middleware to set a custom Referrer-Policy header.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['Referrer-Policy'] = 'no-referrer'  # Set your desired policy
        return response