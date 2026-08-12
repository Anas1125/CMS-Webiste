from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter()


# =====================================================
# GET ALL BLOGS
# =====================================================

@router.get("/")
def get_blogs(db: Session = Depends(get_db)):
    return (
        db.query(models.Blog)
        .order_by(models.Blog.created_at.desc())
        .all()
    )


# =====================================================
# GET SINGLE BLOG
# =====================================================

@router.get("/{blog_id}")
def get_blog(
    blog_id: int,
    db: Session = Depends(get_db),
):
    blog = (
        db.query(models.Blog)
        .filter(models.Blog.id == blog_id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    return blog


# =====================================================
# CREATE BLOG
# =====================================================

@router.post("/")
def create_blog(
    blog: schemas.BlogCreate,
    db: Session = Depends(get_db),
):
    new_blog = models.Blog(
        category=blog.category,
        date=blog.date,
        author=blog.author,
        read_time=blog.read_time,
        title=blog.title,
        excerpt=blog.excerpt,
        content=blog.content,
        image=blog.image,
        is_active=blog.is_active,
    )

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog


# =====================================================
# UPDATE BLOG
# =====================================================

@router.put("/{blog_id}")
def update_blog(
    blog_id: int,
    blog: schemas.BlogCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Blog)
        .filter(models.Blog.id == blog_id)
        .first()
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    existing.category = blog.category
    existing.date = blog.date
    existing.author = blog.author
    existing.read_time = blog.read_time
    existing.title = blog.title
    existing.excerpt = blog.excerpt
    existing.content = blog.content
    existing.image = blog.image
    existing.is_active = blog.is_active

    db.commit()
    db.refresh(existing)

    return existing


# =====================================================
# DELETE BLOG
# =====================================================

@router.delete("/{blog_id}")
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Blog)
        .filter(models.Blog.id == blog_id)
        .first()
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Blog not found",
        )

    db.delete(existing)
    db.commit()

    return {
        "message": "Blog deleted successfully"
    }