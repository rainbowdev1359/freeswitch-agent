from django.core.management.base import BaseCommand
from django.urls import URLPattern, URLResolver
import json
import logging
import os

logger = logging.getLogger(__name__)

def list_urls(lis, acc=None):
    if acc is None:
        acc = []
    if not lis:
        return
    l = lis[0]
    if isinstance(l, URLPattern):
        acc.append((l.pattern.regex.pattern, l.callback.__name__))
    elif isinstance(l, URLResolver):
        list_urls(l.url_patterns, acc)
    list_urls(lis[1:], acc)
    return acc

class Command(BaseCommand):
    help = 'Generates a Postman collection of all API endpoints'

    def handle(self, *args, **options):
        from django.urls import get_resolver
        
        all_urls = list_urls(get_resolver().url_patterns)
        postman_collection = {
            "info": {
                "name": "Appjango API Collection",
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            "item": []
        }

        for path, view in all_urls:
            # Placeholder logic for determining the HTTP method
            method = "GET"  # Replace with actual logic as per requirements

            item = {
                "name": view,
                "request": {
                    "method": method,
                    "url": "{{host}}" + path,
                    "header": [],
                    "body": {
                        "mode": "raw",
                        "raw": "{}",
                        "options": {
                            "raw": {
                                "language": "json"
                            }
                        }
                    },
                    "description": f"Endpoint for {view}"
                },
                "response": []
            }
            postman_collection["item"].append(item)

        try:
            # Define the path for the output file
            output_file_path = os.path.join(os.getcwd(), 'appjango_postman_collection.json')
            
            # Write the JSON data to the file, creating or overwriting as needed
            with open(output_file_path, 'w') as file:
                json.dump(postman_collection, file, indent=2)
                logger.info('Successfully generated Postman collection JSON file.')
                self.stdout.write(self.style.SUCCESS('Successfully generated Postman collection JSON file.'))
        except Exception as e:
            logger.error('Error generating Postman collection JSON file.', exc_info=True)
            self.stderr.write(self.style.ERROR('Error generating Postman collection JSON file.'))
            self.stderr.write(self.style.ERROR(str(e)))