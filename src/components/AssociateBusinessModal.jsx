import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  X,
  FileCheck,
  UserCheck
} from 'lucide-react';
import { publicRecordsDatabase, mockUser } from '../data/mockData';

export default function AssociateBusinessModal({ isOpen, onClose, onAddBusiness }) {
  const [habilitacionInput, setHabilitacionInput] = useState('11045');
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: ARCA, 2: ATM, 3: Municipal, 4: Done
  const [isSearching, setIsSearching] = useState(false);
  const [foundBusiness, setFoundBusiness] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleValidate = () => {
    setErrorMessage('');
    setFoundBusiness(null);
    setIsSearching(true);
    setCurrentStep(1);

    // Paso 1: ARCA (ex-AFIP)
    setTimeout(() => {
      setCurrentStep(2);

      // Paso 2: ATM Mendoza
      setTimeout(() => {
        setCurrentStep(3);

        // Paso 3: Padrón Municipal
        setTimeout(() => {
          setCurrentStep(4);
          setIsSearching(false);

          const cleanInput = habilitacionInput.trim();
          
          // Buscar coincidencia en la base de datos pública por padrón o habilitación
          const match = publicRecordsDatabase.find(
            b => b.padronMunicipal === cleanInput || 
                 b.habilitacion.toLowerCase().includes(cleanInput.toLowerCase())
          );

          if (match) {
            setFoundBusiness({
              id: `com-${Date.now()}`,
              razonSocial: match.razonSocial,
              nombreFantasia: match.nombreFantasia,
              cuit: match.cuit,
              padronMunicipal: match.padronMunicipal,
              direccion: match.direccion,
              rubro: match.rubro,
              habilitacion: match.habilitacion,
              estado: "HABILITADO",
              estadoFiscal: "HABILITADO",
              tieneDeuda: false,
              antiguedad: "5 años",
              superficie: "140 m²"
            });
          } else {
            // Generar comercio dinámico válido con el número de habilitación ingresado
            setFoundBusiness({
              id: `com-${Date.now()}`,
              razonSocial: "Comercial Centro & Distribuidora Mendoza S.R.L.",
              nombreFantasia: "Distribuidora Mendoza",
              cuit: "30-71999888-1",
              padronMunicipal: cleanInput || "11045",
              direccion: "Calle San Juan 780, Ciudad de Mendoza",
              rubro: "Comercio Minorista / Venta de Artículos Varios",
              habilitacion: `Expediente N° ${cleanInput}-M-2025`,
              estado: "HABILITADO",
              estadoFiscal: "HABILITADO",
              tieneDeuda: false,
              antiguedad: "3 años",
              superficie: "95 m²"
            });
          }
        }, 1000);
      }, 1000);
    }, 900);
  };

  const handleConfirmAdd = () => {
    if (foundBusiness) {
      onAddBusiness(foundBusiness);
      onClose();
      // Reset
      setCurrentStep(0);
      setFoundBusiness(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-7 shadow-2xl border-2 border-gray-300 relative">
        
        {/* Header del Modal */}
        <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-[#0072BB] flex items-center justify-center border border-blue-200 shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B2341] leading-tight">
                Asociar Nuevo Comercio por Habilitación Municipal
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Padrón Comercial de la Ciudad de Mendoza • Verificación Automática
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Titular en sesión vinculado automáticamente */}
        <div className="my-3 sm:my-4 bg-blue-50/70 border border-blue-200 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-[#0B2341]">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#0072BB] shrink-0" />
            <span>
              Titular: <strong>{mockUser.nombre}</strong> (CUIL: {mockUser.cuil})
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
            Sesión Vinculada
          </span>
        </div>

        {/* Formulario de Consulta por Habilitación Municipal */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              NÚMERO DE HABILITACIÓN MUNICIPAL / PADRÓN COMERCIAL:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={habilitacionInput}
                  onChange={(e) => setHabilitacionInput(e.target.value)}
                  placeholder="Ej: 11045 o 9932"
                  className="w-full pl-3.5 pr-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg text-sm text-gray-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BB] focus:border-transparent"
                  disabled={isSearching}
                />
              </div>
              <button
                type="button"
                onClick={handleValidate}
                disabled={isSearching || !habilitacionInput.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a96] disabled:bg-gray-300 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed shadow-xs"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Validar en Registros Públicos</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Opciones rápidas de prueba */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] text-gray-500">Padrón / Habilitación de prueba:</span>
              <button
                type="button"
                onClick={() => setHabilitacionInput('11045')}
                className="text-[11px] text-[#0072BB] hover:underline font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200 cursor-pointer"
              >
                11045 (Ferretería El Cóndor)
              </button>
              <button
                type="button"
                onClick={() => setHabilitacionInput('9932')}
                className="text-[11px] text-[#0072BB] hover:underline font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200 cursor-pointer"
              >
                9932 (Calzados Cuyo)
              </button>
            </div>
          </div>

          {/* Animación Secuencial de Interoperabilidad con Registros Públicos */}
          {currentStep > 0 && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                CANAL SEGURO DE INTEROPERABILIDAD ESTATAL:
              </p>

              {/* Paso 1: ARCA */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {currentStep > 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : currentStep === 1 ? (
                    <Loader2 className="w-4 h-4 text-[#0072BB] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                  )}
                  <span className={currentStep >= 1 ? 'font-medium text-gray-900' : 'text-gray-400'}>
                    Consultando ARCA (Valida Razón Social y Domicilio)...
                  </span>
                </div>
                {currentStep > 1 && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Identidad OK
                  </span>
                )}
              </div>

              {/* Paso 2: ATM Mendoza */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {currentStep > 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : currentStep === 2 ? (
                    <Loader2 className="w-4 h-4 text-[#0072BB] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                  )}
                  <span className={currentStep >= 2 ? 'font-medium text-gray-900' : 'text-gray-400'}>
                    Consultando ATM Mendoza (Valida Ingresos Brutos)...
                  </span>
                </div>
                {currentStep > 2 && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Sin deuda exigible
                  </span>
                )}
              </div>

              {/* Paso 3: Padrón Municipal */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {currentStep > 3 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : currentStep === 3 ? (
                    <Loader2 className="w-4 h-4 text-[#0072BB] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                  )}
                  <span className={currentStep >= 3 ? 'font-medium text-gray-900' : 'text-gray-400'}>
                    Consultando Padrón Municipal (Valida Habilitación y Libre Deuda)...
                  </span>
                </div>
                {currentStep > 3 && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Habilitado
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Resultado de la Búsqueda y Datos Recuperados */}
          {foundBusiness && (
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-xl p-4 text-xs space-y-2.5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Establecimiento Validado Exitosamente</span>
                </div>
                <span className="bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                  APTO ASOCIACIÓN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 pt-1">
                <div>
                  <span className="text-gray-500 block">Razón Social:</span>
                  <span className="font-bold text-gray-900">{foundBusiness.razonSocial}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">CUIT:</span>
                  <span className="font-mono font-semibold">{foundBusiness.cuit}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-500 block">Domicilio del Local:</span>
                  <span className="font-medium text-gray-900">{foundBusiness.direccion}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Rubro Comercial:</span>
                  <span className="font-medium">{foundBusiness.rubro}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Habilitación Municipal:</span>
                  <span className="font-medium text-emerald-800 font-bold">{foundBusiness.habilitacion}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botonera de Cierre / Confirmación */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-gray-200 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer text-center"
          >
            Cancelar
          </button>
          {foundBusiness && (
            <button
              type="button"
              onClick={handleConfirmAdd}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold px-5 py-2.5 rounded-lg text-xs shadow-md transition-all focus:ring-2 focus:ring-[#2E7D32]/50 hover:scale-[1.02] cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Confirmar y Sumar a Mis Comercios</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
