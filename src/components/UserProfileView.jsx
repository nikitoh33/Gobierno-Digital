import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Building2, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Lock, 
  CheckCircle2, 
  Printer, 
  ExternalLink,
  CreditCard,
  AlertOctagon,
  ShieldAlert,
  Hash,
  Trash2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function UserProfileView({ 
  user, 
  businesses = [], 
  onBack, 
  onDeleteBusiness,
  onResetBusinesses 
}) {
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const confirmDelete = () => {
    if (businessToDelete && onDeleteBusiness) {
      onDeleteBusiness(businessToDelete.id);
      setBusinessToDelete(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Barra de Retorno y Título */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-300">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0072BB] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la Ventanilla Principal
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2341]">
            Perfil del Ciudadano y Contribuyente
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Registro Oficial de Identidad Digital Unificada (Mi Argentina / ARCA / ATM Mendoza)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {onResetBusinesses && (
            <button
              onClick={onResetBusinesses}
              className="inline-flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="Restablecer a los 2 comercios por defecto"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
              <span>Restablecer Locales Base</span>
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-700 font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-gray-500" />
            <span>Imprimir Constancia</span>
          </button>
        </div>
      </div>

      {/* Tarjeta Principal de Identidad */}
      <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-md overflow-hidden">
        <div className="bg-[#0B2341] text-white p-4 sm:p-8 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-white/20 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-inner shrink-0">
              {user.nombre.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h2 className="text-lg sm:text-2xl font-bold">{user.nombre}</h2>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Identidad Validada (Nivel 3)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-mono mt-1">
                CUIL: {user.cuil} • DNI: {user.dni}
              </p>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5">
                {user.condicionFiscal} • Domicilio Fiscal Electrónico
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 sm:p-3.5 border border-white/15 text-xs text-gray-200 w-full sm:w-auto min-w-[200px] text-left">
            <span className="text-blue-300 font-bold block mb-1">Estado de Cuenta Oficial</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-white">Activo y Habilitado</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-300 mt-1 block">
              Validación Biométrica Renaper
            </span>
          </div>
        </div>

        {/* Grilla de Datos Personales y Fiscales */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          
          {/* Sección 1: Datos Personales */}
          <div>
            <h3 className="text-sm font-bold text-[#0B2341] uppercase tracking-wider mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
              <User className="w-4 h-4 text-[#0072BB]" />
              Datos Personales Registrados (Renaper / Registro Civil)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <span className="text-gray-500 block mb-0.5">Nombre y Apellido:</span>
                <span className="font-bold text-gray-900 text-sm">{user.nombre}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <span className="text-gray-500 block mb-0.5">CUIL / CUIT Titular:</span>
                <span className="font-mono font-bold text-gray-900 text-sm">{user.cuil}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <span className="text-gray-500 block mb-0.5">Documento Nacional de Identidad:</span>
                <span className="font-bold text-gray-900 text-sm">{user.dni}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <span className="text-gray-500 block mb-0.5">Fecha de Nacimiento:</span>
                <span className="font-medium text-gray-800">{user.fechaNacimiento}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <span className="text-gray-500 block mb-0.5">Nacionalidad:</span>
                <span className="font-medium text-gray-800">{user.nacionalidad}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                <span className="text-gray-500 block mb-0.5">Domicilio Real Declarado:</span>
                <span className="font-medium text-gray-800">{user.direccionReal}</span>
              </div>
            </div>
          </div>

          {/* Sección 2: Situación Tributaria e Impositiva */}
          <div>
            <h3 className="text-sm font-bold text-[#0B2341] uppercase tracking-wider mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
              <FileText className="w-4 h-4 text-[#0072BB]" />
              Situación Fiscal e Impositiva (ARCA / ATM Mendoza)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Condición Impositiva General:</span>
                  <span className="font-bold text-[#0B2341] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {user.condicionFiscal}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Domicilio Fiscal Electrónico:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {user.domicilioFiscalElectronico}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Fecha de Alta Tributaria:</span>
                  <span className="font-medium text-gray-800">{user.fechaAltaAfip}</span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                <span className="text-gray-500 font-semibold block">Actividad Económica Principal Declarada:</span>
                <p className="font-bold text-gray-900 leading-snug">
                  {user.actividadPrincipal}
                </p>
                <span className="text-[11px] text-gray-500 block">
                  Jurisdicción: Sede 913 - Mendoza Capital
                </span>
              </div>
            </div>
          </div>

          {/* Sección 3: Comercios y Establecimientos Registrados con Opción de Borrar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-gray-200 pb-2 mb-4 gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#0B2341] uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0072BB]" />
                  Comercios y Locales Registrados ({businesses.length})
                </h3>
                <span className="text-xs text-gray-500">
                  Gestión del padrón comercial municipal asociado a su CUIT/CUIL
                </span>
              </div>
            </div>

            {businesses.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-gray-500 space-y-2">
                <Building2 className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="font-bold text-gray-700 text-sm">No posee comercios asociados actualmente.</p>
                <p>Puede vincular un nuevo establecimiento por CUIT desde la pantalla principal o restaurar los comercios base.</p>
                {onResetBusinesses && (
                  <button
                    onClick={onResetBusinesses}
                    className="mt-2 inline-flex items-center gap-1.5 bg-[#0072BB] text-white px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restablecer 2 Comercios Iniciales
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {businesses.map((biz) => {
                  const isBlocked = biz.tieneDeuda || biz.estado === 'BLOQUEADO' || biz.estadoFiscal === 'BLOQUEADO';
                  return (
                    <div 
                      key={biz.id}
                      className={`p-4 rounded-xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                        isBlocked 
                          ? 'border-red-300 bg-red-50/40' 
                          : 'border-emerald-300 bg-emerald-50/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {biz.nombreFantasia && (
                            <span className="text-xs font-bold text-[#0072BB] uppercase">
                              {biz.nombreFantasia} •
                            </span>
                          )}
                          <h4 className="font-extrabold text-sm text-gray-950">{biz.razonSocial}</h4>
                          {isBlocked ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">
                              <AlertOctagon className="w-3 h-3" /> Bloqueado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Habilitado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">
                          CUIT: <span className="font-mono font-semibold">{biz.cuit}</span> • Padrón Municipal: <strong>{biz.padronMunicipal}</strong> • {biz.direccion}
                        </p>
                        <p className="text-xs text-gray-500">
                          Rubro: {biz.rubro} • Habilitación: {biz.habilitacion || `Exp. ${biz.padronMunicipal}-M`}
                        </p>
                        {biz.motivoBloqueo && (
                          <p className="text-[11px] font-bold text-red-800 bg-red-100 border border-red-200 inline-block px-2 py-0.5 rounded mt-0.5">
                            Causa: {biz.motivoBloqueo}
                          </p>
                        )}
                      </div>

                      {/* Botón de Borrado / Desvinculación */}
                      <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-center">
                        <button
                          type="button"
                          onClick={() => setBusinessToDelete(biz)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-red-700 hover:text-red-900 bg-white hover:bg-red-50 border border-red-300 font-bold px-3 py-2 sm:py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                          title="Eliminar o desvincular este comercio del perfil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Desvincular Comercio</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sección 4: Canales de Notificación y Contacto Seguro */}
          <div>
            <h3 className="text-sm font-bold text-[#0B2341] uppercase tracking-wider mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
              <Mail className="w-4 h-4 text-[#0072BB]" />
              Canales de Contacto y Notificaciones Electrónicas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500 block text-[11px]">Correo Electrónico Notificaciones:</span>
                    <span className="font-semibold text-gray-900">{user.email}</span>
                  </div>
                </div>
                <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded text-[10px]">
                  Verificado
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500 block text-[11px]">Teléfono Celular de Contacto:</span>
                    <span className="font-semibold text-gray-900">{user.telefono}</span>
                  </div>
                </div>
                <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded text-[10px]">
                  Verificado
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer de la Tarjeta */}
        <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t-2 border-gray-200 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-gray-900 bg-white border-2 border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la Ventanilla Principal
          </button>

          <span className="text-xs text-gray-500">
            Última sincronización de registros: <strong>30/10/2026</strong>
          </span>
        </div>

      </div>

      {/* Modal de Confirmación de Borrado */}
      {businessToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-gray-300">
            <div className="flex items-center gap-3 text-red-700 pb-3 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900">¿Desvincular Comercio?</h4>
                <p className="text-xs text-gray-500">Acción de actualización del padrón</p>
              </div>
            </div>

            <div className="my-4 text-xs text-gray-600 space-y-2">
              <p>
                Está a punto de remover el comercio <strong>{businessToDelete.razonSocial}</strong> (CUIT: {businessToDelete.cuit}) de su panel de establecimientos.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                Esta acción lo quitará de la lista activa de comercios administrados en su sesión. Puede volver a asociarlo cuando desee con su CUIT.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setBusinessToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmar Desvinculación</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
