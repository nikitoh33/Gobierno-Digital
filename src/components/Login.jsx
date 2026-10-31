import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  UserCheck, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Sparkles,
  Lock,
  ArrowRight,
  ScanFace,
  Camera,
  RefreshCw,
  VideoOff
} from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('facial'); // 'facial' | 'mi_argentina' | 'arca'
  
  // Campos del formulario tradicional
  const [identifier, setIdentifier] = useState(''); // CUIL / CUIT
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados de la validación interoperable en tiempo real (Formulario)
  const [isValidating, setIsValidating] = useState(false);
  const [validationStep, setValidationStep] = useState(0); 

  // Estados para Reconocimiento Facial (Cámara y Escaneo biométrico)
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [facialStep, setFacialStep] = useState(0); 
  // 0: lista para escanear, 1: detectando rostro, 2: prueba de vida RENAPER, 3: cotejo biométrico DNI, 4: verificado

  // Iniciar / Detener cámara web según la pestaña activa
  useEffect(() => {
    let stream = null;

    if (activeTab === 'facial') {
      navigator.mediaDevices?.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setCameraActive(true);
          setCameraError(false);
        })
        .catch(() => {
          setCameraActive(false);
          setCameraError(true);
        });
    } else {
      setCameraActive(false);
      setIsScanningFace(false);
      setFacialStep(0);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab]);

  // Cargar credenciales de demostración de Nicolás Quispe
  const handleLoadDemoCredentials = () => {
    setIdentifier('20-38841029-4');
    setPassword('••••••••••••');
    setErrorMessage('');
  };

  // Iniciar escaneo biométrico facial
  const handleStartFacialScan = () => {
    setIsScanningFace(true);
    setFacialStep(1); // 1: Detectando rostro y posición
  };

  // Secuencia de validación facial simulada
  useEffect(() => {
    if (!isScanningFace) return;

    // Paso 2: Detección de vida (liveness test)
    const t1 = setTimeout(() => {
      setFacialStep(2);
    }, 900);

    // Paso 3: Cotejo biométrico con base de datos RENAPER
    const t2 = setTimeout(() => {
      setFacialStep(3);
    }, 1800);

    // Paso 4: Rostro verificado al 99.4% de coincidencia
    const t3 = setTimeout(() => {
      setFacialStep(4);
    }, 2700);

    // Acceso exitoso
    const t4 = setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess({
          nombre: "Nicolás Quispe",
          cuil: "20-38841029-4",
          condicionFiscal: "Responsable Inscripto",
          ciudad: "Mendoza"
        });
      }
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isScanningFace, onLoginSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Por favor ingrese su CUIL / CUIT.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Por favor ingrese su clave de acceso.');
      return;
    }

    setErrorMessage('');
    setIsValidating(true);
    setValidationStep(1);
  };

  // Secuencia de validación interoperable tradicional (1.8s)
  useEffect(() => {
    if (!isValidating) return;

    const t1 = setTimeout(() => setValidationStep(2), 600);
    const t2 = setTimeout(() => setValidationStep(3), 1200);
    const t3 = setTimeout(() => setValidationStep(4), 1800);
    const t4 = setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess({
          nombre: "Nicolás Quispe",
          cuil: "20-38841029-4",
          condicionFiscal: "Responsable Inscripto",
          ciudad: "Mendoza"
        });
      }
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isValidating, onLoginSuccess]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between text-[#1F2937] font-sans relative selection:bg-[#0072BB] selection:text-white">
      
      {/* Franja institucional superior */}
      <div className="w-full bg-[#0B2341] text-white py-2 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">REPÚBLICA ARGENTINA</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Gobierno de Mendoza • Ciudad de Mendoza</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Canal Oficial Seguro SSL
          </span>
        </div>
      </div>

      {/* Contenido Central */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg">
          
          {/* Card Principal Oficial */}
          <div className="bg-[#FFFFFF] rounded-lg border border-[#D1D5DB] shadow-md p-6 sm:p-8 relative">
            
            {/* Encabezado Institucional */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <img 
                  src="/escudo.svg" 
                  alt="Escudo de la República Argentina" 
                  className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-sm"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072BB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-2 border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0072BB]" />
                Autenticación Ciudadana Oficial
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#0B2341] tracking-tight">
                Ingreso al Portal MendoRecupera
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-md leading-relaxed">
                Ventanilla Digital de Asistencia y Recuperación ante Emergencias Climáticas — Ciudad de Mendoza
              </p>
            </div>

            {/* Selector de Pestañas (3 Vías: Facial + Mi Argentina + Clave Fiscal) */}
            <div className="mt-6">
              <div className="grid grid-cols-3 p-1 bg-gray-100 rounded-lg border border-gray-200 text-[11px] sm:text-xs font-semibold gap-0.5">
                
                {/* Pestaña Reconocimiento Facial */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('facial');
                    setErrorMessage('');
                  }}
                  className={`py-2 px-1.5 rounded-md transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
                    activeTab === 'facial'
                      ? 'bg-white text-[#0B2341] shadow-sm font-bold border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ScanFace className="w-4 h-4 text-[#0072BB] shrink-0" />
                  <span className="truncate">Rostro RENAPER</span>
                </button>

                {/* Pestaña Mi Argentina */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('mi_argentina');
                    setErrorMessage('');
                  }}
                  className={`py-2 px-1.5 rounded-md transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
                    activeTab === 'mi_argentina'
                      ? 'bg-white text-[#0B2341] shadow-sm font-bold border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#0072BB] shrink-0" />
                  <span className="truncate">Mi Argentina</span>
                </button>

                {/* Pestaña Clave Fiscal ARCA */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('arca');
                    setErrorMessage('');
                  }}
                  className={`py-2 px-1.5 rounded-md transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
                    activeTab === 'arca'
                      ? 'bg-white text-[#0B2341] shadow-sm font-bold border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-[#0072BB] shrink-0" />
                  <span className="truncate">Clave Fiscal</span>
                </button>
              </div>
            </div>

            {/* SECCIÓN 1: RECONOCIMIENTO FACIAL BIOMÉTRICO */}
            {activeTab === 'facial' && (
              <div className="mt-5 space-y-4">
                
                {/* Visor de Cámara con Retícula Biométrica */}
                <div className="relative w-full h-64 sm:h-72 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-300 shadow-inner flex items-center justify-center">
                  
                  {cameraActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  ) : (
                    <div className="text-center p-4 text-gray-300 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center mb-2">
                        {cameraError ? (
                          <VideoOff className="w-8 h-8 text-amber-400" />
                        ) : (
                          <Camera className="w-8 h-8 text-cyan-400 animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-white">
                        {cameraError ? "Cámara no disponible o permiso denegado" : "Conectando sensor biométrico..."}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 max-w-xs">
                        {cameraError 
                          ? "Puedes usar el simulador de prueba biométrica para continuar." 
                          : "Ubica tu rostro dentro del óvalo para el cotejo con RENAPER."}
                      </p>
                    </div>
                  )}

                  {/* Superposición de Óvalo y Retícula Biométrica */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    
                    {/* Marco Oval de Rostro */}
                    <div className={`w-40 sm:w-48 h-52 sm:h-60 rounded-[50%] border-2 transition-all duration-300 ${
                      facialStep === 4 
                        ? 'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.5)]' 
                        : isScanningFace 
                          ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                          : 'border-white/50 border-dashed'
                    }`}>
                      {/* Marcadores de esquinas */}
                      <div className="w-full h-full relative">
                        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></span>
                        <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></span>
                        <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></span>
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></span>
                      </div>
                    </div>

                    {/* Línea láser de escaneo animada */}
                    {isScanningFace && facialStep < 4 && (
                      <div className="absolute w-44 sm:w-52 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-pulse"></div>
                    )}
                  </div>

                  {/* Badge en vivo de estado sobre la cámara */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[10px] font-mono flex items-center gap-1.5 border border-white/20">
                    <span className={`w-2 h-2 rounded-full ${facialStep === 4 ? 'bg-emerald-400' : isScanningFace ? 'bg-cyan-400 animate-ping' : 'bg-gray-400'}`}></span>
                    <span>
                      {facialStep === 0 && "SENSOR LISTO"}
                      {facialStep === 1 && "DETECTANDO ROSTRO..."}
                      {facialStep === 2 && "PRUEBA DE VIDA RENAPER..."}
                      {facialStep === 3 && "COTEJANDO MATRICES..."}
                      {facialStep === 4 && "COINCIDENCIA 99.4%"}
                    </span>
                  </div>

                  {/* Badge de resolución/cifrado */}
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-cyan-300 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/30">
                    Firma SHA-256
                  </div>
                </div>

                {/* Información de estado del escaneo */}
                <div className="p-3 bg-blue-50/70 rounded-md border border-blue-100 text-xs text-gray-700 leading-relaxed">
                  <div className="flex items-center gap-2 font-bold text-[#0B2341] mb-1">
                    <ScanFace className="w-4 h-4 text-[#0072BB]" />
                    <span>Autenticación Facial Nivel 3 (Mi Argentina / RENAPER)</span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Mira al frente a la cámara. El algoritmo realizará una prueba de parpadeo y verificación de contorno contra la imagen digitalizada de tu último DNI.
                  </p>
                </div>

                {/* Acciones para iniciar escaneo */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleStartFacialScan}
                    disabled={isScanningFace}
                    className="w-full py-3 px-4 bg-[#0072BB] hover:bg-[#005082] text-white font-bold text-sm rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isScanningFace ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Escaneando e Identificando...</span>
                      </>
                    ) : (
                      <>
                        <ScanFace className="w-4 h-4" />
                        <span>Iniciar Reconocimiento Facial</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleLoadDemoCredentials();
                      handleStartFacialScan();
                    }}
                    disabled={isScanningFace}
                    className="w-full py-2 px-3 border border-dashed border-[#0072BB] bg-blue-50/50 hover:bg-blue-100/60 text-[#0072BB] rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0072BB]" />
                    <span>Simular Escaneo Directo (Nicolás Quispe)</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECCIÓN 2 Y 3: FORMULARIOS TRADICIONALES (Mi Argentina y Clave Fiscal) */}
            {activeTab !== 'facial' && (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                
                {/* Campo Identificador */}
                <div>
                  <label className="block text-xs font-bold text-[#0B2341] uppercase tracking-wider mb-1.5">
                    {activeTab === 'mi_argentina' ? 'CUIL / DNI (11 dígitos)' : 'CUIT / CUIL'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={activeTab === 'mi_argentina' ? "Ej: 20-38841029-4" : "Ej: 20-38841029-4 o 30-71458923-8"}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0072BB] focus:border-[#0B2341] font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Campo Contraseña / Clave */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#0B2341] uppercase tracking-wider">
                      {activeTab === 'mi_argentina' ? 'Contraseña Mi Argentina' : 'Clave Fiscal (Nivel de Seguridad 3)'}
                    </label>
                    <a 
                      href="#ayuda" 
                      onClick={(e) => e.preventDefault()}
                      className="text-[11px] text-[#0072BB] hover:underline flex items-center gap-0.5"
                    >
                      ¿Olvidaste tu clave?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0072BB] focus:border-[#0B2341] transition-colors"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Texto informativo legal según pestaña */}
                <div className="p-3 bg-blue-50/60 rounded-md border border-blue-100 flex items-start gap-2.5 text-[11px] text-gray-700 leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-[#0072BB] shrink-0 mt-0.5" />
                  {activeTab === 'mi_argentina' ? (
                    <span>
                      <strong>Acceso Nivel 3.</strong> Requiere autenticación biométrica RENAPER (DNI tarjeta emitido posterior a 2012).
                    </span>
                  ) : (
                    <span>
                      <strong>Acceso Institucional ARCA (ex AFIP).</strong> Requiere Clave Fiscal con Nivel de Seguridad 3 o superior para operar en representación de unidades productivas.
                    </span>
                  )}
                </div>

                {/* Mensaje de error si falta llenar algo */}
                {errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Botón Principal de Ingreso */}
                <button
                  type="submit"
                  disabled={isValidating}
                  className="w-full py-3 px-4 bg-[#0072BB] hover:bg-[#005082] text-white font-bold text-sm rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0072BB]/50 disabled:opacity-50"
                >
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Botón de Demostración Rápida */}
                <div className="pt-2 border-t border-gray-200 text-center">
                  <button
                    type="button"
                    onClick={handleLoadDemoCredentials}
                    className="w-full py-2 px-3 border border-dashed border-[#0072BB] bg-blue-50/50 hover:bg-blue-100/60 text-[#0072BB] rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    title="Completar datos del titular para evaluación rápida"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0072BB]" />
                    <span>Cargar Credenciales de Prueba (Nicolás Quispe)</span>
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Autocompleta CUIL: 20-38841029-4 con credenciales nivel 3
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Pie de seguridad y asistencia */}
          <div className="mt-4 text-center space-y-1 text-xs text-gray-500">
            <p className="flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              Conexión protegida bajo infraestructura de biometría y validación provincial.
            </p>
            <p>
              Mesa de Ayuda Digital: <span className="font-semibold text-gray-700">0800-222-MENDOZA</span> (Lunes a Viernes de 8 a 18 hs)
            </p>
          </div>
        </div>
      </div>

      {/* Modal / Tarjeta sobrepuesta de Validación Tradicional (Formularios) */}
      {isValidating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg border border-[#D1D5DB] shadow-2xl max-w-md w-full p-6 text-left relative overflow-hidden">
            
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-[#0072BB] transition-all duration-500 ease-out"
                style={{
                  width: validationStep === 1 ? '33%' : validationStep === 2 ? '66%' : '100%'
                }}
              />
            </div>

            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mt-1">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0072BB] flex items-center justify-center shrink-0 border border-blue-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B2341]">
                  Validando Identidad Interoperable
                </h3>
                <p className="text-xs text-gray-500">
                  Cruzando registros estatales en tiempo real...
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="py-5 space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {validationStep >= 2 ? (
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : validationStep === 1 ? (
                    <Loader2 className="w-5 h-5 text-[#0072BB] animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${validationStep >= 2 ? 'text-gray-900' : 'text-gray-600'}`}>
                    RENAPER: Validación biométrica de titularidad
                  </p>
                  <p className="text-[11px] text-gray-500">
                    DNI tarjeta emitido posterior a 2012 verificado positivamente.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {validationStep >= 3 ? (
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : validationStep === 2 ? (
                    <Loader2 className="w-5 h-5 text-[#0072BB] animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${validationStep >= 3 ? 'text-gray-900' : 'text-gray-600'}`}>
                    ARCA: Constancia de CUIT activa y condición fiscal
                  </p>
                  <p className="text-[11px] text-gray-500">
                    CUIT habilitado, Domicilio Fiscal Electrónico verificado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {validationStep >= 4 ? (
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : validationStep === 3 ? (
                    <Loader2 className="w-5 h-5 text-[#0072BB] animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${validationStep >= 4 ? 'text-gray-900' : 'text-gray-600'}`}>
                    D.P.J. / ATM: Personería jurídica y vinculación comercial
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Padrón de actividades económicas en Mendoza enlazado.
                  </p>
                </div>
              </div>
            </div>

            {validationStep >= 4 && (
              <div className="p-2.5 bg-[#E8F5E9] border border-green-200 rounded-md text-xs text-[#2E7D32] font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Identidad validada con éxito. Redirigiendo al panel...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pie institucional */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 px-4 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Portal Oficial del Gobierno de la Provincia de Mendoza &copy; 2026</span>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#terminos" onClick={(e) => e.preventDefault()} className="hover:text-[#0072BB]">Términos y Condiciones</a>
            <a href="#privacidad" onClick={(e) => e.preventDefault()} className="hover:text-[#0072BB]">Política de Privacidad</a>
            <a href="#soporte" onClick={(e) => e.preventDefault()} className="hover:text-[#0072BB]">Soporte Técnico</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
