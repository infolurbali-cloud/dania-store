import { useEffect } from 'react'
import './App.css'

// 5. Function yang menerima dua angka dan mengembalikan boolean true bila jumlahnya < 100
function isLessThan100(a, b) {
  return a + b < 100
}

function runConsoleExercises() {
  console.clear()
  console.log('=== 1. cityName & Penjumlahan 200 + 800 ===')
  const cityName = 'Denpasar'
  const num1 = 200
  const num2 = 800
  const sum = num1 + num2
  console.log('Nama Kota:', cityName)
  console.log('Jumlah:', sum)

  console.log('\n=== 2. Pesan Backticks (Nama Kelas, Tanda Kutip, Dua Baris) ===')
  const className = 'Bootcamp Web Development'
  const message = `Selamat datang di kelas "${className}"!
Mari belajar dasar-dasar JavaScript bersama.`
  console.log(message)

  console.log('\n=== 3. Deklarasi, Assignment Ulang, & Mutasi Array const ===')
  let counter = 1 // Deklarasi dengan let
  counter = 2 // Assignment ulang (BISA karena menggunakan let)
  console.log('Hasil assignment ulang let:', counter)

  const fruits = ['Apel', 'Jeruk'] // Deklarasi array dengan const
  fruits.push('Mangga') // Perubahan isi / mutasi array (BISA meskipun const)
  fruits[0] = 'Pisang' // Mengubah elemen index ke-0 (BISA)
  console.log('Isi array const setelah diubah:', fruits)
  // fruits = ['Semangka'] -> Akan error TypeError: Assignment to constant variable

  console.log('\n=== 4. Prediksi "80" + 10, Number("80") + 10, NaN, & String Kosong ===')
  console.log('"80" + 10 =', '80' + 10, '(String concatenation)')
  console.log('Number("80") + 10 =', Number('80') + 10, '(Penjumlahan angka)')
  console.log('Contoh NaN -> Number("Denpasar"):', Number('Denpasar'))
  console.log('Konversi string kosong -> Number(""):', Number(''))
  console.log('Konversi string kosong -> Boolean(""):', Boolean(''))

  console.log('\n=== 5. Function Cek Jumlah < 100 ===')
  console.log('isLessThan100(40, 50):', isLessThan100(40, 50)) // true (90 < 100)
  console.log('isLessThan100(60, 50):', isLessThan100(60, 50)) // false (110 < 100)

  console.log('\n=== 6. Array & Object Sederhana (Akses Data & Loop) ===')
  const cities = ['Denpasar', 'Badung', 'Gianyar']
  console.log('Akses elemen pertama array:', cities[0])
  console.log('Looping Array dengan for...of:')
  for (const city of cities) {
    console.log('- Kota:', city)
  }

  const student = {
    name: 'Made',
    className: 'Frontend',
    score: 95,
  }
  console.log('Akses data object (dot notation):', student.name)
  console.log('Akses data object (bracket notation):', student['score'])
  console.log('Looping Object dengan for...in:')
  for (const key in student) {
    console.log(`- ${key}: ${student[key]}`)
  }
}

function App() {
  // Data untuk ditampilkan di UI sekaligus dijalankan di Console
  const cityName = 'Denpasar'
  const num1 = 200
  const num2 = 800
  const total = num1 + num2

  const className = 'Bootcamp Web Development'
  const message = `Selamat datang di kelas "${className}"!\nMari belajar dasar-dasar JavaScript bersama.`

  const cities = ['Denpasar', 'Badung', 'Gianyar']
  const student = {
    name: 'Made',
    className: 'Frontend',
    score: 95,
  }

  useEffect(() => {
    runConsoleExercises()
  }, [])

  return (
    <section id="center" style={{ alignItems: 'stretch', maxWidth: '800px', margin: '0 auto', padding: '32px 20px', textAlign: 'left' }}>
      <div>
        <h1>Latihan Dasar JavaScript</h1>
        <p style={{ marginTop: '8px' }}>
          Buka <strong>DevTools Console</strong> (<code>F12</code> / <code>Cmd + Option + J</code>) untuk melihat output lengkap di Console, atau klik tombol di bawah untuk menjalankan ulang.
        </p>
        <button type="button" className="counter" onClick={runConsoleExercises} style={{ marginTop: '12px', cursor: 'pointer' }}>
          Jalankan Ulang di Console
        </button>
      </div>

      {/* 1. cityName & Penjumlahan */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <h2>1. Variabel & Penjumlahan</h2>
        <p>
          Nama Kota: <strong>{cityName}</strong> | Jumlah ({num1} + {num2}): <strong>{total}</strong>
        </p>
      </div>

      {/* 2. Backticks Message */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <h2>2. Pesan dengan Backticks</h2>
        <pre style={{ background: 'var(--social-bg)', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
          {message}
        </pre>
      </div>

      {/* 3. Deklarasi, Reassignment, Mutasi Array const */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <h2>3. Deklarasi, Assignment Ulang, & Isi Array <code>const</code></h2>
        <ul style={{ lineHeight: '1.7', paddingLeft: '20px' }}>
          <li>
            <strong>Deklarasi:</strong> Membuat variabel baru dengan <code>let</code> atau <code>const</code> (contoh: <code>const arr = [1, 2]</code>).
          </li>
          <li>
            <strong>Assignment Ulang:</strong> Mengganti nilai variabel dengan operator <code>=</code>. Bisa dilakukan pada <code>let</code>, tetapi <strong>error</strong> pada <code>const</code> (<code>arr = [3, 4]</code> ❌).
          </li>
          <li>
            <strong>Perubahan Isi Array <code>const</code>:</strong> Karena <code>const</code> hanya mengunci referensi memori array, elemen di dalamnya <strong>tetap bisa diubah/ditambah</strong> (<code>arr.push(3)</code> atau <code>arr[0] = 99</code> ✅).
          </li>
        </ul>
      </div>

      {/* 4. Prediksi Tipe Data, NaN, String Kosong */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <h2>4. Konversi Tipe Data, <code>NaN</code>, & String Kosong</h2>
        <ul style={{ lineHeight: '1.7', paddingLeft: '20px' }}>
          <li>
            <code>&quot;80&quot; + 10</code> = <strong>&quot;{'80' + 10}&quot;</strong> (String concatenation karena salah satu operan adalah string).
          </li>
          <li>
            <code>Number(&quot;80&quot;) + 10</code> = <strong>{Number('80') + 10}</strong> (Penjumlahan angka karena string dikonversi ke Number).
          </li>
          <li>
            <strong><code>NaN</code> (Not-a-Number):</strong> Muncul saat operasi matematika atau konversi angka gagal menghasilkan angka valid (contoh: <code>Number(&quot;Denpasar&quot;)</code> menghasilkan <code>{String(Number('Denpasar'))}</code>).
          </li>
          <li>
            <strong>Konversi String Kosong (<code>&quot;&quot;</code>):</strong> <code>Number(&quot;&quot;)</code> menjadi <strong>{Number('')}</strong>, dan <code>Boolean(&quot;&quot;)</code> menjadi <strong>{String(Boolean(''))}</strong>.
          </li>
        </ul>
      </div>

      {/* 5. Function isLessThan100 */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <h2>5. Function Jumlah &lt; 100</h2>
        <p>
          Percobaan <code>isLessThan100(40, 50)</code> (jumlah 90): <strong>{String(isLessThan100(40, 50))}</strong>
        </p>
        <p>
          Percobaan <code>isLessThan100(60, 50)</code> (jumlah 110): <strong>{String(isLessThan100(60, 50))}</strong>
        </p>
      </div>

      {/* 6. Array & Object */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <h2>6. Akses Data & Loop (Array dan Object)</h2>
        <p>
          <strong>Akses Array (<code>cities[0]</code>):</strong> {cities[0]}
        </p>
        <p>
          <strong>Loop Array:</strong> {cities.join(', ')}
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Akses Object (<code>student.name</code> & <code>student[&quot;score&quot;]</code>):</strong> {student.name} (Nilai: {student['score']})
        </p>
        <p>
          <strong>Loop Object:</strong>{' '}
          {Object.entries(student)
            .map(([key, value]) => `${key}: ${value}`)
            .join(' | ')}
        </p>
      </div>
    </section>
  )
}

export default App
