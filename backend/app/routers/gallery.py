from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter()


@router.get("/")
def get_gallery(db: Session = Depends(get_db)):
    return (
        db.query(models.Gallery)
        .order_by(models.Gallery.created_at.desc())
        .all()
    )


@router.get("/{gallery_id}")
def get_gallery_item(
    gallery_id: int,
    db: Session = Depends(get_db),
):
    gallery_item = (
        db.query(models.Gallery)
        .filter(models.Gallery.id == gallery_id)
        .first()
    )

    if not gallery_item:
        raise HTTPException(
            status_code=404,
            detail="Gallery item not found",
        )

    return gallery_item


@router.post("/")
def create_gallery_item(
    gallery: schemas.GalleryCreate,
    db: Session = Depends(get_db),
):
    new_gallery = models.Gallery(
        title=gallery.title,
        category=gallery.category,
        image=gallery.image,
        is_active=gallery.is_active,
    )

    db.add(new_gallery)
    db.commit()
    db.refresh(new_gallery)

    return new_gallery


@router.put("/{gallery_id}")
def update_gallery_item(
    gallery_id: int,
    gallery: schemas.GalleryCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Gallery)
        .filter(models.Gallery.id == gallery_id)
        .first()
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Gallery item not found",
        )

    existing.title = gallery.title
    existing.category = gallery.category
    existing.image = gallery.image
    existing.is_active = gallery.is_active

    db.commit()
    db.refresh(existing)

    return existing


@router.delete("/{gallery_id}")
def delete_gallery_item(
    gallery_id: int,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Gallery)
        .filter(models.Gallery.id == gallery_id)
        .first()
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Gallery item not found",
        )

    db.delete(existing)
    db.commit()

    return {
        "message": "Gallery item deleted successfully"
    }