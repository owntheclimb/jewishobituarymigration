-- Create cemeteries table for Jewish cemetery directory
CREATE TABLE public.cemeteries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  denomination TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  visiting_hours TEXT,
  plot_pricing JSONB,
  has_available_plots BOOLEAN DEFAULT true,
  custom_rules TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  photos JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cemeteries ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Cemeteries are viewable by everyone"
ON public.cemeteries
FOR SELECT
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cemeteries_updated_at
BEFORE UPDATE ON public.cemeteries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better search performance
CREATE INDEX idx_cemeteries_city ON public.cemeteries(city);
CREATE INDEX idx_cemeteries_state ON public.cemeteries(state);
CREATE INDEX idx_cemeteries_denomination ON public.cemeteries(denomination);
CREATE INDEX idx_cemeteries_has_available_plots ON public.cemeteries(has_available_plots);

-- Insert some sample Jewish cemetery data
INSERT INTO public.cemeteries (name, location, city, state, denomination, phone, email, website, visiting_hours, has_available_plots, custom_rules, latitude, longitude) VALUES
('Mount Hebron Cemetery', '130-04 Horace Harding Expy', 'Flushing', 'NY', 'Orthodox', '718-939-0500', 'info@mounthebron.org', 'https://mounthebron.org', 'Sun-Thu: 8am-4pm, Fri: 8am-3pm', true, 'Respectful attire required. No photography on Shabbat.', 40.7282, -73.8235),
('King Solomon Memorial Park', '5505 W Broward Blvd', 'Plantation', 'FL', 'Conservative', '954-583-3181', 'contact@kingsmemorial.com', 'https://kingsmemorial.com', 'Sun-Fri: 9am-5pm', true, 'Head covering recommended. Stones may be placed on graves.', 26.1224, -80.2107),
('Har Shalom Cemetery', '1999 N Eddy St', 'South Bend', 'IN', 'Reform', '574-233-1164', 'office@harshalom.org', 'https://harshalom.org', 'Daily: 8am-6pm', false, 'All denominations welcome. Quiet reflection encouraged.', 41.6882, -86.2419),
('Sharon Memorial Park', '5716 Monroe Rd', 'Charlotte', 'NC', 'All Denominations', '704-563-5252', 'info@sharonmemorial.com', 'https://sharonmemorial.com', 'Mon-Fri: 9am-5pm, Sun: By appointment', true, 'Traditional Jewish burial practices honored.', 35.1654, -80.7589),
('Eden Memorial Park', '11500 Sepulveda Blvd', 'Mission Hills', 'CA', 'All Denominations', '818-361-7161', 'eden@dignitymemorial.com', 'https://edenmemorialpark.com', 'Daily: 8am-5pm', true, 'One of the largest Jewish cemeteries on the West Coast.', 34.2634, -118.4620);