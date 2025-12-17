// app/public/status/page.tsx

// Cambia esto:
// const getStatusStyles = (status) => { ... }

// Por esto (añadiendo : string):
const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Operational':
            return { 
                icon: CheckCircleIcon, 
                color: 'text-green-600', 
                bg: 'bg-green-100', 
                text: 'bg-green-500' 
            };
        case 'Performance Issues':
            return { 
                icon: ExclamationCircleIcon, 
                color: 'text-yellow-600', 
                bg: 'bg-yellow-100', 
                text: 'bg-yellow-500' 
            };
        default:
            return { 
                icon: XCircleIcon, 
                color: 'text-red-600', 
                bg: 'bg-red-100', 
                text: 'bg-red-500' 
            };
    }
};
