import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft,
  Construction,
  Sparkles
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sectionTitles = {
  "/series": "Séries",
  "/account": "Conta",
  "/settings": "Configurações"
};

export default function ComingSoon() {
  const location = useLocation();
  const title = sectionTitles[location.pathname as keyof typeof sectionTitles] || "Página";

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-gradient-card border-border max-w-md w-full">
          <CardContent className="p-8 text-center space-y-6">
            {/* Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Construction className="w-10 h-10 text-primary" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-display text-foreground">
                {title} em Desenvolvimento
              </h1>
              <p className="text-muted-foreground">
                Esta seção estará disponível em breve! Estamos trabalhando para trazer uma experiência incrível.
              </p>
            </div>

            {/* Features Coming */}
            <div className="space-y-3 text-left">
              <p className="text-sm font-medium text-foreground">Em breve você poderá:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Gerenciar suas configurações avançadas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Criar séries completas de vídeos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>Personalizar seu perfil e preferências</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link to="/create">
                  Criar Novo Vídeo
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}