import { useState, useEffect } from 'react';
import { ShoppingCart, X, Search, Heart, Sparkles, TrendingUp, Gift, Clock } from 'lucide-react';


export default function FarfallaStore() {
  // Estado para almacenar la lista de productos
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Pijama Tropical Fruta", precio: 65000, desc: "Estilo tropical colorido", color: "multicolor", talla: "m", imagenes: ["https://images.unsplash.com/photo-1612873087320-61b96c2377e6?w=400&h=400&fit=crop"], calificacion: 4.5, resenas: 12, material: "100% algodón franela", cuidado: "Lavar en agua fría", stock: 5, trending: true },
    { id: 2, nombre: "Pijama Stitch Morado", precio: 58000, desc: "Diseño exclusivo cómodo", color: "morado", talla: "l", imagenes: ["https://images.unsplash.com/photo-1618886996285-6abaf18d3d23?w=400&h=400&fit=crop"], calificacion: 5, resenas: 8, material: "100% algodón franela", cuidado: "Lavar en agua fría", stock: 3 },
    { id: 3, nombre: "Pijama Corazones Rosa", precio: 60000, desc: "Romántico y acogedor", color: "rosa", talla: "m", imagenes: ["https://images.unsplash.com/photo-1630599810032-47df8e1c8f88?w=400&h=400&fit=crop"], calificacion: 4.8, resenas: 15, material: "100% algodón franela", cuidado: "Lavar en agua fría", stock: 8, nueva: true },
  ]);

  // Estado para el carrito de compras
  const [carrito, setCarrito] = useState([]);
  // Estado para controlar si el carrito está abierto o cerrado
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  // Estado para almacenar las cantidades de cada producto
  const [cantidades, setCantidades] = useState({});
  // Estado para el texto de búsqueda
  const [busqueda, setBusqueda] = useState('');
  // Estado para mostrar notificaciones temporales
  const [notificacion, setNotificacion] = useState('');
  // Estado para timer de ofertas (no se usa actualmente)
  const [timerFlash, setTimerFlash] = useState(null);
  // Estado para saber qué producto tiene el mouse encima
  const [productoEnfoque, setProductoEnfoque] = useState(null);
  // Estado para el índice actual del carrusel
  const [indiceCarrusel, setIndiceCarrusel] = useState(0);
  
  // Imágenes para el carrusel
  const imagenesCarrusel = [
    "/public/imagen1.webp",
"public/imagen2.webp",
"public/imagen3.webp",
"public/imagen4.webp",

  ];
  // Estado para controlar si el panel de admin está abierto
  const [adminAbierto, setAdminAbierto] = useState(false);
  // Estado para la contraseña ingresada en el admin
  const [passwordInput, setPasswordInput] = useState('');
  // Estado para saber si el admin está autenticado
  const [adminAutenticado, setAdminAutenticado] = useState(false);
  // Estados para el formulario de agregar producto nuevo
  const [formNombre, setFormNombre] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formTalla, setFormTalla] = useState('');
  const [formImagenes, setFormImagenes] = useState([]);
  const [formMaterial, setFormMaterial] = useState('');
  const [formCuidado, setFormCuidado] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formPreview, setFormPreview] = useState('');

  // Contraseña fija para acceder al panel de administración
  const PASSWORD_ADMIN = '1234';

  // Efecto para detectar el atajo de teclado Ctrl+Q para abrir el panel admin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setAdminAbierto(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  
  // Efecto para el carrusel automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceCarrusel((prev) => (prev + 1) % imagenesCarrusel.length);
    }, 5000); // Cambia cada 3 segundos
    
    return () => clearInterval(intervalo);
  }, [imagenesCarrusel.length]);

  // Función para verificar la contraseña del admin
  const verificarPassword = () => {
    if (passwordInput === PASSWORD_ADMIN) {
      setAdminAutenticado(true);
      setPasswordInput('');
    } else {
      alert('❌ Contraseña incorrecta');
      setPasswordInput('');
    }
  };

  // Función para actualizar un campo específico de un producto
  const actualizarProducto = (id, campo, valor) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, [campo]: valor } : p
    ));
  };

  // Función para eliminar un producto por su ID
  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
    setNotificacion('🗑️ Producto eliminado');
    setTimeout(() => setNotificacion(''), 2000);
  };

  // Función para manejar la subida de imágenes
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormImagenes([...formImagenes, reader.result]);
        setFormPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para agregar un nuevo producto
  const handleAgregarProducto = () => {
    if (!formNombre || !formPrecio || !formDesc || formImagenes.length === 0) {
      alert('⚠️ Completa todos los campos incluida la imagen');
      return;
    }

    const newId = Math.max(...productos.map(p => p.id), 0) + 1;
    const nuevoProducto = {
      id: newId,
      nombre: formNombre,
      precio: parseInt(formPrecio),
      desc: formDesc,
      color: formColor || 'sin especificar',
      talla: formTalla || 'M',
      imagenes: formImagenes,
      material: formMaterial || '100% algodón',
      cuidado: formCuidado || 'Lavar en agua fría',
      stock: parseInt(formStock) || 5,
      calificacion: 5,
      resenas: 0
    };

    setProductos([...productos, nuevoProducto]);
    setNotificacion(`✅ ¡"${formNombre}" agregado exitosamente!`);
    setTimeout(() => setNotificacion(''), 3000);

    setFormNombre('');
    setFormPrecio('');
    setFormDesc('');
    setFormColor('');
    setFormTalla('');
    setFormImagenes([]);
    setFormMaterial('');
    setFormCuidado('');
    setFormStock('');
    setFormPreview('');
  };

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    const cantidad = cantidades[producto.id] || 1;
    const existe = carrito.find(item => item.id === producto.id);
    
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
    
    setCantidades(prev => ({ ...prev, [producto.id]: 1 }));
    setNotificacion(`✨ ¡"${producto.nombre}" agregado!`);
    setTimeout(() => setNotificacion(''), 2000);
  };

  // Filtrar productos según la búsqueda
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular el total del carrito
  const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  // Calcular la cantidad total de items en el carrito
  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // Función para abrir WhatsApp con un mensaje
  const contactarWhatsApp = (mensaje) => {
    window.open(`https://wa.me/573172850958?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  // Función para procesar el checkout (generar mensaje de WhatsApp)
  const handleCheckout = () => {
    if (carrito.length === 0) return;
    let mensaje = '¡Hola! Quiero comprar:\n\n';
    carrito.forEach(item => {
      mensaje += `• ${item.nombre}\n  Cantidad: ${item.cantidad}\n  Subtotal: $${(item.precio * item.cantidad).toLocaleString()}\n\n`;
    });
    mensaje += `*TOTAL: $${totalCarrito.toLocaleString()}*`;
    contactarWhatsApp(mensaje);
  };

  // Función para renderizar estrellas de calificación
  const renderStars = (calificacion) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>{i < Math.floor(calificacion) ? '⭐' : '☆'}</span>
    ));
  };

  // Función para alternar favoritos (no implementada)
  function toggleFavorito(id) {
    // Implementar favoritos
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 text-slate-800 overflow-hidden">
      {/* Fondo animado con colores azul agua marina */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-cyan-100/40 to-blue-100/40 opacity-80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Header de la tienda */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-teal-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-60 blur-lg animate-pulse"></div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16">
                    <Sparkles className="w-full h-full text-teal-600" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                    FARFALLA
                  </h1>
                  <p className="text-xs sm:text-sm text-teal-600 font-bold tracking-widest">PREMIUM SLEEPWEAR</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex items-center gap-2 bg-teal-100 border border-teal-200 px-3 sm:px-4 py-2 rounded-full">
                  <Clock size={16} className="text-teal-600" />
                  <span className="text-xs font-bold text-teal-700">Envío express</span>
                </div>

                <button
                  onClick={() => setCarritoAbierto(true)}
                  className="relative group p-2 sm:p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full hover:scale-110 transition-all shadow-lg hover:shadow-teal-400/50"
                >
                  <ShoppingCart size={20} className="sm:w-6 sm:h-6 text-white" />
                  {cantidadTotal > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-rose-500 text-white text-xs font-black rounded-full flex items-center justify-center animate-bounce shadow-lg">
                      {cantidadTotal}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Notificación flotante */}
        {notificacion && (
          <div className="fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl font-bold text-sm sm:text-lg animate-bounce max-w-[90%] sm:max-w-none text-center">
            {notificacion}
          </div>
        )}


{/* Carrusel de imágenes */}
<section className="relative w-full mt-16 sm:mt-20">
  {/* Contenedor con gradiente de fondo */}
  <div 
    className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[520px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    style={{ perspective: '1000px' }}
  >
    
    {imagenesCarrusel.map((img, idx) => {
      // Calcular la posición relativa de cada imagen
      let position = idx - indiceCarrusel;
      if (position < -1) position = position + imagenesCarrusel.length;
      if (position > 1) position = position - imagenesCarrusel.length;
      
      // Determinar estilos basados en la posición
      const getTransform = () => {
        if (position === 0) {
          return 'translateX(0%) rotateY(0deg) scale(1)';
        } else if (position === 1) {
          return 'translateX(80%) rotateY(-65deg) scale(0.8)';
        } else if (position === -1) {
          return 'translateX(-80%) rotateY(65deg) scale(0.8)';
        } else {
          return 'translateX(200%) rotateY(-90deg) scale(0.6)';
        }
      };

      const getOpacity = () => {
        if (position === 0) return 1;
        if (Math.abs(position) === 1) return 0.6;
        return 0;
      };

      const getZIndex = () => {
        if (position === 0) return 30;
        if (Math.abs(position) === 1) return 20;
        return 10;
      };

      return (
        <div
          key={idx}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            transform: getTransform(),
            opacity: getOpacity(),
            zIndex: getZIndex(),
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Fondo con imagen difuminada + overlay de color */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Imagen de fondo muy difuminada y expandida */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center blur-3xl"
              style={{ 
                backgroundImage: `url(${img})`,
                transform: 'scale(1.5)',
                filter: 'blur(60px) brightness(0.7)',
              }}
            />
            
            {/* Overlay de color suave para unificar */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-blue-900/40" />
            
            {/* Degradado adicional para suavizar los bordes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
          </div>
          
          {/* Imagen principal */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={img}
              alt={`Pijama ${idx + 1}`}
              className="max-w-full max-h-full object-contain transform hover:scale-105 transition-transform duration-300 shadow-2xl relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      );
    })}

    {/* Botones de navegación */}
    <button
      onClick={() => setIndiceCarrusel((prev) => 
        prev === 0 ? imagenesCarrusel.length - 1 : prev - 1
      )}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white 
                 text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300
                 hover:scale-110 z-40"
      aria-label="Imagen anterior"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button
      onClick={() => setIndiceCarrusel((prev) => 
        prev === imagenesCarrusel.length - 1 ? 0 : prev + 1
      )}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white 
                 text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300
                 hover:scale-110 z-40"
      aria-label="Imagen siguiente"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
    {/* Indicadores de posición */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
      {imagenesCarrusel.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setIndiceCarrusel(idx)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            idx === indiceCarrusel 
              ? "bg-white w-8" 
              : "bg-white/50 hover:bg-white/75"
          }`}
          aria-label={`Ir a imagen ${idx + 1}`}
        />
      ))}
    </div>
  </div>
</section>

      

        {/* Sección hero (principal) */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-100/30 via-transparent to-cyan-100/30"></div>
          </div>

      
          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <div className="mb-4 sm:mb-6 inline-block">
              <span className="px-4 sm:px-6 py-2 sm:py-3 bg-teal-100 border border-teal-200 rounded-full text-xs sm:text-sm font-bold text-teal-700 flex items-center gap-2">
                <Sparkles size={14} className="sm:w-4 sm:h-4" />
                COLECCIÓN EXCLUSIVA 2025
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                SUEÑOS
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                DE COMODIDAD
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Pijamas 100% algodón franela con diseños que transformarán tus noches en una experiencia de lujo absoluto
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
              {[
                { icon: '👑', texto: 'Premium Quality', color: 'from-teal-100 to-teal-50' },
                { icon: '✨', texto: 'Diseños Únicos', color: 'from-cyan-100 to-cyan-50' },
                { icon: '☁️', texto: 'Máx. Comodidad', color: 'from-blue-100 to-blue-50' },
                { icon: '🚀', texto: 'Envío Rápido', color: 'from-sky-100 to-sky-50' }
              ].map((item, idx) => (
                <div key={idx} className={`group p-3 sm:p-4 bg-gradient-to-br ${item.color} border border-${item.color.split('-')[1]}-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer`}>
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <p className="text-xs font-bold text-slate-700">{item.texto}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black text-base sm:text-lg rounded-full hover:scale-110 transition-all shadow-lg hover:shadow-teal-400/50 animate-bounce"
            >
              EXPLORAR COLECCIÓN ↓
            </button>
          </div>
        </section>

        {/* Sección de búsqueda */}
        <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8 relative z-20">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="Busca tu pijama ideal..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-11 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white/80 border border-teal-200 rounded-xl focus:outline-none focus:border-teal-400 focus:bg-white transition-all text-slate-800 placeholder-teal-400 shadow-sm"
            />
          </div>
        </section>

        {/* Sección de productos */}
        <section id="productos" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 relative z-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-3 sm:mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            NUESTRAS JOYAS
          </h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-12 text-base sm:text-lg px-4">Cada pijama es una obra de arte diseñada para tu confort</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtrados.map((prod, idx) => (
              <div
                key={prod.id}
                className="group relative h-full"
                onMouseEnter={() => setProductoEnfoque(prod.id)}
                onMouseLeave={() => setProductoEnfoque(null)}
              >
                {/* Efecto de fondo para la tarjeta */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-cyan-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                <div className="relative bg-white border border-teal-100 rounded-2xl overflow-hidden hover:border-teal-200 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl">
                  {/* Badges de trending y nuevo */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex gap-2">
                    {prod.trending && (
                      <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-white text-xs font-black flex items-center gap-1">
                        <TrendingUp size={12} /> TRENDING
                      </div>
                    )}
                    {prod.nueva && (
                      <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full text-white text-xs font-black">
                        🆕 NUEVO
                      </div>
                    )}
                  </div>

                  {/* Imagen del producto */}
                  <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={prod.imagenes[0]}
                      alt={prod.nombre}
                      className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Información del producto */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-xl font-black text-slate-800 flex-1">
                        {prod.nombre}
                      </h3>
                      <button
                        onClick={() => toggleFavorito(prod.id)}
                        className="p-2 bg-teal-50 rounded-full hover:bg-teal-100 transition-all flex-shrink-0"
                      >
                        <Heart size={18} className="sm:w-5 sm:h-5 text-rose-400 hover:fill-rose-400" />
                      </button>
                    </div>

                    {/* Reseñas y calificación */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="flex gap-0.5 text-sm">
                        {renderStars(prod.calificacion)}
                      </div>
                      <span className="text-xs text-slate-500">({prod.resenas})</span>
                    </div>

                    <p className="text-sm text-slate-600 mb-3 sm:mb-4">{prod.desc}</p>

                    {/* Material y talla */}
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-teal-50/50 border border-teal-100 rounded-lg">
                      <p className="text-xs text-teal-700 font-bold">
                        🧵 {prod.material} | 📏 {prod.talla.toUpperCase()}
                      </p>
                    </div>

                    {/* Precio */}
                    <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                      ${prod.precio.toLocaleString()}
                    </p>

                    {/* Stock disponible */}
                    <div className="mb-3 sm:mb-4 text-xs font-bold">
                      {prod.stock > 5 ? (
                        <span className="text-emerald-600">✅ En stock ({prod.stock})</span>
                      ) : (
                        <span className="text-rose-500">⚠️ Solo {prod.stock} disponibles</span>
                      )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                      <button
                        onClick={() => agregarAlCarrito(prod)}
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black text-sm sm:text-base rounded-lg hover:scale-105 transition-all shadow-md hover:shadow-teal-400/50"
                      >
                        🛒 Agregar a Carrito
                      </button>
                
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje cuando no hay resultados de búsqueda */}
          {filtrados.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl sm:text-2xl text-slate-500 font-bold">
                No encontramos pijamas con esa búsqueda
              </p>
            </div>
          )}
        </section>

        {/* Modal del carrito (se abre cuando carritoAbierto es true) */}
        {carritoAbierto && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-white/80 backdrop-blur-sm"
              onClick={() => setCarritoAbierto(false)}
            ></div>

            <div className="absolute right-0 top-0 h-screen w-full sm:w-[400px] md:w-[450px] bg-white border-l border-teal-200 shadow-2xl flex flex-col">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 sm:p-6 flex justify-between items-center font-black">
                <h2 className="text-xl sm:text-2xl flex items-center gap-2">
                  <ShoppingCart size={24} className="sm:w-7 sm:h-7" />
                  MI CARRITO
                </h2>
                <button
                  onClick={() => setCarritoAbierto(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} className="sm:w-7 sm:h-7" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {carrito.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-600 font-bold text-lg">Tu carrito está vacío</p>
                    <p className="text-slate-500 text-sm mt-2">¡Agrega pijamas para comenzar!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {carrito.map((item, idx) => (
                      <div key={idx} className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-800">{item.nombre}</h4>
                          <button
                            onClick={() => setCarrito(carrito.filter((_, i) => i !== idx))}
                            className="text-rose-500 hover:text-rose-600 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">Cantidad: {item.cantidad}</p>
                        <p className="font-bold text-teal-600 text-lg">
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {carrito.length > 0 && (
                <div className="border-t border-teal-200 p-4 sm:p-6 bg-white">
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-teal-50 border border-teal-100 rounded-lg">
                    <p className="text-xs sm:text-sm text-slate-600 mb-2">TOTAL A PAGAR</p>
                    <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      ${totalCarrito.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black py-3 sm:py-4 rounded-lg hover:scale-105 transition-all shadow-lg hover:shadow-teal-400/50 text-base sm:text-lg"
                  >
                    💬 COMPRAR AHORA
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer de la página */}
        <footer className="border-t border-teal-200 mt-12 sm:mt-20 py-8 sm:py-12 relative z-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div>
                <h3 className="text-base sm:text-lg font-black text-teal-600 mb-3 sm:mb-4">FARFALLA</h3>
                <p className="text-slate-600 text-sm">
                  Pijamas de lujo para tus noches más cómodas. Hecho en Colombia con amor.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-teal-600 mb-3 sm:mb-4">CONTACTO</h3>
                <p className="text-slate-600 text-sm flex items-center gap-2 mb-2">
                  <span className="text-teal-500">📱</span> +57 317 285 0958
                </p>
                <p className="text-slate-600 text-sm flex items-center gap-2">
                  <span className="text-teal-500">📍</span> Colombia
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-teal-600 mb-3 sm:mb-4">SÍGUENOS</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com/farfallapijamas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white text-lg sm:text-xl">
                    📷
                  </a>
                  <a href="https://wa.me/573172850958" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white text-lg sm:text-xl">
                    💬
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-teal-200 pt-6 sm:pt-8 text-center text-slate-500 text-xs sm:text-sm">
              <p>© 2025 Farfalla Pijamas. Todos los derechos reservados. <span className="text-teal-500">💙</span></p>
            </div>
          </div>
        </footer>

        {/* Modal del panel de administración */}
        {adminAbierto && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-white/80 backdrop-blur-sm"
              onClick={() => {
                setAdminAbierto(false);
                setAdminAutenticado(false);
                setPasswordInput('');
              }}
            ></div>

            <div className="absolute left-0 top-0 h-screen w-full sm:w-[400px] md:w-[450px] bg-white border-r border-amber-300 shadow-2xl flex flex-col overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 sm:p-6 flex justify-between items-center font-black">
                <h2 className="text-xl sm:text-2xl">⚙️ PANEL ADMIN</h2>
                <button
                  onClick={() => {
                    setAdminAbierto(false);
                    setAdminAutenticado(false);
                    setPasswordInput('');
                  }}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} className="sm:w-7 sm:h-7" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {!adminAutenticado ? (
                  <div className="space-y-4">
                    <p className="text-slate-600 font-bold text-base sm:text-lg">Ingresa la contraseña:</p>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && verificarPassword()}
                      placeholder="Contraseña"
                      className="w-full px-4 py-3 bg-slate-50 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 text-slate-800"
                      autoFocus
                    />
                    <button
                      onClick={verificarPassword}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-3 rounded-lg hover:scale-105 transition-all shadow-lg"
                    >
                      ENTRAR
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Sección para editar productos existentes */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h3 className="font-black text-amber-600 mb-4 text-base sm:text-lg">📝 EDITAR PRODUCTOS</h3>
                      {productos.map(prod => (
                        <div key={prod.id} className="bg-white p-3 sm:p-4 rounded-lg mb-4 border border-amber-200 shadow-sm">
                          <input
                            type="text"
                            value={prod.nombre}
                            onChange={(e) => actualizarProducto(prod.id, 'nombre', e.target.value)}
                            className="w-full px-3 py-2 border border-amber-200 rounded mb-2 font-bold text-slate-800 bg-slate-50 text-sm sm:text-base"
                          />
                          <input
                            type="number"
                            value={prod.precio}
                            onChange={(e) => actualizarProducto(prod.id, 'precio', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-amber-200 rounded mb-2 text-slate-800 bg-slate-50 text-sm sm:text-base"
                            placeholder="Precio"
                          />
                          <input
                            type="text"
                            value={prod.color}
                            onChange={(e) => actualizarProducto(prod.id, 'color', e.target.value)}
                            className="w-full px-3 py-2 border border-amber-200 rounded mb-2 text-slate-800 bg-slate-50 text-sm sm:text-base"
                            placeholder="Color"
                          />
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => actualizarProducto(prod.id, 'stock', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-amber-200 rounded mb-2 text-slate-800 bg-slate-50 text-sm sm:text-base"
                            placeholder="Stock"
                          />
                          {prod.imagenes[0] && (
                            <img
                              src={prod.imagenes[0]}
                              alt="Preview"
                              className="w-full h-16 sm:h-20 object-cover rounded border border-amber-200 mb-2"
                            />
                          )}
                          <button
                            onClick={() => eliminarProducto(prod.id)}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-2 rounded transition-all text-sm sm:text-base"
                          >
                            🗑️ ELIMINAR
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Sección para agregar nuevos productos */}
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h3 className="font-black text-teal-600 mb-4 text-base sm:text-lg">➕ AGREGAR PRODUCTO</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={formNombre}
                          onChange={(e) => setFormNombre(e.target.value)}
                          placeholder="Nombre"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="number"
                          value={formPrecio}
                          onChange={(e) => setFormPrecio(e.target.value)}
                          placeholder="Precio"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="text"
                          value={formDesc}
                          onChange={(e) => setFormDesc(e.target.value)}
                          placeholder="Descripción"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="text"
                          value={formColor}
                          onChange={(e) => setFormColor(e.target.value)}
                          placeholder="Color"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="text"
                          value={formTalla}
                          onChange={(e) => setFormTalla(e.target.value)}
                          placeholder="Talla"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="text"
                          value={formMaterial}
                          onChange={(e) => setFormMaterial(e.target.value)}
                          placeholder="Material"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="text"
                          value={formCuidado}
                          onChange={(e) => setFormCuidado(e.target.value)}
                          placeholder="Cuidados"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <input
                          type="number"
                          value={formStock}
                          onChange={(e) => setFormStock(e.target.value)}
                          placeholder="Stock"
                          className="w-full px-3 py-2 border border-teal-200 rounded text-slate-800 bg-white text-sm sm:text-base"
                        />
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-teal-600 mb-2">📸 Imagen</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-3 py-2 border-2 border-dashed border-teal-300 rounded cursor-pointer text-slate-800 bg-white text-sm"
                          />
                          {formPreview && (
                            <img
                              src={formPreview}
                              alt="Preview"
                              className="w-full h-16 sm:h-20 object-cover rounded border border-teal-300 mt-2"
                            />
                          )}
                        </div>
                        <button
                          onClick={handleAgregarProducto}
                          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 rounded transition-all text-sm sm:text-base"
                        >
                          ✅ AGREGAR PRODUCTO
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}