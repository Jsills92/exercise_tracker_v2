import { createClient } from '@supabase/supabase-js';


 const supabaseUrl = 'https://wiakuysnmmguxdcayave.supabase.co'; // Your Supabase URL
 const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpYWt1eXNubW1ndXhkY2F5YXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODU4MDAsImV4cCI6MjA1ODY2MTgwMH0.I_y6k9preFe3BD0T8nbEVyBt2i1g1sHT-GZ_tFQeu10'; // Your Supabase anon key

 const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
