# SECURITY RULES

Security must always be considered when analyzing or modifying code.

General principles:

- never expose secrets in source code
- never hardcode passwords, tokens, or API keys
- prefer environment variables for configuration
- validate all external inputs
- avoid executing unsafe shell commands
- prevent command injection and path traversal
- avoid logging sensitive information

When reviewing or generating code, always check:

1. secret exposure (API keys, tokens, passwords)
2. unsafe file access
3. user input validation
4. insecure network calls
5. unsafe system commands
6. improper authentication logic

Secure coding practices:

- sanitize user inputs
- validate file paths
- restrict permissions where possible
- prefer explicit configuration
- handle errors safely
- avoid leaking internal details in logs or responses

If a potential security issue is detected:

1. explain the vulnerability
2. describe the possible impact
3. propose a safer implementation
