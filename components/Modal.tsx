import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className = "max-w-2xl" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div className={`relative w-full ${className} bg-void-black border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <h3 className="font-display font-bold uppercase text-lg">{title}</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
