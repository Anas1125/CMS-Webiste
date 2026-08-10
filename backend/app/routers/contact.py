from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter()


@router.post(
    "/",
    response_model=schemas.ContactResponse
)
def create_contact(
    contact: schemas.ContactCreate,
    db: Session = Depends(get_db),
):
    new_contact = models.Contact(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        subject=contact.subject,
        message=contact.message,
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    return new_contact


@router.get(
    "/",
    response_model=list[schemas.ContactResponse]
)
def get_contacts(
    db: Session = Depends(get_db),
):
    return (
        db.query(models.Contact)
        .order_by(models.Contact.id.desc())
        .all()
    )


@router.get(
    "/{contact_id}",
    response_model=schemas.ContactResponse
)
def get_contact(
    contact_id: int,
    db: Session = Depends(get_db),
):
    contact = (
        db.query(models.Contact)
        .filter(
            models.Contact.id == contact_id
        )
        .first()
    )

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found",
        )

    return contact


@router.delete("/{contact_id}")
def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
):
    contact = (
        db.query(models.Contact)
        .filter(
            models.Contact.id == contact_id
        )
        .first()
    )

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found",
        )

    db.delete(contact)
    db.commit()

    return {
        "message": "Contact message deleted successfully"
    }