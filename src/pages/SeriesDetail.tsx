import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play,
  Edit,
  Share2,
  Download,
  Plus,
  MoreHorizontal,
  Users,
  Eye,
  ThumbsUp,
  Calendar,
  Clock,
  Video,
  Settings
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock data - seria vindo da API baseado no ID da série
const seriesData = {
  id: 1,
  title: "História da Tecnologia",
  description: "Uma jornada completa através da evolução tecnológica, desde os primórdios da computação até as mais recentes inovações em inteligência artificial. Cada episódio explora marcos importantes e personagens que moldaram o mundo digital que conhecemos hoje.",
  thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
  totalEpisodes: 12,
  completedEpisodes: 8,
  status: "Ativa",
  createdAt: "15 dias atrás",
  lastUpdate: "2 dias atrás",
  totalViews: "45.2k",
  subscribers: 1250,
  likes: 3420,
  style: "Realista",
  category: "Educacional",
  progress: 67,
  episodes: [
    {
      id: 1,
      title: "Os Primórdios da Computação",
      description: "Desde o ábaco até os primeiros computadores eletrônicos",
      duration: "4:32",
      views: "8.5k",
      status: "Concluído",
      uploadDate: "15 dias atrás",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "A Revolução dos Microprocessadores",
      description: "Como os chips mudaram tudo",
      duration: "5:18",
      views: "7.2k",
      status: "Concluído",
      uploadDate: "13 dias atrás",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "O Nascimento da Internet",
      description: "ARPANET e a criação da rede mundial",
      duration: "6:24",
      views: "9.1k",
      status: "Concluído",
      uploadDate: "11 dias atrás",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "A Era dos Computadores Pessoais",
      description: "Apple, IBM e Microsoft transformam a tecnologia",
      duration: "0:00",
      views: "0",
      status: "Em Produção",
      uploadDate: "",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Mobile Revolution",
      description: "Smartphones mudam o mundo",
      duration: "0:00",
      views: "0",
      status: "Planejado",
      uploadDate: "",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Concluído":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Em Produção":
      return "bg-primary/10 text-primary border-primary/20";
    case "Planejado":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function SeriesDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("episodes");

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/series">
                <div>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-display text-foreground">{seriesData.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>{seriesData.totalEpisodes} episódios</span>
                <span>•</span>
                <span>{seriesData.category}</span>
                <span>•</span>
                <span>Criada {seriesData.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/series/${id}/edit`}>
                <div className="flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Série
                </div>
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="bg-gradient-card border-border overflow-hidden">
          <div className="relative">
            <img 
              src={seriesData.thumbnail} 
              alt={seriesData.title}
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="space-y-3">
                  <Badge className={`border ${getStatusColor(seriesData.status)}`}>
                    {seriesData.status}
                  </Badge>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <span className="flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        {seriesData.completedEpisodes}/{seriesData.totalEpisodes} episódios
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {seriesData.totalViews} visualizações
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {seriesData.subscribers} inscritos
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-white text-xs">
                        <span>Progresso da série</span>
                        <span>{seriesData.progress}%</span>
                      </div>
                      <Progress value={seriesData.progress} className="h-2 bg-white/20" />
                    </div>
                  </div>
                </div>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
                  <Play className="w-5 h-5 mr-2" />
                  Assistir Série
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="episodes">Episódios</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="analytics">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="episodes" className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Episódios ({seriesData.totalEpisodes})
              </h2>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/create">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Episódio
                  </div>
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {seriesData.episodes.map((episode, index) => (
                <Card key={episode.id} className="bg-gradient-card border-border hover:shadow-card transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={episode.thumbnail} 
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                        {episode.status === "Concluído" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {episode.duration || "--:--"}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                Episódio {index + 1}
                              </span>
                              <Badge variant="outline" className={`text-xs border ${getStatusColor(episode.status)}`}>
                                {episode.status}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-foreground text-lg">
                              {episode.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              {episode.uploadDate && (
                                <>
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {episode.uploadDate}
                                  </span>
                                  <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {episode.views}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            {episode.status === "Concluído" && (
                              <Button variant="outline" size="sm">
                                <Play className="w-3 h-3 mr-1" />
                                Assistir
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-display">Descrição</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">
                      {seriesData.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-display">Configurações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Visibilidade</span>
                      <Badge variant="outline">Pública</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Notificações</span>
                      <Badge variant="outline">Ativadas</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Publicação automática</span>
                      <Badge variant="outline">Desativada</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-display">Informações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoria:</span>
                      <Badge variant="outline">{seriesData.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estilo:</span>
                      <Badge variant="outline">{seriesData.style}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criada em:</span>
                      <span className="text-foreground">{seriesData.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última atualização:</span>
                      <span className="text-foreground">{seriesData.lastUpdate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-display">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to={`/series/${id}/edit`}>
                        <div className="flex items-center">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar Série
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Visualizações Totais</p>
                      <p className="text-2xl font-bold text-foreground">{seriesData.totalViews}</p>
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
                      <p className="text-2xl font-bold text-foreground">{seriesData.subscribers}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Curtidas</p>
                      <p className="text-2xl font-bold text-foreground">{seriesData.likes}</p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</p>
                      <p className="text-2xl font-bold text-foreground">{seriesData.progress}%</p>
                    </div>
                    <Video className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground font-display">Desempenho por Episódio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seriesData.episodes.slice(0, 3).map((episode, index) => (
                    <div key={episode.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div>
                        <p className="font-medium text-foreground">Episódio {index + 1}: {episode.title}</p>
                        <p className="text-sm text-muted-foreground">{episode.views} visualizações</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">+18%</p>
                        <p className="text-xs text-muted-foreground">vs anterior</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}