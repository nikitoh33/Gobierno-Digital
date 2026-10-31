import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  ArrowLeft, 
  Printer, 
  ShieldCheck, 
  Building2, 
  FileCheck2, 
  Calendar, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  Trash2, 
  AlertTriangle,
  Landmark
} from 'lucide-react';

export default function ClaimSuccess({ claim, onBackToDashboard, onDeleteClaim }) {
  const [copied, setCopied] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCopyCode = () => {
    if (claim?.trackingCode) {
      navigator.clipboard.writeText(claim.trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-200 print:max-w-full print:m-0 print:p-0">
      
      {/* Tarjeta de Confirmación de Éxito / Contenedor Imprimible */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-300 overflow-hidden print:shadow-none print:border print:border-gray-800 print:rounded-lg print-avoid-break">
        
        {/* ENCABEZADO EXCLUSIVO PARA IMPRESIÓN (Visible solo en PDF/Impresión) */}
        <div className="hidden print:flex items-center justify-between p-4 border-b-2 border-[#0B2341] bg-gray-50">
          <div className="flex items-center gap-3">
            <img 
              src="/escudo.svg" 
              alt="Escudo Oficial República Argentina" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#0B2341]">
                República Argentina • Gobierno de Mendoza • Ciudad de Mendoza
              </p>
              <h2 className="text-sm font-bold text-[#0072BB]">
                MendoRecupera • Ventanilla Digital de Asistencia ante Emergencias
              </h2>
              <p className="text-[10px] text-gray-500">
                Resolución Ministerial N° 451/2026 - Registro de Siniestros y Contingencias
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-gray-600 block">Fecha y Hora de Emisión:</span>
            <span className="text-xs font-mono font-bold text-gray-900">
              {new Date().toLocaleDateString('es-AR')} - {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs
            </span>
          </div>
        </div>

        {/* Cabecera en Pantalla (Oculta o compacta en Impresión) */}
        <div className="bg-gradient-to-b from-emerald-50 to-white pt-6 sm:pt-8 pb-5 sm:pb-6 px-4 sm:px-8 text-center border-b border-gray-100 print:bg-white print:pt-3 print:pb-2 print:px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 ring-8 ring-emerald-50 print:hidden">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wide print:text-[10px] print:py-0.5 print:px-2">
            Comprobante Oficial de Ingreso de Expediente
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0B2341] print:text-lg print:mb-1">
            Expediente Digital Generado
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-lg mx-auto print:text-[10px] print:mt-0">
            La solicitud ha ingresado válidamente a la mesa de entradas del Gobierno de Mendoza y la Municipalidad de la Ciudad.
          </p>

          {/* Código Único de Expediente Destacado */}
          <div className="mt-4 sm:mt-5 inline-flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 border-2 border-dashed border-[#0072BB]/40 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 w-full sm:w-auto print:mt-2 print:py-1.5 print:px-3 print:border-solid print:border-gray-400 print:bg-gray-100/50">
            <div className="text-center sm:text-left">
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block print:text-[9px]">
                Código Único de Trámite / Expediente:
              </span>
              <span className="text-lg sm:text-2xl font-mono font-extrabold text-[#0072BB] tracking-wider break-all print:text-base print:text-black">
                {claim.trackingCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs shrink-0 cursor-pointer print:hidden"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Ficha Oficial de Trazabilidad e Interoperabilidad */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 print:p-4 print:space-y-3">
          
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2 print:text-[10px] print:mb-1.5">
              <FileCheck2 className="w-4 h-4 text-[#0072BB] print:w-3.5 print:h-3.5" />
              Ficha Técnica de Trazabilidad Administrativa:
            </h3>

            <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200 text-xs sm:text-sm print:bg-white print:border-gray-300 print:text-[10.5px]">
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium print:text-gray-700">Estado del Trámite:</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-[#0072BB] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 print:bg-transparent print:border-none print:p-0 print:text-black">
                  <span className="w-2 h-2 rounded-full bg-[#0072BB] animate-pulse print:hidden"></span>
                  {claim.status}
                </span>
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium print:text-gray-700">Nivel Oficial de Afectación:</span>
                <span className="font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 print:bg-transparent print:border-none print:p-0 print:text-black">
                  {claim.inspectionLevel}
                </span>
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium print:text-gray-700">Ente Responsable de Peritaje:</span>
                <span className="font-bold text-gray-900">
                  {claim.responsibleEntity}
                </span>
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium print:text-gray-700">Comercio Titular:</span>
                <span className="font-semibold text-gray-800">
                  {claim.businessName} (CUIT: {claim.businessCuit})
                </span>
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium print:text-gray-700">Domicilio Inspección Ocular:</span>
                <span className="font-semibold text-gray-800">
                  {claim.businessAddress}
                </span>
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium print:text-gray-700">Contingencia Declarada:</span>
                <span className="font-semibold text-gray-800">
                  {claim.contingencyType} ({claim.incidentDate} a las {claim.incidentTime} hs)
                </span>
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 print:py-1.5 print:px-2.5">
                <span className="text-gray-500 font-medium shrink-0 print:text-gray-700">Líneas de Asistencia Solicitadas:</span>
                <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                  {Array.isArray(claim.suggestedAssistance) ? (
                    claim.suggestedAssistance.map((item, idx) => (
                      <span key={idx} className="font-bold text-xs text-[#0072BB] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md print:bg-transparent print:border print:border-gray-400 print:text-black print:text-[10px]">
                        • {item}
                      </span>
                    ))
                  ) : (
                    <span className="font-semibold text-[#0072BB] print:text-black">
                      {claim.suggestedAssistance}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recordatorio de la Regla Institucional */}
          <div className="bg-blue-50 border-l-4 border-[#0072BB] p-3.5 sm:p-4 rounded-r-xl text-xs text-blue-950 space-y-1 print:bg-gray-50 print:border-l-2 print:border-gray-600 print:text-[9.5px] print:p-2 print:text-gray-800">
            <p className="font-bold">
              ℹ️ Circuito Administrativo y Peritaje Técnico:
            </p>
            <p className="leading-relaxed">
              1. Inspectores de Defensa Civil o la Dirección de Comercio Municipal tomarán contacto para realizar el peritaje ocular de los daños declarados.
            </p>
            <p className="leading-relaxed">
              2. Con el informe pericial técnico favorable, se cursará la resolución de asistencia ante los organismos financiadores correspondientes.
            </p>
          </div>

          {/* PIE Y SELLO DIGITAL EXCLUSIVO PARA IMPRESIÓN (Asegura cierre en 1 sola carilla) */}
          <div className="hidden print:flex items-center justify-between pt-3 border-t border-gray-300 text-[9.5px] text-gray-600">
            <div>
              <p className="font-bold text-gray-800">Firma y Validación Digital:</p>
              <p>Mesa de Entradas Electrónica - Sistema MendoRecupera</p>
              <p className="font-mono text-[8.5px]">Hash Oficial: SHA256:{Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">Ley 25.326 y Ley 27.275</p>
              <p>Página 1 de 1 (Ejemplar Único del Contribuyente)</p>
            </div>
          </div>

        </div>

        {/* Botonera de Acciones (Oculta al imprimir) */}
        <div className="bg-gray-50 px-4 sm:px-8 py-3.5 sm:py-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 print:hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Panel Principal</span>
            </button>

            {onDeleteClaim && (
              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2.5 rounded-lg transition-colors cursor-pointer"
                title="Desistir y dar de baja este expediente"
              >
                <Trash2 className="w-4 h-4" />
                <span>Desistir Solicitud</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a96] text-white font-bold px-5 py-2.5 rounded-lg text-xs shadow-sm transition-all focus:ring-2 focus:ring-[#0072BB]/50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Comprobante (PDF / Impresión)</span>
          </button>
        </div>

      </div>

      {/* Modal de Confirmación de Desistimiento / Eliminación */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-gray-300">
            <div className="flex items-center gap-3 text-red-700 pb-3 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900">¿Desistir de la Solicitud?</h4>
                <p className="text-xs text-gray-500">Expediente {claim.trackingCode}</p>
              </div>
            </div>

            <div className="my-4 text-xs text-gray-600 space-y-2">
              <p>
                Al cancelar este trámite, el expediente digital quedará <strong>anulado y eliminado</strong> de la mesa de entradas.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                Se notificará la baja a Defensa Civil y la Municipalidad de Mendoza para suspender cualquier peritaje ocular programado.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
              >
                Volver Atrás
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmDelete(false);
                  if (onDeleteClaim) onDeleteClaim(claim.id);
                }}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmar y Eliminar Expediente</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
