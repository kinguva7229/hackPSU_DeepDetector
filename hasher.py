"""Simple SHA-256 hasher for image data.

This file was originally Swift code (CryptoKit). The project file
name is `hasher.py`, so replace the Swift snippet with a Python
implementation that returns a hex SHA-256 digest for given bytes.
"""

import hashlib
from typing import Union


def hash_image(image_data: Union[bytes, bytearray]) -> str:
    """Return the SHA-256 hex digest for the given image bytes.

    Args:
        image_data: Image data as bytes or bytearray.

    Returns:
        Lowercase hex string of the SHA-256 digest.
    """
    # Ensure we have immutable bytes for hashlib
    data = bytes(image_data)
    return hashlib.sha256(data).hexdigest()


if __name__ == "__main__":
    # Quick smoke test when running the file directly
    sample = b"hello"
    print(f"SHA-256(\"hello\") = {hash_image(sample)}")
