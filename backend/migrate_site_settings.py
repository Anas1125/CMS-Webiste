from sqlalchemy import text

from app.database import SessionLocal


db = SessionLocal()

try:
    # Check whether about_videos already exists
    result = db.execute(
        text("PRAGMA table_info(site_settings)")
    )

    columns = [row[1] for row in result]

    # Add the new column if it doesn't exist
    if "about_videos" not in columns:
        db.execute(
            text(
                "ALTER TABLE site_settings "
                "ADD COLUMN about_videos TEXT"
            )
        )

        db.commit()

        print("Added about_videos column.")
    else:
        print("about_videos column already exists.")

    # Copy the existing about_video into about_videos
    result = db.execute(
        text(
            """
            SELECT id, about_video, about_videos
            FROM site_settings
            """
        )
    )

    rows = result.fetchall()

    for row in rows:
        setting_id = row[0]
        about_video = row[1]
        about_videos = row[2]

        # Only migrate if we have an old video
        # and the new field is still empty.
        if about_video and not about_videos:
            import json

            videos = [about_video]

            db.execute(
                text(
                    """
                    UPDATE site_settings
                    SET about_videos = :videos
                    WHERE id = :id
                    """
                ),
                {
                    "videos": json.dumps(videos),
                    "id": setting_id,
                },
            )

            print(
                f"Migrated existing About video for settings ID {setting_id}"
            )

    db.commit()

    print("Site settings migration completed successfully.")

except Exception as error:
    db.rollback()
    print("Migration failed:", error)

finally:
    db.close()