#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()


#in the authentication and authorization we will receive token when we enter the superuser credentials into: "$res = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/token/" -Method Post -ContentType "application/json" -Body '{"username":"YOUR_USERNAME","password":"YOUR_PASSWORD"}'" and then that token will be given into "Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/pets/" -Method Get -Headers @{Authorization="Bearer $($res.access)"}" ...here res handles the token to not encounter with any errors.... 
#then it will give all the details like owner id,number,email,pet name etc