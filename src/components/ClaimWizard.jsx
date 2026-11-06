import React, { useState } from 'react';
import { 
  Wind, 
  CloudRain, 
  CloudLightning, 
  FileText, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Trash2
} from 'lucide-react';

export default function ClaimWizard({ business, onCancel, onSubmitClaim }) {
  const [step, setStep] = useState(1);

  // Fechas límites: hoy y hace máximo 30 días (1 mes)
  const [{ minDate, maxDate }] = useState(() => {
    const today = new Date();
    const max = today.toISOString().split('T')[0];
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setDate(today.getDate() - 30);
    const min = oneMonthAgo.toISOString().split('T')[0];
    return { minDate: min, maxDate: max };
  });

  // Form State
  const [contingencyType, setContingencyType] = useState('Viento Zonda');
  const [incidentDate, setIncidentDate] = useState(maxDate);
  const [incidentTime, setIncidentTime] = useState('16:30');
  const [damageDescription, setDamageDescription] = useState(
    'Desprendimiento de marquesina exterior, rotura de cristales en vidriera principal por ráfagas intensas de Zonda e ingreso de polvo/escombros que dañaron mercadería exhibida y estanterías.'
  );
  const [suggestedAssistance, setSuggestedAssistance] = useState([
    'Subsidio de emergencia',
    'Exención transitoria de tasas municipales'
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState([
    {
      id: 1,
      name: 'rotura_marquesina_vidriera.jpg',
      size: '2.4 MB',
      coords: 'Lat -32.8891, Long -68.8453',
      status: 'Georreferenciada'
    },
    {
      id: 2,
      name: 'danos_mercaderia_interior.jpg',
      size: '1.8 MB',
      coords: 'Lat -32.8892, Long -68.8455',
      status: 'Georreferenciada'
    }
  ]);
  const [swornStatement, setSwornStatement] = useState(false);
  const [validationError, setValidationError] = useState('');

  const assistanceOptions = [
    {
      id: "Subsidio de emergencia",
      title: "Subsidio de emergencia (Aporte No Reintegrable - ANR)",
      desc: "Fondos directos no reintegrables para reposición de mercaderías inutilizadas, reparación de cristales y cartelería.",
      tag: "Ministerio de Producción / Gobierno Provincial"
    },
    {
      id: "Exención transitoria de tasas municipales",
      title: "Exención transitoria de tasas municipales (Comercio e Higiene / ABL)",
      desc: "Condonación y exención del pago de tasas comerciales y servicios a la propiedad durante la etapa de recuperación.",
      tag: "Municipalidad de la Ciudad de Mendoza"
    },
    {
      id: "Retiro municipal de escombros/ramas",
      title: "Retiro de escombros, ramas y cuadrilla de saneamiento",
      desc: "Operativo urgente de higiene urbana para despeje de vereda, calzada, retiro de ramas caídas y restos estructurales.",
      tag: "Dirección de Servicios Públicos"
    },
    {
      id: "Crédito blando de recuperación",
      title: "Crédito blando de recuperación productiva (Fondo para la Transformación)",
      desc: "Financiamiento con tasa subsidiada bonificada y período de gracia a través del FTyC para reactivación comercial.",
      tag: "Fondo para la Transformación y Crecimiento (FTyC)"
    }
  ];

  const handleToggleAssistance = (id) => {
    if (suggestedAssistance.includes(id)) {
      if (suggestedAssistance.length > 1) {
        setSuggestedAssistance(suggestedAssistance.filter(item => item !== id));
      }
    } else {
      setSuggestedAssistance([...suggestedAssistance, id]);
    }
  };

  // Handle Photo Simulation
  const handleSimulateAddPhoto = () => {
    const newPhoto = {
      id: Date.now(),
      name: `evidencia_danio_${uploadedPhotos.length + 1}.jpg`,
      size: '3.1 MB',
      coords: 'Lat -32.8893, Long -68.8451',
      status: 'Georreferenciada'
    };
    setUploadedPhotos([...uploadedPhotos, newPhoto]);
  };

  const handleRemovePhoto = (id) => {
    setUploadedPhotos(uploadedPhotos.filter(p => p.id !== id));
  };

  // Step validations
  const handleNextStep = () => {
    setValidationError('');
    if (step === 1) {
      if (!contingencyType || !incidentDate || !incidentTime) {
        setValidationError('Por favor complete todos los datos de fecha, hora y tipo de contingencia.');
        return;
      }
      const selected = new Date(incidentDate + 'T00:00:00');
      const maxLimit = new Date(maxDate + 'T00:00:00');
      const minLimit = new Date(minDate + 'T00:00:00');

      if (selected > maxLimit) {
        setValidationError('La fecha del suceso no puede ser posterior a la fecha actual.');
        return;
      }
      if (selected < minLimit) {
        setValidationError('Plazo vencido: La solicitud debe iniciarse dentro de los 30 días corridos posteriores al siniestro (máximo 1 mes).');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!damageDescription.trim() || damageDescription.length < 20) {
        setValidationError('Por favor ingrese una descripción detallada del siniestro (mínimo 20 caracteres).');
        return;
      }
      if (uploadedPhotos.length === 0) {
        setValidationError('Es obligatorio adjuntar al menos una fotografía con evidencia del daño.');
        return;
      }
      if (suggestedAssistance.length === 0) {
        setValidationError('Debe seleccionar al menos una línea de asistencia prioritaria.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!swornStatement) {
      setValidationError('Debe aceptar la Declaración Jurada para poder remitir el expediente.');
      return;
    }

    const claimData = {
      id: `CLM-${Date.now()}`,
      trackingCode: `REC-MZA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      businessId: business.id,
      businessName: business.razonSocial,
      businessCuit: business.cuit,
      businessAddress: business.direccion,
      businessRubro: business.rubro,
      contingencyType,
      incidentDate,
      incidentTime,
      damageDescription,
      suggestedAssistance,
      photoCount: uploadedPhotos.length,
      createdAt: new Date().toISOString(),
      status: 'En Evaluación Técnica Preliminar',
      inspectionLevel: 'Pendiente de peritaje ocular por Defensa Civil',
      responsibleEntity: 'Defensa Civil / Municipalidad de Mendoza'
    };

    onSubmitClaim(claimData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Botón Volver */}
      <div className="mb-4">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel de Comercios
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border-2 border-gray-300 overflow-hidden">
        
        {/* Barra de Pasos / Wizard Header */}
        <div className="bg-[#0B2341] text-white p-4 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-blue-300 font-bold block mb-0.5 sm:mb-1">
                Formulario Único de Contingencia
              </span>
              <h2 className="text-lg sm:text-2xl font-bold leading-tight">
                Solicitud de Asistencia y Declaración de Daños
              </h2>
            </div>
            <div className="bg-blue-900/60 border border-blue-400/30 rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-left sm:text-right self-stretch sm:self-auto">
              <span className="text-[10px] sm:text-[11px] text-blue-200 block">Establecimiento Afectado:</span>
              <span className="text-xs font-bold text-white truncate max-w-full sm:max-w-xs block">
                {business.razonSocial}
              </span>
            </div>
          </div>

          {/* Stepper visual */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 relative">
            <div className={`flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg ${step === 1 ? 'bg-white/15' : 'opacity-70'}`}>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                step > 1 ? 'bg-emerald-500 text-white' : step === 1 ? 'bg-[#0072BB] text-white ring-2 ring-white/50' : 'bg-gray-700 text-gray-300'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <div className="text-center sm:text-left text-xs">
                <p className="font-semibold text-[10px] sm:text-xs leading-tight">Paso 1</p>
                <p className="hidden sm:block text-[11px] text-gray-300">Contingencia</p>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg ${step === 2 ? 'bg-white/15' : 'opacity-70'}`}>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                step > 2 ? 'bg-emerald-500 text-white' : step === 2 ? 'bg-[#0072BB] text-white ring-2 ring-white/50' : 'bg-gray-700 text-gray-300'
              }`}>
                {step > 2 ? '✓' : '2'}
              </div>
              <div className="text-center sm:text-left text-xs">
                <p className="font-semibold text-[10px] sm:text-xs leading-tight">Paso 2</p>
                <p className="hidden sm:block text-[11px] text-gray-300">Evidencias</p>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg ${step === 3 ? 'bg-white/15' : 'opacity-70'}`}>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                step === 3 ? 'bg-[#0072BB] text-white ring-2 ring-white/50' : 'bg-gray-700 text-gray-300'
              }`}>
                3
              </div>
              <div className="text-center sm:text-left text-xs">
                <p className="font-semibold text-[10px] sm:text-xs leading-tight">Paso 3</p>
                <p className="hidden sm:block text-[11px] text-gray-300">Declaración</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de Error si aplica */}
        {validationError && (
          <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 bg-red-50 border-l-4 border-red-600 p-3 sm:p-4 rounded-r-lg text-xs sm:text-sm text-red-800 flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Cuerpo del Formulario según Paso */}
        <div className="p-4 sm:p-8">
          
          {/* PASO 1: DATOS DE LA CONTINGENCIA */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Comercio Pre-cargado Bloqueado */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Establecimiento Registrado (Lectura Oficial)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Identidad Tributaria Verificada
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Razón Social:</span>
                    <span className="font-bold text-gray-900">{business.razonSocial}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">CUIT:</span>
                    <span className="font-mono font-semibold text-gray-800">{business.cuit}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Domicilio Declarado:</span>
                    <span className="font-medium text-gray-800">{business.direccion}</span>
                  </div>
                </div>
              </div>

              {/* Selector de Contingencia */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Tipo de Evento Climático o Siniestro:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { type: 'Viento Zonda', icon: Wind, desc: 'Ráfagas extremas, caídas de ramas o cables, voladuras' },
                    { type: 'Tormenta Severa / Inundación', icon: CloudRain, desc: 'Anegamiento, desborde aluvional, ingreso de agua' },
                    { type: 'Caída de Granizo', icon: CloudLightning, desc: 'Impacto en techos, cartelería, lucernarios' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = contingencyType === item.type;
                    return (
                      <div
                        key={item.type}
                        onClick={() => setContingencyType(item.type)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'border-[#0072BB] bg-blue-50/60 ring-2 ring-[#0072BB]/40 shadow-xs' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#0072BB]' : 'text-gray-500'}`} />
                          <span className={`font-bold text-sm ${isSelected ? 'text-[#0072BB]' : 'text-gray-800'}`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fecha y Hora aproximada */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Fecha del Suceso:
                    </label>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Máximo 1 mes de antigüedad
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      value={incidentDate}
                      min={minDate}
                      max={maxDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Ventana legal: Entre <strong>{minDate}</strong> y <strong>{maxDate}</strong> (Resolución de Emergencia).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Hora Aproximada de Ocurrencia:
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={incidentTime}
                      onChange={(e) => setIncidentTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Horario de mayor impacto en la estructura o zona.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: DESCRIPCIÓN Y EVIDENCIA */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Textarea de Descripción de Daños */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Descripción Detallada de los Daños en Instalaciones y/o Mercadería:
                </label>
                <textarea
                  rows={4}
                  value={damageDescription}
                  onChange={(e) => setDamageDescription(e.target.value)}
                  placeholder="Detalle los daños ocasionados por el evento: rotura de vidrieras, cartelería, ingreso de agua o tierra, mercadería inutilizada, fallas eléctricas..."
                  className="w-full p-3.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0072BB] placeholder:text-gray-400 leading-relaxed"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Indique áreas afectadas y si el local se encuentra momentáneamente imposibilitado de operar.
                </span>
              </div>

              {/* Selector de Imágenes con Geolocalización Simulada */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Fotografías y Evidencia Gráfica (Con Metadatos EXIF / GPS):
                  </label>
                  <button
                    type="button"
                    onClick={handleSimulateAddPhoto}
                    className="inline-flex items-center gap-1.5 text-xs text-[#0072BB] font-semibold hover:underline"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    + Simular Subir Otra Fotografía
                  </button>
                </div>

                {/* Tag Visual Requerido de Geolocalización */}
                <div className="mb-3 bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-xs text-emerald-900 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold block">
                      [Metadatos de geolocalización detectados: Lat -32.8891, Long -68.8453 - Verificado en Polígono Oficial]
                    </span>
                    <span className="text-[11px] text-emerald-700 mt-0.5 block">
                      Las imágenes adjuntas han sido validadas dentro del cuadrante catastral de la Ciudad de Mendoza correspondiente al domicilio fiscal.
                    </span>
                  </div>
                </div>

                {/* Lista de Fotos Subidas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {uploadedPhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0072BB] flex items-center justify-center shrink-0">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-semibold text-gray-900 truncate">
                            {photo.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                            <span>{photo.size}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold">{photo.status}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded"
                        title="Eliminar foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selección Múltiple de Líneas de Asistencia Prioritaria */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Líneas de Asistencia Prioritaria Solicitadas:
                  </label>
                  <span className="text-[11px] text-[#0072BB] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Selección múltiple permitida ({suggestedAssistance.length} seleccionada{suggestedAssistance.length > 1 ? 's' : ''})
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 mb-3">
                  Marque todos los instrumentos o servicios de asistencia estatal que requiere para la reactivación de su local:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {assistanceOptions.map((opt) => {
                    const isSelected = suggestedAssistance.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleToggleAssistance(opt.id)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isSelected
                            ? 'border-[#0072BB] bg-blue-50/70 shadow-xs ring-1 ring-[#0072BB]/40'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // Manejado por onClick del contenedor
                          className="mt-1 h-4 w-4 rounded text-[#0072BB] border-gray-300 focus:ring-[#0072BB] shrink-0 cursor-pointer pointer-events-none"
                        />
                        <div className="space-y-1">
                          <span className={`text-xs font-bold block leading-snug ${isSelected ? 'text-[#0B2341]' : 'text-gray-900'}`}>
                            {opt.title}
                          </span>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            {opt.desc}
                          </p>
                          <span className="inline-block text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {opt.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <span className="text-[11px] text-gray-500 mt-2 block">
                  * La determinación y combinación final de los instrumentos quedará sujeta a la evaluación técnica de daño realizada por Defensa Civil y la Municipalidad.
                </span>
              </div>
            </div>
          )}

          {/* PASO 3: DECLARACIÓN JURADA Y ENVÍO */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Resumen del Trámite */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3 text-xs sm:text-sm">
                <h4 className="font-bold text-[#0B2341] text-base border-b border-gray-200 pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0072BB]" />
                  Resumen de la Solicitud Ingresada
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 block">Comercio Titular:</span>
                    <span className="font-bold text-gray-900">{business.razonSocial} (CUIT {business.cuit})</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Domicilio Fiscal:</span>
                    <span className="font-medium text-gray-800">{business.direccion}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Evento Denunciado:</span>
                    <span className="font-bold text-gray-900">{contingencyType} ({incidentDate} a las {incidentTime} hs)</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block mb-1">Líneas de Asistencia Solicitadas ({suggestedAssistance.length}):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedAssistance.map((item, idx) => (
                        <span key={idx} className="bg-blue-100 text-[#0072BB] font-bold text-xs px-2.5 py-1 rounded-md border border-blue-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0072BB]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block">Evidencia Gráfica Georreferenciada:</span>
                    <span className="font-medium text-emerald-800">{uploadedPhotos.length} archivos fotográficos validados con GPS dentro del ejido municipal.</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block">Descripción Sintética:</span>
                    <p className="bg-white p-2.5 rounded border border-gray-200 text-gray-700 italic">
                      "{damageDescription}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Advertencia Mandatoria de la Lógica de Negocio */}
              <div className="bg-amber-50 border-l-4 border-[#EF6C00] p-4 rounded-r-xl text-xs sm:text-sm text-amber-950">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#EF6C00] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-900">
                      Aviso Importante sobre la Decisión de Asistencia:
                    </p>
                    <p className="mt-1 leading-relaxed">
                      "El nivel oficial de afectación y la aprobación del beneficio serán determinados exclusivamente por peritaje técnico de Defensa Civil y la Municipalidad de Mendoza."
                    </p>
                    <p className="text-[11px] text-amber-800 mt-1">
                      El presente sistema no gestiona desembolsos de fondos ni asignaciones automáticas; actúa como ventanilla única de interoperabilidad y derivación.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkbox Obligatorio de Declaración Jurada */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={swornStatement}
                    onChange={(e) => setSwornStatement(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded text-[#0072BB] border-gray-300 focus:ring-[#0072BB]"
                  />
                  <div className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900 block mb-0.5">
                      Declaración Jurada de Veracidad de la Información (Ley 25.326)
                    </span>
                    Declaro bajo juramento que los datos vertidos en este formulario, los daños descritos y el material fotográfico adjunto corresponden fielmente a los hechos acontecidos en el establecimiento indicado. Quedo notificado de las sanciones civiles y penales aplicables por falsedad de declaración pública y autorizo la inspección ocular presencial por parte de peritos municipales.
                  </div>
                </label>
              </div>

            </div>
          )}

        </div>

        {/* Footer / Botones de Navegación del Wizard */}
        <div className="bg-gray-50 px-3 sm:px-8 py-3.5 sm:py-4 border-t border-gray-100 flex items-center justify-between gap-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => { setValidationError(''); setStep(step - 1); }}
              className="inline-flex items-center gap-1 sm:gap-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 px-2.5 sm:px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Anterior</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-2 sm:px-3 py-2 shrink-0"
            >
              Cancelar
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0072BB] hover:bg-[#005a96] text-white font-bold px-3.5 sm:px-5 py-2.5 rounded-lg text-xs shadow-sm transition-all focus:ring-2 focus:ring-[#0072BB]/50 hover:translate-x-0.5"
            >
              <span>Continuar al Paso {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!swornStatement}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-4 sm:px-6 py-2.5 rounded-lg text-xs shadow-md transition-all focus:ring-2 focus:ring-[#2E7D32]/50 hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Confirmar y Enviar</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

