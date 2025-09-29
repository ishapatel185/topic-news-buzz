-- Create table for news subscriptions
CREATE TABLE public.news_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  news_topic TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add email uniqueness constraint to prevent duplicate subscriptions
CREATE UNIQUE INDEX unique_email_topic ON public.news_subscriptions(email, news_topic);

-- Enable Row Level Security
ALTER TABLE public.news_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy allowing anyone to insert (for public subscription form)
CREATE POLICY "Anyone can subscribe to news" 
ON public.news_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing subscriptions (if needed for admin later)
CREATE POLICY "Public can view active subscriptions" 
ON public.news_subscriptions 
FOR SELECT 
USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_subscriptions_updated_at
BEFORE UPDATE ON public.news_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();