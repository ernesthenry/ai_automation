import os
from pathlib import Path

import uvicorn

if __name__ == "__main__":
    os.environ.setdefault("DSPY_CACHE_DIR", str(Path.cwd() / ".dspy_cache"))
    uvicorn.run(
        "rag_operational_domain.app:app",
        host="127.0.0.1",
        port=8010,
        factory=False,
    )
