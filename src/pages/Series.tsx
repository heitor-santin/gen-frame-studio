import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  PlaySquare, 
  Search, 
  Filter,
  Play,
  MoreHorizontal,
  Clock,
  Video,
  Users,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const seriesCategories = ["Todas", "Ativas", "Concluídas", "Pausadas", "Rascunhos"];

const seriesData = [
  {
    id: 1,
    title: "História da Tecnologia",
    description: "Uma jornada completa através da evolução tecnológica",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    totalEpisodes: 12,
    completedEpisodes: 8,
    status: "Ativa",
    createdAt: "15 dias atrás",
    lastUpdate: "2 dias atrás",
    totalViews: "45.2k",
    subscribers: 1250,
    style: "Realista",
    category: "Educacional",
    progress: 67
  },
  {
    id: 2,
    title: "Aventuras no Espaço",
    description: "Exploração espacial para crianças",
    thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop",
    totalEpisodes: 6,
    completedEpisodes: 6,
    status: "Concluída",
    createdAt: "1 mês atrás",
    lastUpdate: "5 dias atrás",
    totalViews: "28.7k",
    subscribers: 890,
    style: "Cartoon",
    category: "Infantil",
    progress: 100
  },
  {
    id: 3,
    title: "Sustentabilidade Urbana",
    description: "Cidades inteligentes e sustentáveis do futuro",
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
    totalEpisodes: 8,
    completedEpisodes: 3,
    status: "Ativa",
    createdAt: "1 semana atrás",
    lastUpdate: "1 dia atrás",
    totalViews: "12.4k",
    subscribers: 456,
    style: "Lego",
    category: "Ambiental",
    progress: 38
  },
  {
    id: 4,
    title: "Revolução da IA",
    description: "O impacto da inteligência artificial na sociedade",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    totalEpisodes: 10,
    completedEpisodes: 0,
    status: "Rascunho",
    createdAt: "3 dias atrás",
    lastUpdate: "3 dias atrás",
    totalViews: "0",
    subscribers: 0,
    style: "Realista",
    category: "Tecnologia",
    progress: 0
  },
  {
    id: 5,
    title: "Mistérios do Oceano",
    description: "Descobrindo as maravilhas dos oceanos profundos",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
    totalEpisodes: 15,
    completedEpisodes: 12,
    status: "Pausada",
    createdAt: "2 meses atrás",
    lastUpdate: "2 semanas atrás",
    totalViews: "67.8k",
    subscribers: 2100,
    style: "Colagem",
    category: "Natureza",
    progress: 80
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ativa":
      return "bg-primary/10 text-primary border-primary/20";
    case "Concluída":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Pausada":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "Rascunho":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function Series() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSeries = seriesData.filter(series => {
    const matchesCategory = selectedCategory === "Todas" || 
                           (selectedCategory === "Ativas" && series.status === "Ativa") ||
                           (selectedCategory === "Concluídas" && series.status === "Concluída") ||
                           (selectedCategory === "Pausadas" && series.status === "Pausada") ||
                           (selectedCategory === "Rascunhos" && series.status === "Rascunho");
    
    const matchesSearch = series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         series.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const totalSeries = seriesData.length;
  const activeSeries = seriesData.filter(s => s.status === "Ativa").length;
  const completedSeries = seriesData.filter(s => s.status === "Concluída").length;
  const totalSubscribers = seriesData.reduce((acc, s) => acc + s.subscribers, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Minhas Séries</h1>
            <p className="text-muted-foreground mt-2">
              Crie e gerencie suas séries de vídeos
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-glow"
            asChild
          >
            <Link to="/create-series">
              <div className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Criar Nova Série
              </div>
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Séries</p>
                  <p className="text-2xl font-bold text-foreground">{totalSeries}</p>
                </div>
                <PlaySquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Séries Ativas</p>
                  <p className="text-2xl font-bold text-foreground">{activeSeries}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                  <p className="text-2xl font-bold text-foreground">{completedSeries}</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inscritos</p>
                  <p className="text-2xl font-bold text-foreground">{totalSubscribers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar séries..." 
                  className="pl-10 bg-background border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {seriesCategories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Series Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSeries.map((series) => (
            <Card key={series.id} className="bg-gradient-card border-border hover:shadow-card transition-all group">
              <div className="relative">
                <img 
                  src={series.thumbnail} 
                  alt={series.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir
                    </Button>
                    <Button size="sm" variant="outline" className="bg-background/20 border-white/20 text-white hover:bg-white/10">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`text-xs border ${getStatusColor(series.status)}`}>
                    {series.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="bg-black/60 rounded-lg p-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-white text-xs mb-1">
                      <span>{series.completedEpisodes}/{series.totalEpisodes} episódios</span>
                      <span>{series.progress}%</span>
                    </div>
                    <Progress value={series.progress} className="h-1.5" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-foreground text-lg line-clamp-1">{series.title}</h3>
                      <Button variant="ghost" size="icon" className="w-8 h-8 shrink-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {series.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {series.style}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {series.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>{series.totalViews} visualizações</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{series.subscribers} inscritos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{series.createdAt}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{series.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/series/${series.id}`}>
                        <div className="flex items-center">
                          <Edit className="w-3 h-3 mr-1" />
                          Detalhes
                        </div>
                      </Link>
                    </Button>
                  </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredSeries.length > 0 && (
          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              Carregar Mais Séries
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredSeries.length === 0 && (
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-12 text-center">
              <PlaySquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Nenhuma série encontrada
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== "Todas" 
                  ? "Tente ajustar seus filtros de busca" 
                  : "Crie sua primeira série para começar"}
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/create-series">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Nova Série
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}