// components/dashboard/SalesLeads.tsx
import { Card, Table, TableRow, TableCell, Button, Badge } from '@tremor/react';
import { PhoneIcon } from '@heroicons/react/24/outline';

export function SalesLeads({ leads }) {
  const handleCall = async (phone, name) => {
    await fetch('/api/sales/call', {
      method: 'POST',
      body: JSON.stringify({ phone, name })
    });
    alert(`ALEX está marcando a ${name}...`);
  };

  return (
    <Card className="bg-slate-900">
      <Table>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="text-white">{lead.name}</TableCell>
              <TableCell className="text-slate-400">{lead.phone}</TableCell>
              <TableCell>
                <Button 
                  icon={PhoneIcon} 
                  color="blue" 
                  onClick={() => handleCall(lead.phone, lead.name)}
                >
                  Llamar con ALEX
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
