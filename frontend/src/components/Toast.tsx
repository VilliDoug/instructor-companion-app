import { useEffect } from "react";
import '../styles/Toast.scss';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000}: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-icon">
                {type === 'success' ? '✓' : '✗'}
            </span>
            <span className="toast-message">{message}</span>
        </div>
    )
}