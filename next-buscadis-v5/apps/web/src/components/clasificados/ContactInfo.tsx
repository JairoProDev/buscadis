import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Contacto } from '@buscadis/shared';

interface Props {
  contacto: Contacto;
  onClose: () => void;
}

export function ContactInfo({ contacto, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
        
        <div className="space-y-4">
          {contacto.telefono && (
            <div>
              <p className="font-medium">Teléfono:</p>
              <a 
                href={`tel:${contacto.telefono}`}
                className="text-primary hover:underline"
              >
                {contacto.telefono}
              </a>
            </div>
          )}

          {contacto.whatsapp && (
            <div>
              <p className="font-medium">WhatsApp:</p>
              <a 
                href={`https://wa.me/${contacto.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {contacto.whatsapp}
              </a>
            </div>
          )}

          {contacto.email && (
            <div>
              <p className="font-medium">Email:</p>
              <a 
                href={`mailto:${contacto.email}`}
                className="text-primary hover:underline"
              >
                {contacto.email}
              </a>
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-6"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </div>
    </Dialog>
  );
} 