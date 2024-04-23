import { createClient } from '@supabase/supabase-js'

const URL = 'https://fsusorrfixtswxqntlhq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdXNvcnJmaXh0c3d4cW50bGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MTIzOTQsImV4cCI6MjAyOTQ4ODM5NH0.57baKqQjQKxTNdNVdQ8vbXl98CAD9Dz-v1HOUESrzSk';

export const supabase = createClient(URL, API_KEY);