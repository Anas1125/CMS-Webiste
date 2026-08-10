from datetime import datetime
from sqlalchemy.orm import relationship

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey,
)
from .database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)
    subject = Column(String)
    message = Column(Text)


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    department = Column(String, nullable=False)
    location = Column(String, nullable=False)
    employment_type = Column(String, nullable=False)

    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=False)

    is_active = Column(Boolean, default=True)

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    tagline = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    image = Column(String, nullable=True)
    button = Column(String, nullable=True)
    features = Column(Text, nullable=True)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)

    category = Column(String, nullable=False)
    description = Column(Text, nullable=True)

    image = Column(String, nullable=True)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String)
    tagline = Column(String)

    logo = Column(String)
    favicon = Column(String)

    email = Column(String)
    phone = Column(String)
    whatsapp = Column(String)

    address = Column(Text)
    google_maps = Column(Text)

    linkedin = Column(String)
    instagram = Column(String)
    facebook = Column(String)
    youtube = Column(String)
    twitter = Column(String)

    hero_title = Column(String)
    hero_subtitle = Column(Text)

    hero_button_text = Column(String)
    hero_button_link = Column(String)

    footer_text = Column(Text)

    seo_title = Column(String)
    seo_description = Column(Text)
    seo_keywords = Column(Text)

    hero_video = Column(String, nullable=True)
    statement_image = Column(String, nullable=True)

    about_video = Column(String, nullable=True)
    about_videos = Column(
            Text,
            nullable=True
        )
    services_video = Column(String, nullable=True)
    products_video = Column(String, nullable=True)
    showcase_video = Column(String, nullable=True)
    careers_video = Column(String, nullable=True)
    contact_video = Column(String, nullable=True)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=True)

    client = Column(String, nullable=True)
    location = Column(String, nullable=True)
    year = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    team = Column(String, nullable=True)

    description = Column(Text, nullable=True)
    challenge = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)

    results = Column(Text, nullable=True)
    technologies = Column(Text, nullable=True)

    image = Column(String, nullable=True)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    job_id = Column(
        Integer,
        ForeignKey("jobs.id"),
        nullable=False,
    )

    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)

    resume = Column(String, nullable=True)
    cover_letter = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    job = relationship("Job")

    @property
    def job_title(self):
        return self.job.title if self.job else None

class Partner(Base):
    __tablename__ = "partners"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    logo = Column(String, nullable=True)

    type = Column(String, nullable=False)
    # "client" or "partner"

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )