require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function testConnection() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) {
    console.error('❌ Error al conectar con Supabase:', error);
  } else {
    console.log('✅ Supabase conectado correctamente. Ejemplo de dato:', data);
  }
}

testConnection();
