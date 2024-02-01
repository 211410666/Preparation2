import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gjimzbjykjfioaxbulqm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaW16Ymp5a2pmaW9heGJ1bHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2ODcxNzUsImV4cCI6MjAyMjI2MzE3NX0.UKYdGXSfhGYv9wg6XpX0XTOSKllUyjp0tW7qVYzQGAE";

export const supabase = createClient(supabaseUrl,supabaseAnonKey);