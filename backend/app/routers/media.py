from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import shutil

router = APIRouter()

UPLOAD_DIR = Path("uploads")

from fastapi import HTTPException

@router.get("/")
def list_media():
    files = []

    for folder in UPLOAD_DIR.iterdir():
        if folder.is_dir():
            for file in folder.iterdir():
                files.append({
                    "folder": folder.name,
                    "filename": file.name,
                    "path": f"/uploads/{folder.name}/{file.name}"
                })

    return files

@router.delete("/{folder}/{filename}")
def delete_media(folder: str, filename: str):

    file_path = UPLOAD_DIR / folder / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    file_path.unlink()

    return {
        "message": "Deleted successfully"
    }


@router.post("/upload/{folder}")
async def upload_file(
    folder: str,
    file: UploadFile = File(...)
):
    folder_path = UPLOAD_DIR / folder
    folder_path.mkdir(parents=True, exist_ok=True)

    destination = folder_path / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "path": f"/uploads/{folder}/{file.filename}"
    }