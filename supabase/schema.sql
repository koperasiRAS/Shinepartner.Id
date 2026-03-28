-- Shinepartner Ecosystem Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(100) NOT NULL,
    package VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on event_date for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create index on phone for duplicate checking
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);

-- Create FAQ table
CREATE TABLE IF NOT EXISTS faq (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq(category);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings (public can insert, only authenticated users can read/update)
-- Allow public inserts (for booking form)
CREATE POLICY "Allow public bookings insert"
    ON bookings FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to read all bookings
CREATE POLICY "Allow authenticated users to read bookings"
    ON bookings FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users to update bookings
CREATE POLICY "Allow authenticated users to update bookings"
    ON bookings FOR UPDATE
    TO authenticated
    USING (true);

-- Allow public read on portfolio
CREATE POLICY "Allow public read on portfolio"
    ON portfolio FOR SELECT
    TO anon
    USING (true);

-- Allow authenticated users to manage portfolio
CREATE POLICY "Allow authenticated users to manage portfolio"
    ON portfolio FOR ALL
    TO authenticated
    USING (true);

-- Allow public read on FAQ
CREATE POLICY "Allow public read on FAQ"
    ON faq FOR SELECT
    TO anon
    USING (true);

-- Allow authenticated users to manage FAQ
CREATE POLICY "Allow authenticated users to manage FAQ"
    ON faq FOR ALL
    TO authenticated
    USING (true);

-- Insert sample FAQ data
INSERT INTO faq (question, answer, category, sort_order) VALUES
    ('How far in advance should I book your services?', 'We recommend booking at least 3-6 months in advance, especially for peak wedding seasons. However, we also accommodate last-minute bookings based on availability.', 'general', 1),
    ('Do you offer customized packages?', 'Yes! We understand every wedding is unique. Contact us for a personalized package that fits your needs and budget.', 'general', 2),
    ('What areas do you serve?', 'We primarily serve Jakarta and surrounding areas, but we also handle destination weddings throughout Indonesia and internationally.', 'general', 3),
    ('How do I book your services?', 'Simply fill out the booking form on our website or contact us via WhatsApp. We will get back to you within 24 hours to discuss your requirements.', 'booking', 4),
    ('What is your cancellation policy?', 'Our cancellation policy varies by service. Generally, we offer a full refund if cancelled 30+ days before the event, 50% refund for 14-30 days, and no refund for cancellations within 14 days.', 'general', 5)
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
