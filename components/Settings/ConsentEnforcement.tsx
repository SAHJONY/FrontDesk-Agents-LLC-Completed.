// ./components/Settings/ConsentEnforcement.tsx (FIXED LOGIC ORDER)

// ... imports ...

const ConsentEnforcement: React.FC = () => {
    // 1. STATE DEFINITIONS (Must be first)
    const [consent, setConsent] = useState('NoConsentProvided');
    const [isSaved, setIsSaved] = useState(false);
    
    // 2. EFFECT HOOKS
    useEffect(() => {
        // ... load client config ...
    }, []);

    // 3. LOGIC VARIABLES
    const isCompliant = consent === 'ExplicitWritten'; // <--- THIS MUST BE DEFINED HERE!

    // 4. HANDLERS
    const handleSave = () => {
        // ... update logic ...
    };

    // 5. RENDER (RETURN)
    return ( 
        <div className="glass-card p-6 border-l-4" style={{ borderColor: isCompliant ? 'var(--color-green-light)' : 'var(--color-red-light)' }}>
            {/* ... JSX content using isCompliant ... */}
        </div>
    );
};

export default ConsentEnforcement;
