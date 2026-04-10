-- ============================================
-- MARIOJOOS.COM — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Contact form submissions
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  budget TEXT,
  newsletter_optin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Testimonials (CMS-managed)
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  display_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Clients (CMS-managed)
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  url TEXT,
  display_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Stats (CMS-managed)
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value INT NOT NULL,
  suffix TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Case studies (CMS-managed)
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT,
  description TEXT,
  before_metric TEXT,
  after_metric TEXT,
  metric_label TEXT,
  impact TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Page views (analytics)
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL DEFAULT '/',
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Contacts: anyone can INSERT (public form), only authenticated can SELECT
CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Testimonials: public can read visible ones
CREATE POLICY "Public can read visible testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (visible = true);

CREATE POLICY "Authenticated can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Clients: public can read visible ones
CREATE POLICY "Public can read visible clients"
  ON clients FOR SELECT
  TO anon
  USING (visible = true);

CREATE POLICY "Authenticated can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Stats: public can read
CREATE POLICY "Public can read stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can manage stats"
  ON stats FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Case studies: public can read visible ones
CREATE POLICY "Public can read visible case studies"
  ON case_studies FOR SELECT
  TO anon
  USING (visible = true);

CREATE POLICY "Authenticated can manage case studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Page views: anyone can insert (tracking), only authenticated can read
CREATE POLICY "Anyone can log page views"
  ON page_views FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can view analytics"
  ON page_views FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Seed data (optional — for initial setup)
-- ============================================

INSERT INTO testimonials (name, role, quote, display_order) VALUES
  ('Creator A', '50M+ Subscribers', 'Mario completely changed how I think about content. His retention analysis is unlike anything I''ve seen. The data doesn''t lie — my views exploded.', 1),
  ('Creator B', '25M+ Subscribers', 'We were losing viewers at an alarming rate. Mario identified the exact problems, restructured our approach, and within months we were growing faster than ever.', 2),
  ('Creator C', '10M+ Subscribers', 'The ROI of working with Mario is insane. For every dollar spent on his consulting, we saw 100x back in revenue from increased watch time and ad revenue.', 3),
  ('Creator D', '5M+ Subscribers', 'Mario doesn''t just give advice — he gives you a complete framework for thinking about retention. It transformed my entire channel strategy.', 4);

INSERT INTO clients (name, display_order) VALUES
  ('MrBeast', 1), ('KSI', 2), ('Stokes Twins', 3), ('Preston', 4),
  ('Unspeakable', 5), ('ZHC', 6), ('Dude Perfect', 7), ('SSSniperWolf', 8),
  ('Aphmau', 9), ('Ninja', 10), ('Typical Gamer', 11), ('Lazarbeam', 12),
  ('Lachlan', 13), ('Muselk', 14), ('Kwebbelkop', 15), ('Jelly', 16);

INSERT INTO stats (label, value, suffix, display_order) VALUES
  ('Views Influenced', 10, 'B+', 1),
  ('Videos Optimized', 5000, '+', 2),
  ('Creators Helped', 200, '+', 3),
  ('Client Retention Rate', 98, '%', 4);

INSERT INTO case_studies (title, client_name, description, before_metric, after_metric, metric_label, impact, display_order) VALUES
  ('Viral Content Engine', 'Major Creator (50M+ subs)', 'Rebuilt their entire content strategy around retention data.', '38%', '67%', 'Average Retention Rate', '+340M views in 6 months', 1),
  ('Channel Resurrection', 'Gaming Creator (10M+ subs)', 'A channel in decline reversed completely through retention analysis.', '2.1M', '12.8M', 'Avg Monthly Views', '6x growth in viewership', 2),
  ('Launch to Dominance', 'Emerging Creator', 'Brand new channel to millions using retention-first strategy.', '0', '5M+', 'Subscribers', 'Fastest-growing in niche', 3);
