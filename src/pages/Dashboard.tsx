import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Video, 
  PlaySquare, 
  CreditCard, 
  TrendingUp,
  Clock,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const metrics = [
    {
      title: "Vídeos Criados",
      value: "127",
      description: "Total de vídeos gerados",
      icon: Video,
      trend: { value: "23%", isPositive: true }
    },
    {
      title: "Séries Ativas",
      value: "8",
      description: "Projetos em andamento",
      icon: PlaySquare,
      trend: { value: "12%", isPositive: true }
    },
    {
      title: "Créditos Restantes",
      value: "847",
      description: "Do seu plano atual",
      icon: CreditCard,
      trend: { value: "156", isPositive: false }
    },
    {
      title: "Créditos Utilizados",
      value: "153",
      description: "Últimos 30 dias",
      icon: TrendingUp,
      trend: { value: "23", isPositive: false }
    }
  ];

  const recentVideos = [
    { id: 1, title: "História da Inteligência Artificial", duration: "2:34", views: "1.2k", status: "Concluído" },
    { id: 2, title: "O Futuro dos Carros Elétricos", duration: "3:12", views: "856", status: "Processando" },
    { id: 3, title: "Revolução Blockchain", duration: "1:58", views: "2.1k", status: "Concluído" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seus vídeos e acompanhe o desempenho
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-glow"
            asChild
          >
            <Link to="/create">
              <div className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Criar Novo Vídeo
              </div>
            </Link>
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Videos */}
          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground font-display">Vídeos Recentes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/videos">
                  <span>Ver todos</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentVideos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{video.title}</p>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{video.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.status === 'Concluído' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {video.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-display">Estatísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taxa de Conclusão</span>
                  <span className="font-medium text-primary">94%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-primary rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tempo Médio de Processamento</span>
                  <span className="font-medium text-foreground">2m 34s</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Satisfação</span>
                  <span className="font-medium text-primary">4.9/5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-primary rounded-full"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/series">
                    <div className="flex items-center justify-center">
                      <PlaySquare className="w-4 h-4 mr-2" />
                      Ver Minhas Séries
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}