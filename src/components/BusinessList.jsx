import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  AlertOctagon, 
  FileText, 
  PlusCircle, 
  ExternalLink, 
  MapPin, 
  ShieldAlert, 
  ArrowRight, 
  Info, 
  CreditCard, 
  CheckCircle2, 
  Clock,
  Landmark,
  Scale,
  Ban
} from 'lucide-react';

export default function BusinessList({ 
  businesses, 
  claims = [], 
  onStartClaim, 
  onOpenAssociateModal,
  onResolveDebt 
}) {
  const [selectedDebtBusiness, setSelectedDebtBusiness] = useState(null);
  const [regularizing, setRegularizing] = useState(false);

  const handleSimulatePayment = (businessId) => {
    setRegularizing(true);
    setTimeout(() => {
      onResolveDebt(businessId);
      setRegularizing(false);
      setSelectedDebtBusiness(null);
    }, 1200);
  };

  // Helper para determinar el ente y color según el bloqueo
  const getBlockOrganismInfo = (biz) => {
    const motivo = biz.motivoBloqueo || '';
    if (motivo.includes('ATM') || motivo.includes('Provincial') || motivo.includes('Fiscal')) {
      return {
        badgeBg: 'bg-red-100 text-red-900 border-red-300',
        portalTitle: 'Administración Tributaria Mendoza (ATM)',
        buttonText: 'Regularizar en ATM Mendoza',
        icon: Landmark
      };
    }
    if (motivo.includes('Municipal') || motivo.includes('Tasas') || motivo.includes('Servicios')) {
      return {
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        portalTitle: 'Dirección de Rentas - Municipalidad de Mendoza',
        buttonText: 'Regularizar en Municipalidad',
        icon: Scale
      };
    }
    return {
      badgeBg: 'bg-red-100 text-red-900 border-red-300',
      portalTitle: 'Gestión Tributaria y Habilitaciones',
      buttonText: 'Regularizar Deuda / Situación',
      icon: ShieldAlert
    };
  };

  return (
    <div className="w-full">
      {/* Encabezado y Acción Superior */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b-2 border-gray-300 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2341]">
            Mis Comercios y Locales Registrados ({businesses.length})
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Verifique la situación tributaria y habilitación municipal de sus establecimientos para gestionar asistencia ante emergencias.
          </p>
        </div>
        <button
          onClick={onOpenAssociateModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a96] text-white font-bold px-5 py-2.5 rounded-lg shadow-md transition-all focus:ring-2 focus:ring-[#0072BB]/50 text-sm shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          + Asociar Nuevo Comercio
        </button>
      </div>

      {/* Cuadro Explicativo de la Política Pública / Regla de Negocio */}
      <div className="mb-6 bg-blue-50/90 border-2 border-blue-200 border-l-4 border-l-[#0072BB] p-4 rounded-xl shadow-xs text-sm text-[#0B2341]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#0072BB] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-950">
              Criterio de Elegibilidad e Interoperabilidad (ATM Mendoza y Ciudad de Mendoza)
            </p>
            <p className="text-gray-700 text-xs sm:text-sm mt-0.5 leading-relaxed">
              Para acceder a los beneficios del programa de asistencia por siniestros climáticos (subsidios, desgravación de tasas o créditos blandos), el local debe encontrarse <strong>libre de deudas exigibles</strong> en Ingresos Brutos (ATM), contar con <strong>habilitación comercial vigente</strong> y encontrarse al día en el <strong>Padrón de Comercio e Higiene Municipal</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Comercios con Recuadros Marcados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {businesses.map((biz) => {
          const bizClaims = claims.filter(c => c.businessId === biz.id);
          const hasPendingClaim = bizClaims.length > 0;
          const isHabilitado = !biz.tieneDeuda && (biz.estado === 'HABILITADO' || biz.estadoFiscal === 'HABILITADO');
          const blockInfo = getBlockOrganismInfo(biz);
          const OrganismIcon = blockInfo.icon;

          return (
            <div 
              key={biz.id}
              className={`bg-white rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-md ${
                !isHabilitado 
                  ? 'border-red-300 hover:border-red-400 hover:shadow-lg' 
                  : 'border-slate-300 hover:border-[#0072BB] hover:shadow-lg'
              }`}
            >
              {/* Encabezado de la Tarjeta */}
              <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                      !isHabilitado 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-blue-50 text-[#0072BB] border-blue-200'
                    }`}>
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      {biz.nombreFantasia && (
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0072BB] block mb-0.5">
                          {biz.nombreFantasia}
                        </span>
                      )}
                      <h3 className="font-extrabold text-base sm:text-lg text-gray-950 leading-tight">
                        {biz.razonSocial}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-0.5 text-xs text-gray-500 font-mono mt-1 font-medium">
                        <span>CUIT: {biz.cuit}</span>
                        {biz.padronMunicipal && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-sans font-bold">
                            Padrón Mun. N° {biz.padronMunicipal}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Badges de Estado */}
                  <div className="self-start sm:self-auto shrink-0">
                    {isHabilitado ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-2xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Sin deudas / Apto trámite
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-100 text-red-800 border-2 border-red-300 shadow-2xs">
                        <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
                        BLOQUEADO
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub-badge de Motivo de Bloqueo si aplica */}
                {!isHabilitado && biz.motivoBloqueo && (
                  <div className="mb-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${blockInfo.badgeBg}`}>
                      <OrganismIcon className="w-3 h-3" />
                      Causa: {biz.motivoBloqueo}
                    </span>
                  </div>
                )}

                {/* Datos del Comercio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-3 text-xs border-y-2 border-gray-100 my-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="truncate font-medium">{biz.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="font-medium truncate">{biz.rubro}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-bold text-gray-800">Habilitación:</span> {biz.habilitacion || `Padrón ${biz.padronMunicipal}`}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-bold text-gray-800">Estado Fiscal:</span>{' '}
                    <span className={!isHabilitado ? 'text-red-700 font-extrabold' : 'text-emerald-700 font-extrabold'}>
                      {biz.estado || biz.estadoFiscal}
                    </span>
                  </div>
                </div>

                {/* Banner de Deuda en Caso de Inhabilitación con Borde Marcado */}
                {!isHabilitado && biz.detalleDeuda && (
                  <div className="bg-red-50/90 border-2 border-red-300 rounded-xl p-3.5 my-2 text-xs">
                    <div className="flex items-center gap-2 text-red-900 font-bold mb-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Inconsistencias y Deudas Exigibles Registradas:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-red-950 ml-1">
                      {biz.detalleDeuda.map((item, idx) => (
                        <li key={idx} className="leading-relaxed font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expedientes Previos Presentados */}
                {hasPendingClaim && (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3.5 my-2 text-xs">
                    <div className="flex items-center justify-between text-amber-900 font-semibold">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Expediente en curso: <strong>{bizClaims[0].trackingCode}</strong></span>
                      </div>
                      <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
                        {bizClaims[0].status}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Botonera Inferior con Regla Estricta: Solo Comercio 1 Habilitado */}
              <div className="bg-gray-50 px-4 sm:px-6 py-3.5 sm:py-4 border-t-2 border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                {!isHabilitado ? (
                  <>
                    <button
                      onClick={() => setSelectedDebtBusiness(biz)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-900 hover:underline cursor-pointer py-1"
                    >
                      <CreditCard className="w-4 h-4 shrink-0" />
                      {blockInfo.buttonText}
                    </button>
                    <button
                      disabled
                      title="Debe regularizar las deudas tributarias o administrativas para iniciar la solicitud de asistencia"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-400 font-bold px-4 py-2.5 rounded-lg text-xs cursor-not-allowed border border-gray-300"
                    >
                      <Ban className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>Iniciar Solicitud por Daños</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-emerald-700 font-bold flex items-center justify-center sm:justify-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Legajo habilitado para trámite
                    </span>
                    <button
                      onClick={() => onStartClaim(biz)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a96] text-white font-bold px-5 py-2.5 rounded-lg text-xs shadow-md transition-all focus:ring-2 focus:ring-[#0072BB]/50 hover:translate-x-0.5 cursor-pointer"
                    >
                      <span>Iniciar Solicitud por Daños</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Interactivo de Regularización Fiscal y Administrativa */}
      {selectedDebtBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-gray-300">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 text-red-800">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-base">
                  {getBlockOrganismInfo(selectedDebtBusiness).portalTitle}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedDebtBusiness(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 text-xs sm:text-sm text-gray-600 space-y-3">
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Contribuyente / Establecimiento:</span>
                <p className="font-extrabold text-gray-900 text-sm">
                  {selectedDebtBusiness.razonSocial}
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  CUIT: {selectedDebtBusiness.cuit} • Padrón Municipal: {selectedDebtBusiness.padronMunicipal}
                </p>
              </div>

              {selectedDebtBusiness.motivoBloqueo && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 font-medium">
                  <strong>Motivo Administrativo:</strong> {selectedDebtBusiness.motivoBloqueo}
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200 space-y-2 text-xs">
                <p className="font-bold text-gray-800">Conceptos e Inconsistencias a Regularizar:</p>
                {selectedDebtBusiness.detalleDeuda?.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-800">
                    <span className="text-red-600 font-bold">•</span>
                    <span className="font-medium leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-[#0072BB] p-3 rounded-r text-xs text-blue-900 border border-blue-200">
                <p className="font-semibold">Mecanismo de Desbloqueo Inmediato:</p>
                <p className="mt-0.5">
                  Una vez cancelada la obligación o consolidado el plan de facilidades, el sistema provincial actualiza automáticamente la constancia de cumplimiento a <strong>"HABILITADO"</strong> para permitir la tramitación de asistencia.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedDebtBusiness(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                disabled={regularizing}
                onClick={() => handleSimulatePayment(selectedDebtBusiness.id)}
                className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-md cursor-pointer"
              >
                {regularizing ? (
                  <>
                    <span className="inline-block animate-spin">🌀</span>
                    <span>Procesando acreditación en organismos...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Confirmar Pago / Regularizar Situación</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
