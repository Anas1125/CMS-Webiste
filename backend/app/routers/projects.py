from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter()


@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()


@router.get("/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = (
        db.query(models.Project)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@router.post("/")
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
):
    new_project = models.Project(
        category=project.category,
        title=project.title,
        subtitle=project.subtitle,
        client=project.client,
        location=project.location,
        year=project.year,
        duration=project.duration,
        team=project.team,
        description=project.description,
        challenge=project.challenge,
        solution=project.solution,
        results=project.results,
        technologies=project.technologies,
        image=project.image,
        is_active=project.is_active,
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


@router.put("/{project_id}")
def update_project(
    project_id: int,
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Project)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    existing.category = project.category
    existing.title = project.title
    existing.subtitle = project.subtitle
    existing.client = project.client
    existing.location = project.location
    existing.year = project.year
    existing.duration = project.duration
    existing.team = project.team
    existing.description = project.description
    existing.challenge = project.challenge
    existing.solution = project.solution
    existing.results = project.results
    existing.technologies = project.technologies
    existing.image = project.image
    existing.is_active = project.is_active

    db.commit()
    db.refresh(existing)

    return existing


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Project)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    db.delete(existing)
    db.commit()

    return {
        "message": "Project deleted successfully"
    }