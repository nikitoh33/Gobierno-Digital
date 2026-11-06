import React, { useState } from 'react';
import { User, ShieldCheck, ChevronDown, AlertTriangle, ArrowRight, LogOut } from 'lucide-react';
import { mockUser } from '../data/mockData';

export default function Header({ user = mockUser, onGoHome, onOpenProfile, onLogout }) {
  const [showUserPopover, setShowUserPopover] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b-2 border-gray-300 sticky top-0 z-50 print:hidden">
      {/* Franja de Alerta Climática Superior */}
      <div className="bg-[#EF6C00] text-white py-1.5 sm:py-2 px-3 sm:px-4 text-[11px] sm:text-xs md:text-sm font-semibold flex items-center justify-between border-b border-amber-600">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 leading-snug">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-200"></span>
            </span>
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-200 shrink-0" />
            <span>
              <strong>ALERTA METEOROLÓGICA:</strong> Nivel Naranja por <strong>Viento Zonda</strong> en el Gran Mendoza.
            </span>
          </div>
          <span className="hidden md:inline-block bg-black/20 text-yellow-100 px-2.5 py-0.5 rounded text-xs shrink-0">
            Defensa Civil Mendoza - Emergencias 103
          </span>
        </div>
      </div>

      {/* Header Institucional Principal Estilo Argentina.gob.ar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          
          {/* Logo y Título Institucional - Click lleva al inicio */}
          <button 
            onClick={onGoHome}
            className="flex items-center gap-2.5 sm:gap-4 text-left group cursor-pointer focus:outline-none rounded-lg p-1 hover:bg-gray-50 transition-colors shrink min-w-0"
            title="Ir al inicio de la Ventanilla Digital"
          >
            <img 
              src="/escudo.svg" 
              alt="Escudo de la República Argentina" 
              className="h-8 sm:h-12 w-auto object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col border-l-2 border-gray-300 pl-2.5 sm:pl-4 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#0B2341]">
                  Argentina<span className="text-[#0072BB]">.gob.ar</span>
                </span>
                <span className="text-[10px] sm:text-xs bg-blue-100 text-[#0072BB] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full hidden xs:inline-block">
                  Oficial
                </span>
              </div>
              <span className="text-[11px] sm:text-sm font-medium text-gray-600 tracking-normal truncate">
                MendoRecupera <span className="text-gray-400">|</span> Ciudad de Mendoza
              </span>
            </div>
          </button>

          {/* Cápsula de Usuario con Popover */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowUserPopover(!showUserPopover)}
              className="flex items-center gap-2 sm:gap-2.5 bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 rounded-full py-1 sm:py-1.5 px-2.5 sm:px-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0072BB]/50 cursor-pointer shadow-xs"
              aria-label="Menú de usuario"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B2341] text-white flex items-center justify-center font-bold text-xs shadow-inner shrink-0">
                {user.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-gray-900 leading-tight">
                  {user.nombre}
                </p>
                <p className="text-[11px] text-gray-500 font-mono leading-tight">
                  CUIL: {user.cuil}
                </p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${showUserPopover ? 'rotate-180' : ''}`} />
            </button>

            {/* Popover de Datos Personales */}
            {showUserPopover && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl border-2 border-gray-300 py-3 px-4 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#0072BB] text-white flex items-center justify-center font-bold text-sm">
                    {user.nombre.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{user.nombre}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      <ShieldCheck className="w-3 h-3" /> Identidad Digital Validada
                    </span>
                  </div>
                </div>

                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">CUIL / CUIT Titular:</span>
                    <span className="font-mono font-bold text-gray-900">{user.cuil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Condición Fiscal:</span>
                    <span className="font-bold text-gray-900">{user.condicionFiscal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jurisdicción:</span>
                    <span className="font-medium text-gray-800">{user.ciudad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nivel de Seguridad:</span>
                    <span className="font-bold text-emerald-600">Nivel 3 (Mi Argentina)</span>
                  </div>
                </div>

                <div className="pt-2 border-t-2 border-gray-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setShowUserPopover(false);
                      onOpenProfile();
                    }}
                    className="w-full text-center py-2 px-3 text-xs font-bold text-white bg-[#0072BB] hover:bg-[#005a96] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Ver Mi Perfil Completo</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  {onLogout && (
                    <button
                      onClick={() => {
                        setShowUserPopover(false);
                        onLogout();
                      }}
                      className="w-full text-center py-2 px-3 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Cerrar sesión actual"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-600" />
                      <span>Cerrar Sesión</span>
                    </button>
                  )}

                  <button 
                    onClick={() => setShowUserPopover(false)}
                    className="w-full text-center py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cerrar menú
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-barra Institucional y Estado del Sistema */}
      <div className="bg-[#0B2341] text-white py-2 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Programa Provincial de Emergencia y Reactivación Productiva</span>
            <span className="text-gray-400">/</span>
            <span className="text-cyan-300 font-medium">Resolución Ministerial N° 451/2026</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Sistema Oficial en Línea
            </span>
            <span className="text-gray-400">Gobierno de Mendoza • Ciudad de Mendoza</span>
          </div>
        </div>
      </div>
    </header>
  );
}
