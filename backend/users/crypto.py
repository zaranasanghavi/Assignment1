import os, base64
from cryptography.fernet import Fernet

KEY = base64.urlsafe_b64encode(os.environ["AES_SECRET"].encode())
fernet = Fernet(KEY)

def encrypt_data(value: str) -> bytes:
    return fernet.encrypt(value.encode())

def decrypt_data(value) -> str:
    if isinstance(value, memoryview):
        value = bytes(value)
    return fernet.decrypt(value).decode()

