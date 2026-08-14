import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


def send_reset_email(to_email: str, raw_token: str) -> None:
    """Sends the password reset link. Only the raw token goes in the email —
    the DB only ever stores its sha256 hash, so this email is the one and
    only place the usable token exists in plain form."""
    reset_link = f"{FRONTEND_URL}/reset-password?token={raw_token}"

    resend.Emails.send({
        "from": os.getenv("RESEND_FROM_EMAIL", "onboarding@resend.dev"),
        "to": to_email,
        "subject": "Reset your YOKAI password",
        "html": f"""
            <p>Click the link below to reset your password. This link expires in 30 minutes
            and can only be used once.</p>
            <p><a href="{reset_link}">{reset_link}</a></p>
            <p>If you didn't request this, you can safely ignore this email.</p>
        """
    })
