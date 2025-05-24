require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function runHealthcheck() {
  const testPhone = 'test-healthcheck@c.us';
  const testSign = 'aries';

  console.log('🔌 Verificando conexión a Supabase...');
  const { data: testSelect, error: selectError } = await supabase
    .from('users')
    .select('*')
    .limit(1);

  if (selectError) return console.error('❌ Error en SELECT:', selectError);
  console.log('✅ SELECT correcto:', testSelect);

  console.log('📝 Intentando INSERT...');
  const { data: insertedUser, error: insertError } = await supabase
    .from('users')
    .insert({ phone_number: testPhone, sign: testSign })
    .select('*');

  if (insertError) return console.error('❌ Error en INSERT:', insertError);
  console.log('✅ INSERT correcto:', insertedUser);

  console.log('🔄 Intentando UPDATE...');
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ sign: 'tauro' })
    .eq('phone_number', testPhone)
    .select('*');

  if (updateError) return console.error('❌ Error en UPDATE:', updateError);
  console.log('✅ UPDATE correcto:', updatedUser);

  console.log('🧹 Eliminando test user...');
  const { error: deleteError } = await supabase
    .from('users')
    .delete()
    .eq('phone_number', testPhone);

  if (deleteError) return console.error('⚠️ Error al borrar test user:', deleteError);
  console.log('🧼 Test user eliminado correctamente ✅');
}

runHealthcheck();