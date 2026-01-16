
-- Update Joan Rivers and Leonard Nimoy obituaries with local images
UPDATE obituaries 
SET photo_url = '/notable-figures/joan-rivers.jpg', updated_at = now()
WHERE id = '2f040a20-c473-400d-9a45-e75eae1cdf25';

UPDATE obituaries 
SET photo_url = '/notable-figures/leonard-nimoy.jpg', updated_at = now()
WHERE id = '9c74be38-5e6f-4ed4-84f7-bb12e907ae68';
