import { useEffect, useState } from 'react'

export const LatihanKeranjang = () => {
    const [cartCount, setCartCount] = useState(0)
useEffect(() => { const previousTitle = document.title;
  document.title = `Keranjang Belanja (${cartCount})`;
  return () => {
    document.title = previousTitle;
  };
}, [cartCount])

 ;

  return (
    <div>LatihanKeranjang
        <p>Jumlah Barang : {cartCount}</p>
        <button type='button' onClick={() => setCartCount(cartCount + 1)}>Tambah</button>
        <button type='button' onClick={() => setCartCount(cartCount - 1)}>Kurang
        </button>
        </div>

  )
}
        

        

  

