import json

from app.database import SessionLocal
from app import models


projects = [
    {
        "category": "GIS",
        "title": "Flood Risk Mapping using AI & GIS",
        "subtitle": "AI-powered Disaster Management Platform",
        "client": "State Disaster Management Authority",
        "location": "India",
        "year": "2025",
        "duration": "8 Months",
        "team": "12 Engineers",
        "description": "AI-powered flood prediction and risk assessment using satellite imagery, DEM data and hydrological modeling covering more than 12,000 sq km.",
        "challenge": "The client needed a system capable of predicting flood-prone regions using historical rainfall, satellite imagery and terrain models.",
        "solution": "We built an AI-powered GIS platform combining satellite imagery, TensorFlow models and spatial analytics for near real-time flood prediction.",
        "results": [
            "96% prediction accuracy",
            "12,000+ sq km analyzed",
            "70% faster flood assessment",
            "Real-time GIS dashboard",
        ],
        "technologies": [
            "ArcGIS Pro",
            "Python",
            "TensorFlow",
            "PostGIS",
        ],
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "GIS",
        "title": "Property Tax Mapping System",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "GIS-based property tax assessment system for a municipal corporation with cadastral mapping, property identification, and integration with revenue management portal.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "QGIS",
            "PostGIS",
            "GeoServer",
            "React",
        ],
        "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "GIS",
        "title": "WebGIS for Urban Infrastructure Planning",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Interactive mapping platform for city planners to visualize infrastructure, zoning data, utility networks, and building footprints with real-time data integration.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "GeoServer",
            "Leaflet",
            "React",
            "PostgreSQL",
        ],
        "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "GIS",
        "title": "LULC Change Detection Analysis",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Multi-temporal land use / land cover change detection using Sentinel-2 satellite data over a 10-year period for environmental planning and policy-making.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "Google Earth Engine",
            "Python",
            "QGIS",
            "Random Forest",
        ],
        "image": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "GIS",
        "title": "Drone-Based 3D Terrain Modeling",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "UAV photogrammetry for construction site monitoring with orthomosaic generation, DSM/DTM creation, and volumetric analysis for a 500-acre industrial zone.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "Pix4D",
            "ArcGIS Pro",
            "DJI Terra",
            "Global Mapper",
        ],
        "image": "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "IT",
        "title": "Mobile GIS Field Data Collection App",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Cross-platform mobile app for field surveyors with offline mapping, GPS-based data collection, photo capture, and automatic sync with central GIS database.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "React Native",
            "PostGIS",
            "Node.js",
            "Mapbox",
        ],
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "AI/ML",
        "title": "AI-Powered Satellite Image Classification",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Deep learning model for automated satellite image classification achieving 96.2% accuracy across 15 land cover categories using multi-spectral Sentinel-2 data.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "PyTorch",
            "Google Earth Engine",
            "QGIS",
            "Python",
        ],
        "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "IoT",
        "title": "IoT Environmental Monitoring Dashboard",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Real-time environmental monitoring system integrating 200+ IoT sensors with a web dashboard for air quality, water quality, and weather data visualization.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "Node.js",
            "React",
            "AWS IoT",
            "PostgreSQL",
        ],
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "Cloud",
        "title": "Cloud Infrastructure for GIS Platform",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Designed and deployed a scalable cloud infrastructure on AWS for a multi-tenant GIS SaaS platform with auto-scaling, CI/CD, and 99.9% uptime SLA.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "AWS",
            "Docker",
            "Kubernetes",
            "Terraform",
        ],
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "IT",
        "title": "Enterprise Resource Planning (ERP) System",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Custom ERP solution for a logistics company integrating inventory management, HR, finance, and CRM modules with real-time analytics dashboards.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "React",
            "Node.js",
            "PostgreSQL",
            "Power BI",
        ],
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    },
    {
        "category": "Cybersecurity",
        "title": "Cybersecurity Threat Monitoring Platform",
        "subtitle": None,
        "client": None,
        "location": None,
        "year": None,
        "duration": None,
        "team": None,
        "description": "Real-time threat detection and response platform with network monitoring, intrusion detection, and automated incident response for enterprise clients.",
        "challenge": None,
        "solution": None,
        "results": [],
        "technologies": [
            "Python",
            "Elasticsearch",
            "Grafana",
            "Docker",
        ],
        "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
    },
]


db = SessionLocal()

try:
    created = 0
    skipped = 0

    for project in projects:
        existing = (
            db.query(models.Project)
            .filter(models.Project.title == project["title"])
            .first()
        )

        if existing:
            print(f"Skipped: {project['title']}")
            skipped += 1
            continue

        new_project = models.Project(
            category=project["category"],
            title=project["title"],
            subtitle=project["subtitle"],
            client=project["client"],
            location=project["location"],
            year=project["year"],
            duration=project["duration"],
            team=project["team"],
            description=project["description"],
            challenge=project["challenge"],
            solution=project["solution"],
            results=json.dumps(project["results"]),
            technologies=json.dumps(project["technologies"]),
            image=project["image"],
            is_active=True,
        )

        db.add(new_project)
        created += 1

        print(f"Created: {project['title']}")

    db.commit()

    print()
    print(f"Created: {created}")
    print(f"Skipped: {skipped}")
    print(f"Total: {len(projects)}")

except Exception as error:
    db.rollback()
    print("Migration failed:", error)

finally:
    db.close()