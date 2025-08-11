import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wujgtfvoyfdumexqjxfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amd0ZnZveWZkdW1leHFqeGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTM5MzEsImV4cCI6MjA3MDQ2OTkzMX0.xR61YUBvvW5z7W2n62Wts_QCElw64aHxXTn66BkGQxg";
export const supabase = createClient(supabaseUrl, supabaseKey);
