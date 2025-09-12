import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Video, 
  Search, 
  Filter,
  Play,
  Download,
  MoreHorizontal,
  Clock,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const videoCategories = ["Todos", "Concluídos", "Processando", "Rascunhos"];

const videoList = [
  {
    id: 1,
    title: "História da Inteligência Artificial",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
    duration: "2:34",
    views: "1.2k",
    status: "Concluído",
    createdAt: "2 dias atrás",
    style: "Realista"
  },
  {
    id: 2,
    title: "O Futuro dos Carros Elétricos",
    thumbnail: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=300&h=200&fit=crop",
    duration: "3:12",
    views: "856",
    status: "Processando",
    createdAt: "1 dia atrás",
    style: "Cartoon"
  },
  {
    id: 3,
    title: "Revolução Blockchain",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop",
    duration: "1:58",
    views: "2.1k",
    status: "Concluído",
    createdAt: "3 dias atrás",
    style: "Lego"
  },
  {
    id: 4,
    title: "Sustentabilidade Urbana",
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop",
    duration: "4:15",
    views: "3.4k",
    status: "Concluído",
    createdAt: "5 dias atrás",
    style: "Colagem"
  },
  {
    id: 5,
    title: "Exploração Espacial",
    thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
    duration: "5:42",
    views: "4.2k",
    status: "Concluído",
    createdAt: "1 semana atrás",
    style: "Realista"
  },
  {
    id: 6,
    title: "Energias Renováveis",
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop",
    duration: "0:00",
    views: "0",
    status: "Rascunho",
    createdAt: "2 horas atrás",
    style: "Cartoon"
  }
];

export default function Videos() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Meus Vídeos</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie e organize todos seus vídeos criados
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-glow"
            asChild
          >
            <Link to="/create">
              <Plus className="w-4 h-4 mr-2" />
              Criar Novo Vídeo
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar vídeos..." 
                  className="pl-10 bg-background border-border"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {videoCategories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "Todos" ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
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

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((video) => (
            <Card key={video.id} className="bg-gradient-card border-border hover:shadow-card transition-all group">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <Play className="w-4 h-4 mr-2" />
                    Assistir
                  </Button>
                </div>

                {/* Duration */}
                {video.duration !== "0:00" && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <Badge 
                    variant={
                      video.status === "Concluído" 
                        ? "default" 
                        : video.status === "Processando" 
                        ? "secondary" 
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {video.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-foreground line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {video.style}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{video.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {video.status === "Concluído" && (
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Carregar Mais Vídeos
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}