#!/usr/bin/env python3
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path
import platform

# Check if script is run from the correct directory
if not Path('manage.py').exists():
    sys.stderr.write("ERROR: manage.py must be run from the Django project root directory.\n")
    sys.stderr.write("Current directory: {}\n".format(Path.cwd()))
    sys.exit(1)

# Add Python version logging for debugging
sys.stderr.write("Running Python version: {}\n".format(platform.python_version()))

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'appjango.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Log full error message and trace
        sys.stderr.write("ImportError: {}\n".format(exc))
        sys.stderr.write("ImportError traceback: {}\n".format(sys.exc_info()))
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        )
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
