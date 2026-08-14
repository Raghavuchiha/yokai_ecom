-- Run this once in the Supabase SQL editor.
-- Stores only a hash of the reset token, never the raw token.

create table if not exists password_reset_tokens (
    id uuid primary key,
    user_id uuid not null references users(id) on delete cascade,
    token_hash text not null unique,
    expires_at timestamptz not null,
    used boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists idx_password_reset_tokens_token_hash
    on password_reset_tokens (token_hash);
