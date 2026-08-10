import json
import re

from app.database import SessionLocal
from app import models

products = [
    {
        "name": "GeoStyle Studio",
        "tagline": "Design Beautiful Maps, Effortlessly",
        "description": "A powerful GIS map styling and cartographic design tool that lets you create stunning, publication-ready maps with custom symbology, color palettes, and label configurations.",
        "image": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1800&auto=format&fit=crop",
        "button": "Request Demo",
        "features": [
            "Custom symbology & color palette editor",
            "Layer-based map composition",
            "Export to high-resolution print formats",
            "Thematic map templates library",
            "Integration with ArcGIS & QGIS projects",
            "Real-time style preview & rendering",
        ],
    },
    {
        "name": "TerraPro",
        "tagline": "Advanced Terrain Analysis Suite",
        "description": "A comprehensive terrain analysis software for slope, aspect, hillshade, contour generation, watershed delineation, and 3D visualization from DEM and LiDAR data.",
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
        "button": "Request Demo",
        "features": [
            "3D terrain visualization & flythrough",
            "Slope, aspect & curvature analysis",
            "Contour generation & hillshade rendering",
            "Watershed delineation & flow direction",
            "Cut-fill & volumetric calculations",
            "LiDAR point cloud processing",
        ],
    },
    {
        "name": "Utility Survey",
        "tagline": "Smart Field Survey Management",
        "description": "A mobile-first field survey management application for mapping utility infrastructure including water pipelines, electric networks and telecom lines.",
        "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1800&auto=format&fit=crop",
        "button": "Request Demo",
        "features": [
            "Offline map-based data collection",
            "GPS & GNSS integration",
            "Pipeline, electric & telecom mapping",
            "Photo & video geotagging",
            "Real-time GIS synchronization",
            "Custom survey form builder",
        ],
    },
    {
        "name": "Assessment Verification App",
        "tagline": "Streamline Property Inspections",
        "description": "A digital property assessment and verification application for municipal bodies and revenue departments with GPS verification and geotagging.",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86f8f?q=80&w=1800&auto=format&fit=crop",
        "button": "Request Demo",
        "features": [
            "Property assessment forms",
            "Geotagged photo & video capture",
            "GPS property verification",
            "Real-time reporting",
            "Property tax integration",
            "Supervisor dashboard",
        ],
    },
    {
        "name": "TerraCam",
        "tagline": "GPS Camera for Android",
        "description": "A GPS-enabled Android camera application for capturing geotagged photos with coordinates, timestamps, direction, altitude and project information.",
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1800&auto=format&fit=crop",
        "button": "Request Demo",
        "features": [
            "GPS coordinates on photos",
            "Timestamp & altitude",
            "Project watermark",
            "Offline capture",
            "Map gallery",
            "Export reports",
        ],
    },
    {
        "name": "Terra Resume",
        "tagline": "AI-Powered Online Resume Builder",
        "description": "An intelligent online resume builder with AI assistance for creating ATS-friendly resumes with live preview and multiple export formats.",
        "image": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1800&auto=format&fit=crop",
        "button": "Request Demo",
        "features": [
            "AI content suggestions",
            "Professional templates",
            "ATS optimization",
            "Live preview",
            "PDF & DOCX export",
            "AI cover letter generator",
        ],
    },
]


db = SessionLocal()

try:
    created = 0
    skipped = 0

    for product in products:
        existing = (
            db.query(models.Product)
            .filter(models.Product.name == product["name"])
            .first()
        )

        if existing:
            skipped += 1
            print(f"Skipped: {product['name']}")
            continue

        new_product = models.Product(
            name=product["name"],
            tagline=product["tagline"],
            description=product["description"],
            image=product["image"],
            button=product["button"],
            features=json.dumps(product["features"]),
            is_active=True,
        )

        db.add(new_product)
        created += 1

        print(f"Created: {product['name']}")

    db.commit()

    print()
    print(f"Created: {created}")
    print(f"Skipped: {skipped}")
    print(f"Total: {len(products)}")

except Exception as error:
    db.rollback()
    print("Migration failed:", error)

finally:
    db.close()