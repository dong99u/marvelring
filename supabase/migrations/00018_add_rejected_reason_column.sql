-- Migration: Add rejected_reason column to member table
--
-- The rejection workflow writes to this column but it was never created.
-- This column stores the admin's reason when rejecting a member signup request.

ALTER TABLE member ADD COLUMN IF NOT EXISTS rejected_reason TEXT;
