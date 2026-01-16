
-- Update Elie Wiesel obituary with local image
UPDATE obituaries 
SET photo_url = '/notable-figures/elie-wiesel.jpg', updated_at = now()
WHERE id = '629440f1-b7e2-4d00-a810-c2cc527d06ca';
